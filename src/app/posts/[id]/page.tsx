'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Clock, 
  DollarSign,
  Edit,
  Trash2,
  Share,
  Phone,
  Mail
} from 'lucide-react';
import { POST_CATEGORIES, POST_STATUSES } from '@/lib/constants';
import { formatRelativeTime, getCategoryColor, getStatusColor } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const { currentPost, fetchPost, isLoading, error, likePost, unlikePost } = usePosts();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId, fetchPost]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading post..." />
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-secondary-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-secondary-600 mb-6">
              {error || 'The post you are looking for does not exist.'}
            </p>
            <Link href={ROUTES.posts}>
              <Button>Back to Posts</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = POST_CATEGORIES[currentPost.category];
  const statusInfo = POST_STATUSES[currentPost.status];
  const isAuthor = user?.id === currentPost.author.id;

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentPost.status)}`}>
                {statusInfo.icon} {statusInfo.label}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentPost.category)}`}>
                {categoryInfo.icon} {categoryInfo.label}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              {isAuthor && (
                <>
                  <Link href={`/posts/${currentPost.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{currentPost.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-secondary-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatRelativeTime(currentPost.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{currentPost._count.comments} comments</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Images */}
                {currentPost.images && currentPost.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPost.images.map((image, index) => (
                      <div key={index} className="relative aspect-video bg-secondary-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${currentPost.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Description</h3>
                  <p className="text-secondary-700 whitespace-pre-wrap">{currentPost.description}</p>
                </div>

                {/* Tags */}
                {currentPost.tags && currentPost.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => likePost(currentPost.id)}
                      className="flex items-center space-x-2 text-secondary-600 hover:text-error-500 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>{currentPost._count.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Comments ({currentPost._count.comments})
              </h3>
              {/* Comments component would go here */}
              <div className="text-center py-8 text-secondary-600">
                Comments feature coming soon...
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posted by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {currentPost.author.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">
                      {currentPost.author.username}
                    </p>
                    <p className="text-sm text-secondary-600">
                      Member since {formatRelativeTime(currentPost.author.createdAt || '')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-700">
                  {currentPost.location.address}<br />
                  {currentPost.location.city}, {currentPost.location.state}<br />
                  {currentPost.location.country}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentPost.contactInfo.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-secondary-500" />
                    <span className="text-secondary-700">{currentPost.contactInfo.phone}</span>
                  </div>
                )}
                {currentPost.contactInfo.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-secondary-500" />
                    <span className="text-secondary-700">{currentPost.contactInfo.email}</span>
                  </div>
                )}
                <p className="text-sm text-secondary-600">
                  Preferred contact: {currentPost.contactInfo.preferredContact}
                </p>
              </CardContent>
            </Card>

            {/* Reward */}
            {currentPost.reward && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Reward
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-warning-600">
                    ${currentPost.reward}
                  </p>
                  <p className="text-sm text-secondary-600 mt-1">
                    Offered for finding this item
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
