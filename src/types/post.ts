export interface Post {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  status: PostStatus;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  reward?: number;
  contactInfo: {
    phone?: string;
    email?: string;
    preferredContact: 'phone' | 'email' | 'both';
  };
  tags: string[];
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
    likes: number;
  };
}

export interface CreatePostData {
  title: string;
  description: string;
  category: PostCategory;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: File[];
  reward?: number;
  contactInfo: {
    phone?: string;
    email?: string;
    preferredContact: 'phone' | 'email' | 'both';
  };
  tags: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export type PostCategory = 
  | 'electronics'
  | 'jewelry'
  | 'clothing'
  | 'documents'
  | 'pets'
  | 'vehicles'
  | 'books'
  | 'sports'
  | 'other';

export type PostStatus = 
  | 'lost'
  | 'found'
  | 'returned'
  | 'closed';

export interface PostFilters {
  category?: PostCategory;
  status?: PostStatus;
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  hasReward?: boolean;
  tags?: string[];
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
