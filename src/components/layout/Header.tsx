'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import SearchBar from '@/components/common/SearchBar';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Plus,
  Bell,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={ROUTES.home} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">
                Lost Items
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href={ROUTES.posts}
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              Browse Posts
            </Link>
            {isAuthenticated && (
              <Link 
                href={ROUTES.createPost}
                className="text-secondary-600 hover:text-secondary-900 transition-colors"
              >
                Create Post
              </Link>
            )}
            <Link 
              href={ROUTES.dashboard}
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <SearchBar 
              placeholder="Search lost items..."
              variant="filled"
              size="sm"
              fullWidth
            />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>

                {/* Create Post Button */}
                <Link href={ROUTES.createPost}>
                  <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Create Post
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-secondary-900">
                      {user?.username}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-secondary-200 py-1 z-50">
                      <Link
                        href={`/profile/${user?.id}`}
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        href={ROUTES.dashboard}
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href={ROUTES.login}>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.register}>
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar 
            placeholder="Search lost items..."
            variant="filled"
            size="sm"
            fullWidth
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-secondary-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            <Link
              href={ROUTES.posts}
              className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Posts
            </Link>
            {isAuthenticated && (
              <Link
                href={ROUTES.createPost}
                className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Post
              </Link>
            )}
            <Link
              href={ROUTES.dashboard}
              className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {isAuthenticated && (
              <>
                <hr className="my-2" />
                <Link
                  href={`/profile/${user?.id}`}
                  className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
