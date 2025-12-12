import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (asAdmin?: boolean) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adhd_hub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (asAdmin: boolean = false) => {
    const mockUser: User = asAdmin ? {
      id: 'admin1',
      name: 'Admin Główny',
      email: 'admin@adhdhub.pl',
      role: 'ADMIN',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    } : {
      id: 'u1',
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      role: 'USER',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jan'
    };
    
    setUser(mockUser);
    localStorage.setItem('adhd_hub_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adhd_hub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};