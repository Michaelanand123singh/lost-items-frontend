import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Post, CreatePostData, UpdatePostData, PostFilters, PostListResponse } from '@/types/post';
import { Comment, CreateCommentData } from '@/types/comment';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

interface PostState {
  // Posts
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  
  // Filters
  filters: PostFilters;
  
  // Comments
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: string | null;
  
  // Actions
  fetchPosts: (params?: { page?: number; limit?: number; filters?: PostFilters }) => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  createPost: (data: CreatePostData) => Promise<void>;
  updatePost: (id: string, data: Partial<UpdatePostData>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  unlikePost: (id: string) => Promise<void>;
  
  // Comments
  fetchComments: (postId: string, params?: { page?: number; limit?: number }) => Promise<void>;
  createComment: (postId: string, data: CreateCommentData) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  likeComment: (commentId: string) => Promise<void>;
  unlikeComment: (commentId: string) => Promise<void>;
  
  // Filters
  setFilters: (filters: PostFilters) => void;
  clearFilters: () => void;
  
  // State management
  clearError: () => void;
  clearCurrentPost: () => void;
  reset: () => void;
}

const initialState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  hasMore: false,
  filters: {},
  comments: [],
  commentsLoading: false,
  commentsError: null,
};

export const usePostStore = create<PostState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Posts actions
      fetchPosts: async (params = {}) => {
        const { page = 1, limit = 10, filters = {} } = params;
        const currentFilters = get().filters;
        
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.getPosts({
            page,
            limit,
            ...currentFilters,
            ...filters,
          });
          
          if (response.success && response.data) {
            const { data: posts, total, page: currentPage, limit: currentLimit, hasNext } = response.data as any;
            const hasMore = Boolean(hasNext);

            set({
              posts: page === 1 ? posts : [...get().posts, ...posts],
              total,
              page: currentPage,
              limit: currentLimit,
              hasMore,
              isLoading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to fetch posts');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch posts';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      fetchPost: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.getPost(id);
          
          if (response.success && response.data) {
            set({
              currentPost: response.data,
              isLoading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to fetch post');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch post';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      createPost: async (data: CreatePostData) => {
        set({ isLoading: true, error: null });
        
        try {
          const payload = {
            title: data.title,
            description: data.description,
            category: data.category,
            status: (data as any).status ? (data as any).status.toUpperCase() : 'LOST',
            address: data.location.address,
            city: data.location.city,
            state: data.location.state,
            country: data.location.country,
            contactPhone: data.contactInfo.phone,
            contactEmail: data.contactInfo.email,
            preferredContact: data.contactInfo.preferredContact,
            reward: data.reward,
            tags: data.tags,
            images: [],
          };

          // If files were selected in the form, upload them first and collect URLs
          try {
            const files = (data as any).images as File[] | undefined;
            if (Array.isArray(files) && files.length > 0) {
              const uploadedUrls: string[] = [];
              for (const file of files) {
                const uploadRes = await apiClient.uploadFile(file);
                if ((uploadRes as any).success && (uploadRes as any).data?.url) {
                  uploadedUrls.push((uploadRes as any).data.url);
                }
              }
              (payload as any).images = uploadedUrls;
            }
          } catch (e) {
            // Non-fatal: allow creating post without images if upload fails
            console.error('Image upload failed:', e);
          }

          const response = await apiClient.createPost(payload as any);
          
          if (response.success && response.data) {
            const newPost = response.data;
            
            set((state) => ({
              posts: [newPost, ...state.posts],
              isLoading: false,
            }));
            
            toast.success('Post created successfully!');
          } else {
            throw new Error(response.message || 'Failed to create post');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to create post';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      updatePost: async (id: string, data: Partial<UpdatePostData>) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.updatePost(id, data);
          
          if (response.success && response.data) {
            const updatedPost = response.data;
            
            set((state) => ({
              posts: state.posts.map((post) => 
                post.id === id ? updatedPost : post
              ),
              currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
              isLoading: false,
            }));
            
            toast.success('Post updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update post');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to update post';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      deletePost: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.deletePost(id);
          
          if (response.success) {
            set((state) => ({
              posts: state.posts.filter((post) => post.id !== id),
              currentPost: state.currentPost?.id === id ? null : state.currentPost,
              isLoading: false,
            }));
            
            toast.success('Post deleted successfully!');
          } else {
            throw new Error(response.message || 'Failed to delete post');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to delete post';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      likePost: async (id: string) => {
        try {
          const response = await apiClient.likePost(id);
          
          if (response.success) {
            set((state) => ({
              posts: state.posts.map((post) =>
                post.id === id
                  ? { ...post, _count: { ...post._count, likes: post._count.likes + 1 } }
                  : post
              ),
              currentPost: state.currentPost?.id === id
                ? { ...state.currentPost, _count: { ...state.currentPost._count, likes: state.currentPost._count.likes + 1 } }
                : state.currentPost,
            }));
          }
        } catch (error: any) {
          console.error('Error liking post:', error);
        }
      },

      unlikePost: async (id: string) => {
        try {
          const response = await apiClient.unlikePost(id);
          
          if (response.success) {
            set((state) => ({
              posts: state.posts.map((post) =>
                post.id === id
                  ? { ...post, _count: { ...post._count, likes: Math.max(0, post._count.likes - 1) } }
                  : post
              ),
              currentPost: state.currentPost?.id === id
                ? { ...state.currentPost, _count: { ...state.currentPost._count, likes: Math.max(0, state.currentPost._count.likes - 1) } }
                : state.currentPost,
            }));
          }
        } catch (error: any) {
          console.error('Error unliking post:', error);
        }
      },

      // Comments actions
      fetchComments: async (postId: string, params = {}) => {
        const { page = 1, limit = 10 } = params;
        
        set({ commentsLoading: true, commentsError: null });
        
        try {
          const response = await apiClient.getComments(postId, { page, limit });
          
          if (response.success && response.data) {
            const { comments } = response.data;
            
            set({
              comments: page === 1 ? comments : [...get().comments, ...comments],
              commentsLoading: false,
            });
          } else {
            throw new Error(response.message || 'Failed to fetch comments');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch comments';
          set({
            commentsLoading: false,
            commentsError: errorMessage,
          });
          toast.error(errorMessage);
        }
      },

      createComment: async (postId: string, data: CreateCommentData) => {
        try {
          const response = await apiClient.createComment(postId, data);
          
          if (response.success && response.data) {
            const newComment = response.data;
            
            set((state) => ({
              comments: [newComment, ...state.comments],
              currentPost: state.currentPost
                ? { ...state.currentPost, _count: { ...state.currentPost._count, comments: state.currentPost._count.comments + 1 } }
                : null,
            }));
            
            toast.success('Comment added successfully!');
          } else {
            throw new Error(response.message || 'Failed to create comment');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to create comment';
          toast.error(errorMessage);
        }
      },

      updateComment: async (commentId: string, content: string) => {
        try {
          const current = get().currentPost;
          if (!current) throw new Error('No current post selected');
          const response = await apiClient.updateComment(current.id, commentId, { content });
          
          if (response.success && response.data) {
            const updatedComment = response.data;
            
            set((state) => ({
              comments: state.comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
              ),
            }));
            
            toast.success('Comment updated successfully!');
          } else {
            throw new Error(response.message || 'Failed to update comment');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to update comment';
          toast.error(errorMessage);
        }
      },

      deleteComment: async (commentId: string) => {
        try {
          const current = get().currentPost;
          if (!current) throw new Error('No current post selected');
          const response = await apiClient.deleteComment(current.id, commentId);
          
          if (response.success) {
            set((state) => ({
              comments: state.comments.filter((comment) => comment.id !== commentId),
              currentPost: state.currentPost
                ? { ...state.currentPost, _count: { ...state.currentPost._count, comments: Math.max(0, state.currentPost._count.comments - 1) } }
                : null,
            }));
            
            toast.success('Comment deleted successfully!');
          } else {
            throw new Error(response.message || 'Failed to delete comment');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to delete comment';
          toast.error(errorMessage);
        }
      },

      likeComment: async (commentId: string) => {
        try {
          const current = get().currentPost;
          if (!current) throw new Error('No current post selected');
          const response = await apiClient.likeComment(current.id, commentId);
          
          if (response.success) {
            set((state) => ({
              comments: state.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1, isLiked: true }
                  : comment
              ),
            }));
          }
        } catch (error: any) {
          console.error('Error liking comment:', error);
        }
      },

      unlikeComment: async (commentId: string) => {
        try {
          const current = get().currentPost;
          if (!current) throw new Error('No current post selected');
          const response = await apiClient.unlikeComment(current.id, commentId);
          
          if (response.success) {
            set((state) => ({
              comments: state.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: Math.max(0, comment.likes - 1), isLiked: false }
                  : comment
              ),
            }));
          }
        } catch (error: any) {
          console.error('Error unliking comment:', error);
        }
      },

      // Filter actions
      setFilters: (filters: PostFilters) => {
        set({ filters, page: 1 });
      },

      clearFilters: () => {
        set({ filters: {}, page: 1 });
      },

      // State management
      clearError: () => {
        set({ error: null, commentsError: null });
      },

      clearCurrentPost: () => {
        set({ currentPost: null, comments: [] });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'post-store',
    }
  )
);
