'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PostList from '@/components/posts/PostList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { 
  Plus, 
  Search, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.login);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" text="Loading dashboard..." />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Mock data - in real app, this would come from API
  const stats = {
    totalPosts: 12,
    activePosts: 8,
    resolvedPosts: 4,
    totalComments: 45,
    successfulReturns: 3,
    reputation: 1250,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'post',
      title: 'Lost iPhone 13',
      time: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      type: 'comment',
      title: 'Found keys near Central Park',
      time: '1 day ago',
      status: 'resolved',
    },
    {
      id: 3,
      type: 'like',
      title: 'Lost wallet',
      time: '3 days ago',
      status: 'active',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-secondary-600">
            Here's what's happening with your lost items and community activity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href={ROUTES.createPost}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Create New Post</h3>
                    <p className="text-sm text-secondary-600">Report a lost or found item</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={ROUTES.posts}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Browse Posts</h3>
                    <p className="text-sm text-secondary-600">Search for lost items</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">View Profile</h3>
                    <p className="text-sm text-secondary-600">Manage your account</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Posts</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.totalPosts}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Active Posts</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.activePosts}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Resolved</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.resolvedPosts}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Reputation</p>
                  <p className="text-2xl font-bold text-secondary-900">{stats.reputation}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      {activity.type === 'post' && <Plus className="h-4 w-4 text-primary-600" />}
                      {activity.type === 'comment' && <MessageCircle className="h-4 w-4 text-primary-600" />}
                      {activity.type === 'like' && <Heart className="h-4 w-4 text-primary-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary-900">{activity.title}</p>
                      <p className="text-xs text-secondary-600">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'active' 
                        ? 'bg-warning-100 text-warning-800' 
                        : 'bg-success-100 text-success-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Total Community Members</span>
                  <span className="font-semibold">5,678+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Items Found This Month</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Success Rate</span>
                  <span className="font-semibold text-success-600">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Active Posts</span>
                  <span className="font-semibold">1,234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Posts */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">Your Posts</h2>
            <Link href={ROUTES.createPost}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>
          
          <PostList 
            showFilters={false}
            showSearch={false}
            className="mb-8"
          />
        </div>
      </div>
    </div>
  );
}
