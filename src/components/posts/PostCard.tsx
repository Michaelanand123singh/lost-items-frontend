import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
import { formatRelativeTime, truncateText, getCategoryColor, getStatusColor } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onUnlike?: (postId: string) => void;
  isLiked?: boolean;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onUnlike,
  isLiked = false,
  className,
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
      <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${className}`}>
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-48 bg-secondary-100 rounded-t-lg overflow-hidden">
            {post.images && post.images.length > 0 ? (
              <Image
                src={post.images[0]}
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
          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
              {truncateText(post.description, 120)}
            </p>

            {/* Location */}
            <div className="flex items-center text-secondary-500 text-sm mb-3">
              <MapPin className="h-4 w-4 mr-1" />
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
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {post.author.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-secondary-600">
                  {post.author.username}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-secondary-500 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatRelativeTime(post.createdAt)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post._count.comments}</span>
                </div>

                <button
                  onClick={handleLikeClick}
                  className={`flex items-center space-x-1 transition-colors ${
                    isLiked ? 'text-error-500' : 'hover:text-error-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
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
