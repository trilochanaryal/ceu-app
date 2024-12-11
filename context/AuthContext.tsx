import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/services/api';
import { secureStore } from '@/helper/secure.storage.helper';
import { RegisterFormData, LoginFormData } from '@/types/form';
import { API_URL } from '@/constants';
import axios from 'axios';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (data: RegisterFormData) => Promise<any>;
  onLogin?: (data: LoginFormData) => Promise<any>;
  onLogout?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean }>({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadTokens = async () => {
      const token = await secureStore.getItem('accessToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ authenticated: true, token: token });
      }
    };
    loadTokens();
  }, []);

  const register = async (data: RegisterFormData) => {
    try {
      return await api.post(`${API_URL}/auth/signup}`, data);
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      const result = await api.post(`${API_URL}/auth/login`, data);

      setAuthState({ authenticated: true, token: result.data.accessToken });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
      await secureStore.setItem('accessToken', result.data.accessToken);
      await secureStore.setItem('refreshToken', result.data.refreshToken);

      return result;
    } catch (e) {
      return { e: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await secureStore.deleteItem('accessToken');
    await secureStore.deleteItem('refreshToken');

    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({ authenticated: false, token: null });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
