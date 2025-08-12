export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  postId: string;
  parentId?: string;
  replies: Comment[];
  likes: number;
  isLiked: boolean;
  isAuthor: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  postId: string;
  parentId?: string;
}

export interface UpdateCommentData {
  id: string;
  content: string;
}

export interface CommentResponse {
  comment: Comment;
  message: string;
}

export interface CommentListResponse {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
