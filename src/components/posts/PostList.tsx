'use client';

import React, { useState, useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from './PostCard';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown,
  X
} from 'lucide-react';
import { POST_CATEGORIES, POST_STATUSES } from '@/lib/constants';
import { PostFilters } from '@/types/post';

interface PostListProps {
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  posts?: any[];
  onPostLike?: (postId: string) => void;
  onPostUnlike?: (postId: string) => void;
  likedPosts?: string[];
  compact?: boolean;
}

const PostList: React.FC<PostListProps> = ({
  className,
  showFilters = true,
  showSearch = true,
  posts: externalPosts,
  onPostLike,
  onPostUnlike,
  likedPosts = [],
  compact = false,
}) => {
  const {
    posts,
    isLoading,
    error,
    hasMore,
    loadMore,
    searchPosts,
    filterByCategory,
    filterByStatus,
    clearFilters,
    filters,
  } = usePosts();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use external posts if provided, otherwise use store posts
  const displayPosts = externalPosts || posts;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchPosts(query);
  };

  const handleCategoryFilter = (category: string) => {
    filterByCategory(category);
    setShowFilterDropdown(false);
  };

  const handleStatusFilter = (status: string) => {
    filterByStatus(status);
    setShowFilterDropdown(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchQuery('');
    setShowFilterDropdown(false);
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-error-600">Error loading posts: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header with Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search lost items..."
                  value={searchQuery}
                  onSearch={handleSearch}
                  fullWidth
                />
              </div>
            </div>
          )}

          {/* Filters and View Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              {showFilters && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {showFilterDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-secondary-200 rounded-lg shadow-lg z-10">
                      <div className="p-4 space-y-4">
                        {/* Category Filter */}
                        <div>
                          <h4 className="font-medium text-secondary-900 mb-2">Category</h4>
                          <div className="space-y-2">
                            {Object.entries(POST_CATEGORIES).map(([key, category]) => (
                              <button
                                key={key}
                                onClick={() => handleCategoryFilter(key)}
                                className="flex items-center space-x-2 w-full text-left p-2 rounded hover:bg-secondary-50"
                              >
                                <span>{category.icon}</span>
                                <span className="text-sm">{category.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                          <h4 className="font-medium text-secondary-900 mb-2">Status</h4>
                          <div className="space-y-2">
                            {Object.entries(POST_STATUSES).map(([key, status]) => (
                              <button
                                key={key}
                                onClick={() => handleStatusFilter(key)}
                                className="flex items-center space-x-2 w-full text-left p-2 rounded hover:bg-secondary-50"
                              >
                                <span>{status.icon}</span>
                                <span className="text-sm">{status.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="flex items-center space-x-2 text-secondary-600"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </Button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                  Category: {POST_CATEGORIES[filters.category as keyof typeof POST_CATEGORIES]?.label}
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                  Status: {POST_STATUSES[filters.status as keyof typeof POST_STATUSES]?.label}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Posts Grid/List */}
      {isLoading && displayPosts.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Loading posts..." />
        </div>
      ) : displayPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-secondary-900 mb-2">
            No posts found
          </h3>
          <p className="text-secondary-600">
            {hasActiveFilters 
              ? 'Try adjusting your filters or search terms.'
              : 'Be the first to post about a lost item!'
            }
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            }
          >
            {displayPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={onPostLike}
                onUnlike={onPostUnlike}
                isLiked={likedPosts.includes(post.id)}
                className={viewMode === 'list' ? 'flex' : ''}
                compact={compact || viewMode === 'list'}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMore}
                loading={isLoading}
                variant="outline"
                size="md"
              >
                Load More Posts
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
