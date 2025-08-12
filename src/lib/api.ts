import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { APP_CONFIG, STORAGE_KEYS } from './constants';
import { ApiResponse, ApiError } from '@/types/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APP_CONFIG.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const refreshResponse = await this.refreshAuth(refreshToken);
              const newAccessToken = refreshResponse.data?.accessToken;
              const newRefreshToken = refreshResponse.data?.refreshToken;

              if (newAccessToken) {
                this.setToken(newAccessToken);
                if (newRefreshToken) this.setRefreshToken(newRefreshToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return this.client(originalRequest);
              }
            }
          } catch (refreshError) {
            this.clearAuth();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.token);
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.token, token);
    }
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.refreshToken);
    }
    return null;
  }

  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.refreshToken, token);
    }
  }

  private clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    const response = await this.client.post<ApiResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
  }) {
    const response = await this.client.post<ApiResponse>('/auth/register', userData);
    return response.data;
  }

  async refreshAuth(refreshToken: string) {
    const response = await this.client.post<ApiResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }

  async logout() {
    try {
      await this.client.post('/auth/logout');
    } finally {
      this.clearAuth();
    }
  }

  async getProfile() {
    const response = await this.client.get<ApiResponse>('/auth/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.client.put<ApiResponse>('/auth/profile', data);
    return response.data;
  }

  // Posts endpoints
  async getPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    location?: string;
  }) {
    const response = await this.client.get<ApiResponse>('/posts', { params });
    return response.data;
  }

  async getPost(id: string) {
    const response = await this.client.get<ApiResponse>(`/posts/${id}`);
    return response.data;
  }

  async createPost(data: any) {
    const response = await this.client.post<ApiResponse>('/posts', data);
    return response.data;
  }

  async updatePost(id: string, data: any) {
    const response = await this.client.put<ApiResponse>(`/posts/${id}`, data);
    return response.data;
  }

  async deletePost(id: string) {
    const response = await this.client.delete<ApiResponse>(`/posts/${id}`);
    return response.data;
  }

  async likePost(id: string) {
    const response = await this.client.post<ApiResponse>(`/posts/${id}/like`);
    return response.data;
  }

  async unlikePost(id: string) {
    const response = await this.client.delete<ApiResponse>(`/posts/${id}/like`);
    return response.data;
  }

  // Comments endpoints
  async getComments(postId: string, params?: { page?: number; limit?: number }) {
    const response = await this.client.get<ApiResponse>(`/posts/${postId}/comments`, {
      params,
    });
    return response.data;
  }

  async createComment(postId: string, data: { content: string; parentId?: string }) {
    const response = await this.client.post<ApiResponse>(`/posts/${postId}/comments`, data);
    return response.data;
  }

  async updateComment(postId: string, commentId: string, data: { content: string }) {
    const response = await this.client.put<ApiResponse>(`/posts/${postId}/comments/${commentId}`, data);
    return response.data;
  }

  async deleteComment(postId: string, commentId: string) {
    const response = await this.client.delete<ApiResponse>(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  }

  async likeComment(postId: string, commentId: string) {
    const response = await this.client.post<ApiResponse>(`/posts/${postId}/comments/${commentId}/like`);
    return response.data;
  }

  async unlikeComment(postId: string, commentId: string) {
    const response = await this.client.delete<ApiResponse>(`/posts/${postId}/comments/${commentId}/like`);
    return response.data;
  }

  // Upload endpoints
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<ApiResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Search endpoints
  async searchPosts(query: string, params?: { page?: number; limit?: number }) {
    const response = await this.client.get<ApiResponse>('/search/posts', {
      params: { q: query, ...params },
    });
    return response.data;
  }

  // User endpoints
  async getUserProfile(userId: string) {
    const response = await this.client.get<ApiResponse>(`/users/${userId}`);
    return response.data;
  }

  async getUserPosts(userId: string, params?: { page?: number; limit?: number }) {
    const response = await this.client.get<ApiResponse>(`/users/${userId}/posts`, {
      params,
    });
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats() {
    const response = await this.client.get<ApiResponse>('/dashboard/stats');
    return response.data;
  }

  async getMyPosts(params?: { page?: number; limit?: number; status?: string }) {
    const response = await this.client.get<ApiResponse>('/dashboard/posts', { params });
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
