export interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    publicProfile: boolean;
    showContactInfo: boolean;
  };
  stats: {
    postsCount: number;
    commentsCount: number;
    successfulReturns: number;
    memberSince: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  preferences?: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    publicProfile?: boolean;
    showContactInfo?: boolean;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserStats {
  totalPosts: number;
  activePosts: number;
  resolvedPosts: number;
  totalComments: number;
  successfulReturns: number;
  reputation: number;
}
