import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Clock, 
  DollarSign,
  Eye
} from 'lucide-react';
import { Post } from '@/types/post';
import { POST_CATEGORIES, POST_STATUSES } from '@/lib/constants';
import { formatRelativeTime, truncateText, getCategoryColor, getStatusColor, resolveImageUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onUnlike?: (postId: string) => void;
  isLiked?: boolean;
  className?: string;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onUnlike,
  isLiked = false,
  className,
  compact = false,
}) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      onUnlike?.(post.id);
    } else {
      onLike?.(post.id);
    }
  };

  const categoryInfo = POST_CATEGORIES[post.category];
  const statusInfo = POST_STATUSES[post.status];

  return (
    <Link href={`/posts/${post.id}`}>
      <Card className={cn('hover:shadow-lg transition-all duration-200 cursor-pointer group', className)}>
        <CardContent className="p-0">
          {/* Image Section */}
          <div className={cn('relative bg-secondary-100 rounded-t-lg overflow-hidden', compact ? 'h-36' : 'h-48')}>
            {post.images && post.images.length > 0 ? (
              <Image
                src={resolveImageUrl(post.images[0])}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-4xl">{categoryInfo.icon}</div>
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                {statusInfo.icon} {statusInfo.label}
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                {categoryInfo.icon} {categoryInfo.label}
              </span>
            </div>

            {/* Reward Badge */}
            {post.reward && (
              <div className="absolute bottom-3 right-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${post.reward}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className={cn(compact ? 'p-3' : 'p-4')}>
            {/* Title */}
            <h3 className={cn('font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors', compact ? 'text-sm' : 'text-lg')}>
              {post.title}
            </h3>

            {/* Description */}
            <p className={cn('text-secondary-600 mb-3 line-clamp-2', compact ? 'text-xs' : 'text-sm')}>
              {truncateText(post.description, 120)}
            </p>

            {/* Location */}
            <div className={cn('flex items-center text-secondary-500 mb-3', compact ? 'text-xs' : 'text-sm')}>
              <MapPin className={cn('mr-1', compact ? 'h-3 w-3' : 'h-4 w-4')} />
              <span className="truncate">
                {post.location.city}, {post.location.state}
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-700"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-700">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
              {/* Author Info */}
              <div className="flex items-center space-x-2">
                <div className={cn('bg-primary-600 rounded-full flex items-center justify-center', compact ? 'w-5 h-5' : 'w-6 h-6')}>
                  <span className={cn('text-white font-medium', compact ? 'text-[10px]' : 'text-xs')}>
                    {post.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className={cn('text-secondary-600', compact ? 'text-xs' : 'text-sm')}>
                  {post.author.username}
                </span>
              </div>

              {/* Stats */}
              <div className={cn('flex items-center text-secondary-500', compact ? 'space-x-3 text-xs' : 'space-x-4 text-sm')}>
                <div className="flex items-center space-x-1">
                  <Clock className={cn(compact ? 'h-3 w-3' : 'h-4 w-4')} />
                  <span>{formatRelativeTime(post.createdAt)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <MessageCircle className={cn(compact ? 'h-3 w-3' : 'h-4 w-4')} />
                  <span>{post._count.comments}</span>
                </div>

                <button
                  onClick={handleLikeClick}
                  className={`flex items-center space-x-1 transition-colors ${
                    isLiked ? 'text-error-500' : 'hover:text-error-500'
                  }`}
                >
                  <Heart className={cn(isLiked ? 'fill-current' : '', compact ? 'h-3 w-3' : 'h-4 w-4')} />
                  <span>{post._count.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
