export const APP_CONFIG = {
  name: 'Lost Items Platform',
  description: 'Find your lost items with the help of the community',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
  maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'),
} as const;

export const POST_CATEGORIES = {
  electronics: {
    label: 'Electronics',
    icon: '📱',
    color: 'blue',
  },
  jewelry: {
    label: 'Jewelry',
    icon: '💍',
    color: 'purple',
  },
  clothing: {
    label: 'Clothing',
    icon: '👕',
    color: 'green',
  },
  documents: {
    label: 'Documents',
    icon: '📄',
    color: 'red',
  },
  pets: {
    label: 'Pets',
    icon: '🐕',
    color: 'orange',
  },
  vehicles: {
    label: 'Vehicles',
    icon: '🚗',
    color: 'gray',
  },
  books: {
    label: 'Books',
    icon: '📚',
    color: 'brown',
  },
  sports: {
    label: 'Sports Equipment',
    icon: '⚽',
    color: 'yellow',
  },
  other: {
    label: 'Other',
    icon: '📦',
    color: 'slate',
  },
} as const;

export const POST_STATUSES = {
  lost: {
    label: 'Lost',
    color: 'error',
    icon: '🔍',
  },
  found: {
    label: 'Found',
    color: 'success',
    icon: '✅',
  },
  returned: {
    label: 'Returned',
    color: 'success',
    icon: '🎉',
  },
  closed: {
    label: 'Closed',
    color: 'secondary',
    icon: '🔒',
  },
} as const;

export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 50,
  defaultPage: 1,
} as const;

export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 5,
} as const;

export const VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
  },
  title: {
    minLength: 5,
    maxLength: 100,
  },
  description: {
    minLength: 10,
    maxLength: 2000,
  },
  comment: {
    minLength: 1,
    maxLength: 500,
  },
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  posts: '/posts',
  createPost: '/posts/create',
  profile: '/profile',
  settings: '/settings',
} as const;

export const STORAGE_KEYS = {
  token: 'auth_token',
  refreshToken: 'refresh_token',
  user: 'user_data',
  theme: 'theme_preference',
  language: 'language_preference',
} as const;
