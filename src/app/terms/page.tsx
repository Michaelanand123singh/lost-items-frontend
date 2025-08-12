import React from 'react';

export const metadata = {
  title: 'Terms of Service - Lost Items Platform',
  description: 'Terms for using the Lost Items Platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Terms of Service</h1>
        <p className="text-secondary-700">
          By using this platform, you agree to act responsibly and comply with applicable laws. Content you post should be accurate and respectful.
        </p>
      </div>
    </div>
  );
}


