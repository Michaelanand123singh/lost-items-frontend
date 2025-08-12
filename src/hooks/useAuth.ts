import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    initialize,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount
    initialize();
  }, [initialize]);

  const handleLogin = async (credentials: LoginCredentials) => {
    await login(credentials);
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    await register(credentials);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleUpdateProfile = async (data: Partial<User>) => {
    await updateProfile(data);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError,
    
    // Computed
    isLoggedIn: isAuthenticated && !!user,
    userId: user?.id,
    userName: user?.username,
    userEmail: user?.email,
  };
};
