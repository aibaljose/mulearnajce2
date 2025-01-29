import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Share2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="relative h-screen">
        <nav className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2">
            <img src="/api/placeholder/40/40" alt="Logo" className="h-10" />
          </div>
          <button className="text-lime-400">MENU</button>
        </nav>
        
        <div className="absolute top-1/4 left-8 max-w-xl">
          <h1 className="text-7xl font-bold mb-4">
            EXPLORE<br />&amp; ENJOY
          </h1>
          <p className="text-gray-300 mb-6">Lorem Dow as Silicis arnge, Executive Producer And More Views</p>
          <button className="bg-lime-400 text-black px-8 py-3 rounded-full font-semibold">
            Get In Touch
          </button>
        </div>

        <div className="absolute bottom-8 left-8 flex items-center gap-8">
          <img src="/api/placeholder/100/40" alt="Partner 1" className="h-10" />
          <img src="/api/placeholder/100/40" alt="Partner 2" className="h-10" />
          <img src="/api/placeholder/100/40" alt="Partner 3" className="h-10" />
          <img src="/api/placeholder/100/40" alt="Partner 4" className="h-10" />
        </div>

        {/* News Card */}
        <div className="absolute bottom-8 right-8 bg-black/80 p-4 rounded-lg max-w-xs">
          <span className="text-lime-400 text-sm">7h 23m News</span>
          <h3 className="font-semibold mt-2">RINA TAKES ON CROWD SHARE: HEAVYWEIGHT CLASH</h3>
          <ArrowRight className="mt-2 text-lime-400" />
        </div>
      </header>

      {/* Music Player Section */}
      <section className="py-16 px-8">
        <div className="flex items-center gap-8">
          <img src="/api/placeholder/200/200" alt="Album Cover" className="rounded-lg" />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">ALBERTO STEVANO</h2>
            <p className="text-gray-400 mb-4">About Us / 2min read</p>
            <button className="text-lime-400">Read More</button>
          </div>
        </div>

        {/* Music Controls */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <SkipBack className="w-6 h-6" />
          <Play className="w-8 h-8" />
          <SkipForward className="w-6 h-6" />
          <Share2 className="w-6 h-6" />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-8 bg-black">
        <h2 className="text-5xl font-bold mb-8">UPCOMING EVENTS</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">One MusikFest</h3>
          <p className="text-gray-400 mb-4">May 23, 2024</p>
          <button className="bg-lime-400 text-black px-6 py-2 rounded-full">
            Buy Ticket
          </button>
        </div>
      </section>

      {/* Category Pills */}
      <div className="flex gap-4 px-8 py-8">
        <button className="bg-lime-400/20 text-lime-400 px-6 py-2 rounded-full">Our</button>
        <button className="bg-lime-400/20 text-lime-400 px-6 py-2 rounded-full">Best</button>
        <button className="bg-lime-400/20 text-lime-400 px-6 py-2 rounded-full">Event</button>
      </div>

      {/* Albums Section */}
      <section className="px-8 py-16">
        <h2 className="text-4xl font-bold mb-8">STUDIO ALBUMS &amp; SINGLES</h2>
        <div className="space-y-6">
          {['Albert - Expert Motivational Speaker', 'Stevano - Inspirational Leader', 'Athena - Life Coach and Motivational', 'GBrian - Dynamic Motivational Speaker'].map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-lg">{item}</span>
              <ArrowRight className="text-lime-400" />
            </div>
          ))}
        </div>
      </section>

      {/* Image Collection */}
      <section className="px-8 py-16">
        <h2 className="text-4xl font-bold mb-8">IMAGE COLLECTION</h2>
        <div className="relative">
          <img src="/api/placeholder/800/400" alt="Gallery" className="w-full rounded-lg" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">LET'S CONNECT AND CHAT</h2>
            <p className="text-lime-400">CROWD.SHARE@GMAIL.COM</p>
          </div>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-transparent border border-lime-400 p-3 rounded" />
            <input type="email" placeholder="Email" className="w-full bg-transparent border border-lime-400 p-3 rounded" />
            <input type="text" placeholder="Location" className="w-full bg-transparent border border-lime-400 p-3 rounded" />
            <button className="w-full bg-lime-400 text-black py-3 rounded font-semibold">
              SUBMIT
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;