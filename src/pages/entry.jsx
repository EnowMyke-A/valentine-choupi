import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * EntryVerificationScreen – A faithful React replica of the Valentine's entry page.
 */
const EntryVerificationScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State for logic
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (!nickname.trim()) return;
    
    setIsLoading(true);
    setError(""); // Clear error during loading

    // Fake load for 3 seconds
    setTimeout(() => {
      const isCorrect = nickname.toLowerCase().trim() === "pichipinipou";
      
      if (isCorrect) {
        login(); // Set authentication status
        navigate("/welcome");
      } else {
        const newAttemptCount = attempts + 1;
        setAttempts(newAttemptCount);
        setIsLoading(false);
        
        // Show hint after 2nd failed attempt
        if (newAttemptCount >= 2) {
          setError("Here is a hint : Pichi...");
        } else {
          setError("That's not the name. Try again?");
        }
      }
    }, 3000);
  };

  return (
    <>
      {/* Inject custom animations */}
      <style>{`
        /* Slide Up Animation Definition */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Applied to elements that should animate */
        .animate-reveal {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Shimmer for the button */
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="bg-surface-light dark:bg-background-dark font-display flex flex-col items-center relative overflow-x-hidden overflow-y-auto text-slate-800 dark:text-white">
        {/* Background decorative blurs */}
        <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main content */}
        <main className="w-full max-w-md mx-auto min-h-[100dvh] flex flex-col relative z-10 px-6 pt-[10vh] pb-8">
          {/* Top badge */}
          <div
            className="w-full flex justify-center mb-8 animate-reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center space-x-2 bg-primary/5 dark:bg-primary/10 px-4 py-2 rounded-full border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-primary uppercase">
                Private Valentine Portal
              </span>
            </div>
          </div>

          {/* Icon & headline */}
          <div
            className="flex-1 flex flex-col items-center text-center space-y-6 animate-reveal"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="mb-2 rounded-2xl p-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 shadow-sm border border-gray-100 dark:border-white/5">
              <span className="material-icons-round text-4xl text-primary">
                lock
              </span>
            </div>
            <div className="space-y-3 max-w-[280px]">
              <h1 className="text-3xl md:text-[42px] font-bold tracking-tight text-[#111111] dark:text-white leading-tight">
                Access for One Special Person Only
              </h1>
              <p className="text-[16px] text-[#666666] dark:text-gray-400 font-normal leading-relaxed">
                Making sure only one person in the world can unlock this.
              </p>
            </div>
          </div>

          {/* Input & actions */}
          <div
            className="w-full flex flex-col items-center space-y-4 mt-auto pt-8 animate-reveal"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-full max-w-[280px] relative">
              <input
                className="w-full bg-white dark:bg-white/5 text-gray-800 dark:text-white placeholder:text-gray-400 placeholder:text-[14px] py-4 px-4 border-[2px] border-[#F5F5F7] dark:border-white/10 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                placeholder="Enter secret nickname you gave me"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isLoading}
              />
              {/* Feedback/Hint Message */}
              {error && (
                <p className="absolute -top-6 left-0 w-full text-center text-[13px] text-primary font-medium animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <button 
              onClick={handleVerify}
              disabled={isLoading}
              className={`group relative w-full max-w-[280px] ${isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'} text-white font-medium text-[17px] py-4 px-8 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-3 overflow-hidden`}
            >
              <span className="relative z-20">
                {isLoading ? "Verifying access..." : "Verify name & enter"}
              </span>
              {!isLoading && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
              )}
            </button>

            <button className="text-sm text-[#888888] dark:text-gray-500 hover:text-primary transition-colors font-medium">
              Are you her?
            </button>

            <div className="pt-8 text-[10px] text-gray-300 dark:text-gray-700 font-medium tracking-widest uppercase">
              Encrypted with Love
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EntryVerificationScreen;