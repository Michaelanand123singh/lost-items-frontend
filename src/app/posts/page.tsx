import React from 'react';
import PostList from '@/components/posts/PostList';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Lost & Found Items
            </h1>
            <p className="text-secondary-600">
              Browse through lost and found items in your community
            </p>
          </div>
          <Link href={ROUTES.createPost}>
            <Button size="lg" className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create Post
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        <PostList />
      </div>
    </div>
  );
}
