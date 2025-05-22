import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'admin' | 'patient' | 'doctor' | 'lab';
export type UserStatus = 'active' | 'inactive' | 'pending' | 'unverified';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  lastActivity?: string;
  emailVerified?: boolean;
  verificationToken?: string;
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
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get stored items with proper parsing
const getStoredItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Helper to generate a verification token
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper to simulate sending an email
const simulateSendEmail = (email: string, subject: string, body: string) => {
  console.log(`Email sent to ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Store the email in localStorage for demo purposes
  const emails = getStoredItem('medrec_emails') || {};
  emails[email] = emails[email] || [];
  emails[email].push({ subject, body, date: new Date().toISOString() });
  localStorage.setItem('medrec_emails', JSON.stringify(emails));
  
  return Promise.resolve();
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
    
    // Create verification token
    const verificationToken = generateToken();
    
    // Create new user with explicit status type and set all users to active
    const userId = `user-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
    const newUser: User = {
      id: userId,
      name,
      email,
      role,
      // Set all users to active status
      status: 'active' as UserStatus,
      lastActivity: new Date().toISOString(),
      // Set emailVerified to true for all users
      emailVerified: true,
      verificationToken: undefined
    };
    
    // Store user credentials
    users[email] = {
      password,
      userId,
      verificationToken: undefined
    };
    
    // Store user data
    const allUsers = getStoredItem('medrec_all_users') || {};
    allUsers[userId] = newUser;
    
    // Save to localStorage
    localStorage.setItem('medrec_users', JSON.stringify(users));
    localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    
    // Set as current user
    localStorage.setItem('medrec_user', JSON.stringify(newUser));
    setUser(newUser);
    setUserRecords([]);
    
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
    
    // No longer checking email verification or user status
    
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

  // Email verification function
  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Get all users and their credentials
    const users = getStoredItem('medrec_users') || {};
    const allUsers = getStoredItem('medrec_all_users') || {};
    
    // Find user with this verification token
    let userEmail = null;
    let userId = null;
    
    for (const email in users) {
      if (users[email].verificationToken === token) {
        userEmail = email;
        userId = users[email].userId;
        break;
      }
    }
    
    if (!userEmail || !userId || !allUsers[userId]) {
      setIsLoading(false);
      return false;
    }
    
    // Update user status
    const userData = allUsers[userId];
    userData.emailVerified = true;
    userData.status = userData.role === 'admin' ? 'active' as UserStatus : 'pending' as UserStatus;
    userData.verificationToken = undefined;
    
    // Update credential
    users[userEmail].verificationToken = undefined;
    
    // Save changes
    allUsers[userId] = userData;
    localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    localStorage.setItem('medrec_users', JSON.stringify(users));
    
    setIsLoading(false);
    return true;
  };

  // Resend verification email
  const resendVerificationEmail = async (email: string) => {
    // Get user data
    const users = getStoredItem('medrec_users') || {};
    const userCredentials = users[email];
    
    if (!userCredentials) {
      throw new Error('No account found with this email address');
    }
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    const userData = allUsers[userCredentials.userId];
    
    if (!userData) {
      throw new Error('User account data not found');
    }
    
    if (userData.emailVerified) {
      throw new Error('This email is already verified');
    }
    
    // Generate new token
    const verificationToken = generateToken();
    
    // Update user data
    userData.verificationToken = verificationToken;
    userCredentials.verificationToken = verificationToken;
    
    // Save changes
    allUsers[userCredentials.userId] = userData;
    users[email] = userCredentials;
    localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    localStorage.setItem('medrec_users', JSON.stringify(users));
    
    // Send verification email
    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    await simulateSendEmail(
      email,
      "Verify your MedRec account",
      `Welcome to MedRec! Please verify your email by clicking on this link: ${verificationLink}`
    );
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    // Get user data
    const users = getStoredItem('medrec_users') || {};
    const userCredentials = users[email];
    
    if (!userCredentials) {
      throw new Error('No account found with this email address');
    }
    
    // Generate reset token
    const resetToken = generateToken();
    
    // Store reset token
    userCredentials.resetToken = resetToken;
    userCredentials.resetTokenExpiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now
    
    // Save changes
    users[email] = userCredentials;
    localStorage.setItem('medrec_users', JSON.stringify(users));
    
    // Send password reset email
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
    await simulateSendEmail(
      email,
      "Reset your MedRec password",
      `You requested a password reset. Please click on this link to create a new password: ${resetLink}`
    );
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    // Get all users credentials
    const users = getStoredItem('medrec_users') || {};
    
    // Find user with this reset token
    let userEmail = null;
    
    for (const email in users) {
      if (users[email].resetToken === token) {
        userEmail = email;
        break;
      }
    }
    
    if (!userEmail) {
      return false;
    }
    
    const userCredentials = users[userEmail];
    
    // Check if token has expired
    const now = new Date();
    const expiry = new Date(userCredentials.resetTokenExpiry);
    
    if (now > expiry) {
      return false;
    }
    
    // Update password and remove token
    userCredentials.password = newPassword;
    delete userCredentials.resetToken;
    delete userCredentials.resetTokenExpiry;
    
    // Save changes
    users[userEmail] = userCredentials;
    localStorage.setItem('medrec_users', JSON.stringify(users));
    
    return true;
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
      allUsers[userId].status = 'active' as UserStatus;
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    }
  };
  
  const deactivateUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    if (allUsers[userId]) {
      allUsers[userId].status = 'inactive' as UserStatus;
      localStorage.setItem('medrec_all_users', JSON.stringify(allUsers));
    }
  };
  
  const activateUser = (userId: string) => {
    if (user?.role !== 'admin') return;
    
    const allUsers = getStoredItem('medrec_all_users') || {};
    if (allUsers[userId]) {
      allUsers[userId].status = 'active' as UserStatus;
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
      deleteUser,
      verifyEmail,
      resendVerificationEmail,
      forgotPassword,
      resetPassword
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
