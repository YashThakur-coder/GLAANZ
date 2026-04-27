import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface AuthContextType {
    userInfo: UserInfo | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Helper to determine the backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        }
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout, error, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
