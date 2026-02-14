import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation

/**
 * WelcomeScreen – Content centered with the button anchored to the bottom.
 */
const WelcomeScreen = () => {
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://tenor.com/embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://tenor.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-reveal {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(15px) rotate(15deg); }
          66% { transform: translateY(-15px) translateX(-15px) rotate(-10deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }

        @keyframes heartbeat {
          0% { transform: scale(1) rotate(3deg); }
          10% { transform: scale(1.15) rotate(3deg); }
          20% { transform: scale(1) rotate(3deg); }
          30% { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(3deg); }
        }

        @keyframes glowPulse {
          0% { transform: scale(1.5); opacity: 0.1; }
          15% { transform: scale(1.8); opacity: 0.2; }
          30% { transform: scale(1.5); opacity: 0.1; }
          45% { transform: scale(1.8); opacity: 0.2; }
          100% { transform: scale(1.5); opacity: 0.1; }
        }

        .petal {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          animation: float 8s ease-in-out infinite;
        }

        .heart-beat { animation: heartbeat 1.5s ease-in-out infinite; }
        .glow-beat { animation: glowPulse 1.5s ease-in-out infinite; }
      `}</style>

      <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 antialiased h-[100dvh] w-full overflow-hidden flex flex-col items-center relative">
        
        {/* Background blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Main content container */}
        <main className="w-full max-w-md h-full px-8 flex flex-col relative z-10">
          
          {/* Middle Content - Centered via flex-1 */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Heart Icon */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center animate-reveal" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl glow-beat"></div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-primary/10 relative z-10 heart-beat">
                <span className="material-icons text-primary text-5xl">favorite</span>
              </div>
            </div>

            {/* Name */}
            <div className="relative inline-block animate-reveal mb-6" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-semibold text-[#111111] dark:text-white tracking-tight relative z-10">
                Hey, Dudu
              </h2>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>

            {/* Text */}
            <p className="text-[18px] leading-relaxed text-[#666666] dark:text-gray-400 max-w-xs mx-auto font-medium animate-reveal" style={{ animationDelay: "0.6s" }}>
              I didn't want to just text this to you...<br />
              I wanted to make it a little special.
            </p>
          </div>

          {/* Bottom Anchored Button Block */}
          <div 
            className="w-full space-y-4 animate-reveal pb-10 mt-auto" 
            style={{ animationDelay: "0.8s" }}
          >
            <button 
              onClick={() => navigate("/question")}
              className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-white font-medium text-lg py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center group"
            >
              <span>Continue</span>
            </button>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600">
              Tap to open
            </p>
          </div>
        </main>

        {/* Floating petals */}
        <div className="petal bg-primary/20 blur-[1px] w-4 h-4 top-[15%] left-[10%]" style={{ animationDuration: "10s" }}></div>
        <div className="petal bg-primary/30 blur-[1px] w-3 h-3 bottom-[20%] left-[15%]" style={{ animationDuration: "7s", animationDelay: "1s" }}></div>
        <div className="petal bg-primary/10 blur-[2px] w-5 h-5 top-[20%] right-[15%]" style={{ animationDuration: "12s", animationDelay: "2s" }}></div>
        <div className="petal bg-primary/20 blur-[1px] w-3 h-3 top-[50%] right-[10%]" style={{ animationDuration: "9s", animationDelay: "0.5s" }}></div>
        <div className="petal bg-primary/40 blur-[1px] w-2 h-2 bottom-[15%] right-[25%]" style={{ animationDuration: "6s", animationDelay: "3s" }}></div>
      </div>
    </>
  );
};

export default WelcomeScreen;