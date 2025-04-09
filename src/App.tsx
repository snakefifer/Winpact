import React from 'react';
import { GiftIcon, ChevronRightIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          Eagles Super Bowl Ring
          <span className="block text-5xl md:text-7xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            Sweepstakes
          </span>
        </h1>

        {/* Ring Image Section */}
        <div className="relative my-12">
          {/* Champions Text Behind Ring */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-[120px] md:text-[180px] font-black text-amber-500/50 select-none">
              CHAMPIONS
            </span>
          </div>

          {/* Ring Image */}
          <div className="relative z-10 w-full max-w-2xl mx-auto">
            <img
              src="/ring.png"
              alt="Eagles Super Bowl Ring"
              className="w-full rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-green-600/30">
            Enter Now
            <GiftIcon className="w-5 h-5" />
          </button>
          
          <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all">
            Learn More
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-8">
          Sweepstakes entry period ends soon. No purchase necessary. See official rules for details.
        </p>
      </div>
    </div>
  );
}

export default App;