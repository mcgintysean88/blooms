"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      // Send email to our API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Show success message
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-rose-600 mb-2">Blooms By Beth</h1>
        <div className="w-16 h-1 bg-rose-400 mx-auto mb-6"></div>
        
        <div className="mb-8">
          <Image
            src="/flower-icon.svg"
            alt="Flower icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Our website is blossoming...</h2>
        <p className="text-gray-600 mb-8">
          We&apos;re working on creating a beautiful online experience. 
          Sign up to be notified when we launch!
        </p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
                disabled={isSubmitting}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Notify Me"}
            </button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
            Thank you! We&apos;ll let you know when we launch.
          </div>
        )}
        
        <div className="mt-10 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Blooms By Beth</p>
          <p className="mt-1">bloomsbybethchs.com</p>
        </div>
      </div>
    </main>
  );
}
