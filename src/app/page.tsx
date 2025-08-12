import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import PostList from '@/components/posts/PostList';
import { 
  Search, 
  Users, 
  Shield, 
  MapPin, 
  Bell, 
  Heart,
  ArrowRight,
  Plus
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Find Your Lost Items
              <span className="text-primary-600"> Together</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Join our community-driven platform where people help each other find lost items. 
              Whether you've lost something or found something, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.posts}>
                <Button size="lg" className="text-lg px-8 py-3">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Posts
                </Button>
              </Link>
              <Link href={ROUTES.createPost}>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1,234+</div>
              <div className="text-secondary-600">Items Found</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5,678+</div>
              <div className="text-secondary-600">Community Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">89%</div>
              <div className="text-secondary-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-secondary-600">Active Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We provide the tools and community support you need to find your lost items quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Smart Search
                </h3>
                <p className="text-secondary-600">
                  Advanced search and filtering to help you find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Community Support
                </h3>
                <p className="text-secondary-600">
                  Connect with helpful community members who want to assist in finding lost items.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Safe & Secure
                </h3>
                <p className="text-secondary-600">
                  Your privacy and security are our top priorities. All interactions are protected.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Location-Based
                </h3>
                <p className="text-secondary-600">
                  Find items in your area with our location-based search and filtering.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Instant Notifications
                </h3>
                <p className="text-secondary-600">
                  Get notified immediately when someone responds to your post or finds a match.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Rewards System
                </h3>
                <p className="text-secondary-600">
                  Offer rewards for found items and build trust within the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Recent Posts
              </h2>
              <p className="text-xl text-secondary-600">
                Latest lost and found items in your community
              </p>
            </div>
            <Link href={ROUTES.posts}>
              <Button variant="outline" className="flex items-center">
                View All Posts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <PostList 
            showFilters={false}
            showSearch={false}
            className="mb-8"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Lost Item?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have successfully found their lost items through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.register}>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href={ROUTES.posts}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
                Browse Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
