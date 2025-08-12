import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '@/types/auth';
import { apiClient } from '@/lib/api';
import { authService } from '@/lib/auth';
import toast from 'react-hot-toast';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await apiClient.login(credentials);
            
            if (response.success && response.data) {
              const { user, accessToken, refreshToken } = response.data as any;
              
              // Save to auth service
              if (accessToken) {
                authService.setTokens(accessToken, refreshToken);
              }
              if (user) {
                authService.setUser(user);
              }
              
              // Update store
              set({
                user,
                token: accessToken || null,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              
              toast.success('Welcome back!');
            } else {
              throw new Error(response.message || 'Login failed');
            }
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            set({
              isLoading: false,
              error: errorMessage,
            });
            toast.error(errorMessage);
          }
        },

        register: async (credentials: RegisterCredentials) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await apiClient.register(credentials);
            
            if (response.success && response.data) {
              const { user, accessToken, refreshToken } = response.data as any;
              
              // Save to auth service
              if (accessToken) {
                authService.setTokens(accessToken, refreshToken);
              }
              if (user) {
                authService.setUser(user);
              }
              
              // Update store
              set({
                user,
                token: accessToken || null,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              
              toast.success('Account created successfully!');
            } else {
              throw new Error(response.message || 'Registration failed');
            }
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            set({
              isLoading: false,
              error: errorMessage,
            });
            toast.error(errorMessage);
          }
        },

        logout: async () => {
          try {
            await apiClient.logout();
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            // Clear auth service
            authService.clearSession();
            
            // Update store
            set({
              user: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            
            toast.success('Logged out successfully');
          }
        },

        updateProfile: async (data: Partial<User>) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await apiClient.updateProfile(data);
            
            if (response.success && response.data) {
              const updatedUser = response.data;
              
              // Update auth service
              authService.setUser(updatedUser);
              
              // Update store
              set({
                user: updatedUser,
                isLoading: false,
                error: null,
              });
              
              toast.success('Profile updated successfully!');
            } else {
              throw new Error(response.message || 'Profile update failed');
            }
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
            set({
              isLoading: false,
              error: errorMessage,
            });
            toast.error(errorMessage);
          }
        },

        initialize: async () => {
          set({ isLoading: true });
          
          try {
            const user = await authService.initializeAuth();
            
            if (user) {
              const token = authService.getToken();
              const refreshToken = authService.getRefreshToken();
              
              set({
                user,
                token,
                refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              set({
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          } catch (error: any) {
            console.error('Auth initialization error:', error);
            set({
              user: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
