import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import PostList from '@/components/posts/PostList';
import {
  Search,
  Users,
  Shield,
  ArrowRight,
  Plus
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import HeroBackgroundSlider from '@/components/common/HeroBackgroundSlider';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-white min-h-[60vh]">
        <HeroBackgroundSlider
          images={[
            'https://images.unsplash.com/photo-1520974722031-0f2430a4b1c8?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512646605205-78422b5cb1dc?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1920&auto=format&fit=crop',
          ]}
          mode="marquee"
          speed={50}
        />
        <div className="absolute inset-0 bg-grid mask-radial-fade pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <span className="inline-flex items-center rounded-full bg-secondary-100/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-secondary-600 ring-1 ring-secondary-200">
              Community-powered lost & found
            </span>
            <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-secondary-900">
              Find what’s lost. Return what’s found.
            </h1>
            <p className="mt-4 text-sm leading-6 text-secondary-600">
              A discreet, reliable way to get lost items back to their owners. Designed for clarity, built for speed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={ROUTES.posts}>
                <Button size="md" className="px-5">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Posts
                </Button>
              </Link>
              <Link href={ROUTES.createPost}>
                <Button variant="outline" size="md" className="px-5">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-secondary-200 rounded-xl border border-secondary-200 bg-white/60">
            <div className="p-6 text-center">
              <div className="text-2xl font-semibold text-secondary-900">1,234+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-secondary-500">Items Found</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-semibold text-secondary-900">5,678+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-secondary-500">Community Members</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-semibold text-secondary-900">89%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-secondary-500">Match Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary-900">Built for real-world recovery</h2>
            <p className="mt-3 text-sm text-secondary-600 max-w-2xl mx-auto">
              Focused, signal-first features that help the right people find each other—fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5">
              <CardContent className="p-0 text-left">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-3">
                  <Search className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-medium text-secondary-900">Precision search</h3>
                <p className="mt-1.5 text-sm text-secondary-600">Filter by category, location, and time to surface relevant posts quickly.</p>
              </CardContent>
            </Card>

            <Card className="p-5">
              <CardContent className="p-0 text-left">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-3">
                  <Users className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-medium text-secondary-900">Community signal</h3>
                <p className="mt-1.5 text-sm text-secondary-600">Lightweight interactions that encourage helpful responses without noise.</p>
              </CardContent>
            </Card>

            <Card className="p-5">
              <CardContent className="p-0 text-left">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-3">
                  <Shield className="h-4 w-4 text-primary-600" />
                </div>
                <h3 className="text-base font-medium text-secondary-900">Trust & safety</h3>
                <p className="mt-1.5 text-sm text-secondary-600">Privacy-forward by default with reporting and moderation tools.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-secondary-900">Recent posts</h2>
              <p className="mt-1 text-sm text-secondary-600">Latest lost and found items near you</p>
            </div>
            <Link href={ROUTES.posts} className="inline-flex items-center text-sm text-secondary-700 hover:text-secondary-900">
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <PostList
            showFilters={false}
            showSearch={false}
            className="mb-6"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-xl px-6 py-8 text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-secondary-900">Ready to get an item back to its owner?</h2>
            <p className="mt-2 text-sm text-secondary-600 max-w-xl mx-auto">Create a focused post or browse matches—no clutter, just signal.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={ROUTES.register}>
                <Button size="md" className="px-5">Get started</Button>
              </Link>
              <Link href={ROUTES.posts}>
                <Button size="md" variant="outline" className="px-5">Browse now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
