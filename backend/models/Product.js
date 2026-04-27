const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String, // String id like 'neck-01' to match original constants
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    hoverImageUrl: {
        type: String,
        required: false, // Optional, falls back to original image in frontend if absent
    },
    isBestseller: {
        type: Boolean,
        default: false
    },
    occasion: {
        type: String,
        default: 'All'
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
