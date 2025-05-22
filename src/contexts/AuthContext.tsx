
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'admin' | 'patient' | 'doctor' | 'lab';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('medrec_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app this would call your API
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUserData = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: role === 'admin' 
        ? 'Admin User' 
        : role === 'patient' 
        ? 'John Patient' 
        : role === 'doctor' 
        ? 'Dr. Smith' 
        : 'Lab Technician',
      email,
      role
    };
    
    // Store user data
    localStorage.setItem('medrec_user', JSON.stringify(mockUserData));
    setUser(mockUserData);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('medrec_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
