
import React, { useState, useEffect } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import LetterCard from './components/LetterCard';
import MusicToggle from './components/MusicToggle';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  const [isForgiven, setIsForgiven] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleForgive = () => {
    setIsForgiven(true);
    setShowHearts(true);
    // Vibrate if mobile
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fdf2f8] via-[#f3e8ff] to-[#fff7ed] transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <BackgroundParticles />
      <MusicToggle />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Header Section */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-cursive text-pink-600 animate-fade-in drop-shadow-sm">
            Sorry Nancy 😭
          </h1>
          <p className="text-lg md:text-xl text-lavender-700 font-light tracking-wide uppercase opacity-80">
            I never meant to hurt you.
          </p>
        </header>

        {/* Letter Section */}
        <section className="w-full flex justify-center mb-16 animate-slide-up">
          <LetterCard />
        </section>

        {/* Interaction Section */}
        <footer className="text-center space-y-8 animate-fade-in-delayed">
          <p className="text-2xl font-light italic text-gray-500">
            Friends forever?
          </p>

          {!isForgiven ? (
            <button
              onClick={handleForgive}
              className="group relative px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Click if you forgive me 💖
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </button>
          ) : (
            <div className="animate-bounce-in flex flex-col items-center space-y-2">
              <p className="text-3xl font-cursive text-pink-600">Thank you so much! 🥰</p>
              <p className="text-sm text-gray-400">You are the best!</p>
            </div>
          )}
        </footer>
      </main>

      {/* Floating Animated Heart */}
      <div className="fixed bottom-10 left-10 z-20 pointer-events-none">
        <Heart className="text-pink-300 w-12 h-12 opacity-50 animate-slow-float" fill="currentColor" />
      </div>

      {/* Burst Hearts on Forgiveness */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-500"
              style={{
                left: '50%',
                top: '80%',
                fontSize: `${Math.random() * 20 + 10}px`,
                animation: `heart-burst ${Math.random() * 2 + 1}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slow-float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        @keyframes heart-burst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { 
            transform: translate(
              ${(Math.random() - 0.5) * 600}px, 
              ${-Math.random() * 600 - 100}px
            ) scale(1.5) rotate(${Math.random() * 360}deg); 
            opacity: 0; 
          }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; }
        .animate-fade-in-delayed { animation: fade-in 2s ease-out 1s forwards; opacity: 0; }
        .animate-slide-up { animation: slide-up 1.2s ease-out 0.5s forwards; opacity: 0; }
        .animate-slow-float { animation: slow-float 5s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
