import { STORAGE_KEYS } from './constants';
import { User, AuthResponse } from '@/types/auth';

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Token management
  setTokens(token: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.token, token);
      localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.token);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.refreshToken);
    }
    return null;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
    }
  }

  // User management
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(STORAGE_KEYS.user);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      }
    }
    return null;
  }

  clearUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }

  // Authentication state
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Token validation
  isTokenValid(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      return payload.exp <= currentTime;
    } catch (error) {
      return true;
    }
  }

  // Token decoding
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Session management
  saveSession(authResponse: AuthResponse): void {
    this.setTokens(authResponse.token, authResponse.refreshToken);
    this.setUser(authResponse.user);
  }

  clearSession(): void {
    this.clearTokens();
    this.clearUser();
  }

  // Auto-login on app start
  async initializeAuth(): Promise<User | null> {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user && this.isTokenValid(token)) {
      return user;
    }

    // Try to refresh token if expired
    const refreshToken = this.getRefreshToken();
    if (refreshToken && this.isTokenExpired(token || '')) {
      try {
        // This would typically call your API to refresh the token
        // For now, we'll just clear the session
        this.clearSession();
      } catch (error) {
        this.clearSession();
      }
    }

    return null;
  }

  // Utility methods
  getUserId(): string | null {
    const user = this.getUser();
    return user?.id || null;
  }

  getUserEmail(): string | null {
    const user = this.getUser();
    return user?.email || null;
  }

  getUserName(): string | null {
    const user = this.getUser();
    return user?.username || null;
  }

  // Check if user has specific permissions (for future use)
  hasPermission(permission: string): boolean {
    // This can be expanded based on your permission system
    return this.isAuthenticated();
  }

  // Check if user is the owner of a resource
  isOwner(resourceUserId: string): boolean {
    const currentUserId = this.getUserId();
    return currentUserId === resourceUserId;
  }
}

export const authService = AuthService.getInstance();
export default authService;
