import { useEffect, useCallback } from 'react';
import { usePostStore } from '@/store/postStore';
import { CreatePostData, UpdatePostData, PostFilters, PostCategory, PostStatus } from '@/types/post';
import { CreateCommentData } from '@/types/comment';

export const usePosts = () => {
  const {
    posts,
    currentPost,
    isLoading,
    error,
    total,
    page,
    limit,
    hasMore,
    filters,
    comments,
    commentsLoading,
    commentsError,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
    setFilters,
    clearFilters,
    clearError,
    clearCurrentPost,
    reset,
  } = usePostStore();

  // Load posts on mount or when filters change
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchPosts({ page: page + 1 });
    }
  }, [hasMore, isLoading, page, fetchPosts]);

  // Search posts
  const searchPosts = useCallback((query: string) => {
    setFilters({ ...filters, search: query });
  }, [filters, setFilters]);

  // Filter by category
  const filterByCategory = useCallback((category: string) => {
    setFilters({ ...filters, category: category as PostCategory });
  }, [filters, setFilters]);

  // Filter by status
  const filterByStatus = useCallback((status: string) => {
    setFilters({ ...filters, status: status as PostStatus });
  }, [filters, setFilters]);

  // Filter by location
  const filterByLocation = useCallback((location: string) => {
    setFilters({ ...filters, location });
  }, [filters, setFilters]);

  // Handle post creation
  const handleCreatePost = useCallback(async (data: CreatePostData) => {
    await createPost(data);
  }, [createPost]);

  // Handle post update
  const handleUpdatePost = useCallback(async (id: string, data: Partial<UpdatePostData>) => {
    await updatePost(id, data);
  }, [updatePost]);

  // Handle post deletion
  const handleDeletePost = useCallback(async (id: string) => {
    await deletePost(id);
  }, [deletePost]);

  // Handle post like/unlike
  const handleLikePost = useCallback(async (id: string) => {
    await likePost(id);
  }, [likePost]);

  const handleUnlikePost = useCallback(async (id: string) => {
    await unlikePost(id);
  }, [unlikePost]);

  // Handle comment creation
  const handleCreateComment = useCallback(async (postId: string, data: CreateCommentData) => {
    await createComment(postId, data);
  }, [createComment]);

  // Handle comment update
  const handleUpdateComment = useCallback(async (commentId: string, content: string) => {
    await updateComment(commentId, content);
  }, [updateComment]);

  // Handle comment deletion
  const handleDeleteComment = useCallback(async (commentId: string) => {
    await deleteComment(commentId);
  }, [deleteComment]);

  // Handle comment like/unlike
  const handleLikeComment = useCallback(async (commentId: string) => {
    await likeComment(commentId);
  }, [likeComment]);

  const handleUnlikeComment = useCallback(async (commentId: string) => {
    await unlikeComment(commentId);
  }, [unlikeComment]);

  return {
    // State
    posts,
    currentPost,
    isLoading,
    error,
    total,
    page,
    limit,
    hasMore,
    filters,
    comments,
    commentsLoading,
    commentsError,
    
    // Actions
    fetchPosts,
    fetchPost,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
    likePost: handleLikePost,
    unlikePost: handleUnlikePost,
    fetchComments,
    createComment: handleCreateComment,
    updateComment: handleUpdateComment,
    deleteComment: handleDeleteComment,
    likeComment: handleLikeComment,
    unlikeComment: handleUnlikeComment,
    
    // Filter actions
    setFilters,
    clearFilters,
    searchPosts,
    filterByCategory,
    filterByStatus,
    filterByLocation,
    
    // Utility actions
    loadMore,
    clearError,
    clearCurrentPost,
    reset,
  };
};
