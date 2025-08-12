import React from 'react';

export const metadata = {
  title: 'FAQ - Lost Items Platform',
  description: 'Frequently asked questions about the Lost Items Platform.',
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">FAQ</h1>
        <div className="space-y-6 text-secondary-700">
          <div>
            <h2 className="font-semibold">Is the platform free?</h2>
            <p>Yes, posting and browsing are free.</p>
          </div>
          <div>
            <h2 className="font-semibold">How do I contact a poster?</h2>
            <p>Open the post and use the comments to reach out.</p>
          </div>
          <div>
            <h2 className="font-semibold">Can I offer a reward?</h2>
            <p>Yes, you can mention a reward in your post description.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


