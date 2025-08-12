import React from 'react';

export const metadata = {
  title: 'Help Center - Lost Items Platform',
  description: 'Get help and learn how to use the Lost Items Platform.',
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Help Center</h1>
        <p className="text-secondary-700 mb-4">
          Need assistance using the platform? Here are a few tips to get you started:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-secondary-700">
          <li>Browse posts to see recently lost or found items.</li>
          <li>Create a post to report a lost or found item.</li>
          <li>Use filters and search to narrow results by category or location.</li>
          <li>Comment on a post to contact the owner or finder.</li>
        </ul>
      </div>
    </div>
  );
}


