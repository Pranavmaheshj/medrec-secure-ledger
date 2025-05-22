
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'admin' | 'patient' | 'doctor' | 'lab';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'inactive' | 'pending';
  lastActivity?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRecords: Record<string, any>[];
  addRecord: (record: Record<string, any>) => void;
  getAllUsers: () => User[];
  approveUser: (userId: string) => void;
  deactivateUser: (userId: string) => void;
  activateUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get stored items with proper parsing
const getStoredItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRecords, setUserRecords] = useState<Record<string, any>[]>([]);
  
  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = getStoredItem('medrec_user');
    if (storedUser) {
      setUser(storedUser);
      
      // Load this user's records
      const allRecords = getStoredItem('medrec_records') || {};
      const userSpecificRecords = allRecords[storedUser.id] || [];
      setUserRecords(userSpecificRecords);
    }
    setIsLoading(false);
  }, []);

  // Registration function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Check if user already exists
    const users = getStoredItem('medrec_users') || {};
    
    if (users[email]) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const userId = `user-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
    const newUser = {
      id: userId,
      name,
      email,
      role,
      status: role === 'admin' ? 'active' : 'pending', // Admins are auto-approved, others pending
      lastActivity: new Date().toISOString(),
    };
    
    // Store user credentials
    users[email] = {
      password,
      userId,
    };
    
    // Store user data
    const allUsers = getStoredItem('medrec_all_users') || {};
    allUsers[userId] = newUser;
    
    // Save to localStorage
    localStorage.setItem('medrec_users', JSON.stringify(users));
    localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    
    // Only set as current user if role is admin (auto-approved)
    // or if there are no admins yet (first user becomes admin)
    if (role === 'admin') {
      localStorage.setItem('medrec_user', JSON.stringify(newUser));
      setUser(newUser);
      setUserRecords([]);
    }
    
    setIsLoading(false);
  };

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Get stored users
    const users = getStoredItem('medrec_users') || {};
    const allUsers = getStoredItem('medrec_all_users') || {};
    
    // Check credentials
    const userCredentials = users[email];
    
    if (!userCredentials || userCredentials.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Get user data
    const userData = allUsers[userCredentials.userId];
    
    // Verify role matches
    if (userData.role !== role) {
      setIsLoading(false);
      throw new Error(`This account is registered as a ${userData.role}, not a ${role}`);
    }
    
    // Check if user is active
    if (userData.status === 'pending') {
      setIsLoading(false);
      throw new Error('Your account is pending approval by an administrator');
    }
    
    if (userData.status === 'inactive') {
      setIsLoading(false);
      throw new Error('Your account has been deactivated. Please contact an administrator');
    }
    
    // Update last activity
    userData.lastActivity = new Date().toISOString();
    allUsers[userCredentials.userId] = userData;
    localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    
    // Store current user
    localStorage.setItem('medrec_user', JSON.stringify(userData));
    setUser(userData);
    
    // Load user records
    const allRecords = getStoredItem('medrec_records') || {};
    const userSpecificRecords = allRecords[userData.id] || [];
    setUserRecords(userSpecificRecords);
    
    setIsLoading(false);
  };

  // Add a new record for the current user
  const addRecord = (record: Record<string, any>) => {
    if (!user) return;
    
    const newRecord = {
      ...record,
      id: `record-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      userId: user.id
    };
    
    // Update state
    const updatedRecords = [...userRecords, newRecord];
    setUserRecords(updatedRecords);
    
    // Update storage
    const allRecords = getStoredItem('medrec_records') || {};
    allRecords[user.id] = updatedRecords;
    localStorage.setItem('medrec_records', JSON.stringify(allRecords));
  };

  const logout = () => {
    localStorage.removeItem('medrec_user');
    setUser(null);
    setUserRecords([]);
  };
  
  // Admin functions for user management
  const getAllUsers = (): User[] => {
    if (user?.role !== 'admin') {
      return [];
    }
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    return Object.values(allUsers) as User[];
  };
  
  const approveUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    if (allUsers[userId]) {
      allUsers[userId].status = 'active';
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    }
  };
  
  const deactivateUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    if (allUsers[userId]) {
      allUsers[userId].status = 'inactive';
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    }
  };
  
  const activateUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    if (allUsers[userId]) {
      allUsers[userId].status = 'active';
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    }
  };
  
  const deleteUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    const users = getStoredItem('medrec_users') || {};
    
    if (allUsers[userId]) {
      const userEmail = allUsers[userId].email;
      
      // Delete user data
      delete allUsers[userId];
      
      // Delete user credentials
      if (userEmail && users[userEmail]) {
        delete users[userEmail];
      }
      
      // Delete user records
      const allRecords = getStoredItem('medrec_records') || {};
      if (allRecords[userId]) {
        delete allRecords[userId];
      }
      
      // Update localStorage
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
      localStorage.setItem('medrec_users', JSON.stringify(users));
      localStorage.setItem('medrec_records', JSON.stringify(allRecords));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isLoading,
      userRecords,
      addRecord,
      getAllUsers,
      approveUser,
      deactivateUser,
      activateUser,
      deleteUser
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
