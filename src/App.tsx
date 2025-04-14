import React, { useState, useEffect } from 'react';
import { GiftIcon, ChevronRightIcon, CalendarDays, Trophy, Share2, Menu, X } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-05-01'); // Example end date
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Sticky Navigation */}
      <nav className="fixed w-full z-50 bg-[#004C54] shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Trophy className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">EAGLES</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Schedule</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Team</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">News</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Shop</a>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                Enter Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Home</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Schedule</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Team</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">News</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Shop</a>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors mt-4">
                Enter Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509588473231-2f7f0a5b7c3f?auto=format&fit=crop&q=80')",
            backgroundBlendMode: "overlay"
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight text-center">
            Fly High with the Eagles!
            <span className="block text-3xl md:text-5xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
              Super Bowl Ring Sweepstakes
            </span>
          </h1>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-white">{value}</div>
                <div className="text-sm text-green-400 uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRightIcon className="w-8 h-8 text-white rotate-90" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Ring Section */}
        <div className="relative my-12">
          {/* Champions Text Behind Ring */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-[120px] md:text-[180px] font-black text-amber-500/50 select-none">
              CHAMPIONS
            </span>
          </div>

          {/* Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Ring Image */}
          <div className="relative z-10 w-full max-w-2xl mx-auto">
            <img
              src="/Winpact/ring.png"
              alt="Eagles Super Bowl Ring"
              className="w-full rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Fan Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 my-16">
          {[
            {
              quote: "Being an Eagles fan is more than just watching football—it's family.",
              name: "Mike from South Philly",
              icon: Trophy
            },
            {
              quote: "The energy at the Linc is unmatched. There's nothing like game day!",
              name: "Sarah from Cherry Hill",
              icon: Share2
            },
            {
              quote: "This ring represents everything we've fought for. Go Birds!",
              name: "Tom from Delaware",
              icon: CalendarDays
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
              <testimonial.icon className="w-8 h-8 text-green-500 mb-4" />
              <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
              <p className="text-green-400 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center my-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-green-600/30">
              Enter Now
              <GiftIcon className="w-5 h-5" />
            </button>
            
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all">
              Learn More
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto">
          <form className="bg-gray-800/50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get exclusive Eagles news and sweepstakes updates delivered to your inbox.</p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
              />
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-16 text-center">
          Sweepstakes entry period ends soon. No purchase necessary. See official rules for details.
        </p>
      </div>
    </div>
  );
}

export default App;