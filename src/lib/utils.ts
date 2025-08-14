import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { APP_CONFIG } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy') {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

export function formatRelativeTime(date: string | Date) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    electronics: 'bg-blue-100 text-blue-800',
    jewelry: 'bg-purple-100 text-purple-800',
    clothing: 'bg-green-100 text-green-800',
    documents: 'bg-red-100 text-red-800',
    pets: 'bg-orange-100 text-orange-800',
    vehicles: 'bg-gray-100 text-gray-800',
    books: 'bg-brown-100 text-brown-800',
    sports: 'bg-yellow-100 text-yellow-800',
    other: 'bg-slate-100 text-slate-800',
  };
  
  return colors[category] || colors.other;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-green-100 text-green-800',
    returned: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };
  
  return colors[status] || colors.lost;
}

/**
 * Resolves a potentially relative image path (e.g. "/uploads/abc.jpg" or "uploads/abc.jpg")
 * to an absolute URL on the API host. Leaves full URLs (http/https) unchanged.
 */
export function resolveImageUrl(pathOrUrl: string | undefined | null): string {
  if (!pathOrUrl) return '';
  const url = String(pathOrUrl);
  if (/^https?:\/\//i.test(url)) return url;

  const baseHost = (APP_CONFIG.wsUrl || APP_CONFIG.apiUrl.replace(/\/api$/, ''))
    .replace(/\/$/, '');
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  // Ensure it targets uploads or any given path on the backend host
  return `${baseHost}${normalizedPath}`;
}
