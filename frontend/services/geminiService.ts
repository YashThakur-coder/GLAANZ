
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";
import { PRODUCTS } from "../constants";

/**
 * Strips all non-serializable properties and hidden metadata from history.
 * This prevents "Converting circular structure to JSON" errors.
 */
const sanitizeHistory = (history: ChatMessage[]) => {
  return history.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.text || "") }]
  }));
};

/**
 * Deep cleans the product catalog to ensure zero circular references or DOM nodes.
 */
const sanitizeCatalog = () => {
  return PRODUCTS.map(p => ({
    id: String(p.id),
    name: String(p.name),
    category: String(p.category),
    price: Number(p.price)
  }));
};

export const getStylingAdvice = async (history: ChatMessage[], prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const catalogContext = sanitizeCatalog();
    const sanitizedHistory = sanitizeHistory(history);
    const cleanPrompt = String(prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...sanitizedHistory,
        {
          role: 'user',
          parts: [{ text: cleanPrompt }]
        }
      ],
      config: {
        systemInstruction: `You are GLAANZ, a luxury Indian Fashion Stylist for 'GLAANZ' jewelry. 
        You specialize in Indian imitation jewelry: Kundan, Temple, Oxidized, Polki, and American Diamond.
        
        CATALOG DATA (ID, Name, Category, Price):
        ${JSON.stringify(catalogContext)}

        DIRECTIONS:
        1. Help customers find perfect jewelry for their outfits/occasions.
        2. Tone: Elegant, expert, and encouraging.
        3. PRODUCT SUGGESTIONS: Based on the catalog above, pick 1-4 products that match the user's request. Return their IDs in the 'productIds' array.
        4. TEXT: Provide helpful, descriptive styling advice in the 'text' field. Explain WHY you chose those specific pieces.
        
        RESPONSE FORMAT:
        You must return a JSON object with 'text' (string) and 'productIds' (array of strings).`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The stylist's advice and explanation."
            },
            productIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "IDs of recommended products from the catalog."
            }
          },
          required: ["text", "productIds"]
        },
        temperature: 0.7,
      },
    });

    const result = JSON.parse(response.text);
    return result as { text: string; productIds: string[] };
  } catch (error) {
    console.error("Gemini Stylist Error:", error);
    return {
      text: "I'm having a little trouble accessing my vault of designs right now. Please tell me more about your outfit, and I'll try my best to help!",
      productIds: []
    };
  }
};
