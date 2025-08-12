import React from 'react';

export const metadata = {
  title: 'Contact Us - Lost Items Platform',
  description: 'Contact the Lost Items Platform team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Contact Us</h1>
        <p className="text-secondary-700 mb-4">
          Email: support@lostitems.com
        </p>
        <p className="text-secondary-700">We typically respond within 1-2 business days.</p>
      </div>
    </div>
  );
}


