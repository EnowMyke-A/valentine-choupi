import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ConvinceScreen = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const [isGifsLoaded, setIsGifsLoaded] = useState(false);

  const intervalRef = useRef(null);

  const totalCards = 6;
  const DURATION = 4000;
  const STEP = 10;

  const cardsData = [
    { postId: "22639184", text: "You are my soulmate (No disputing that)", aspectRatio: "1", url: "https://tenor.com/view/tkthao219-bubududu-panda-gif-22639184", label: "Tkthao219 Bubududu Sticker" },
    { postId: "8287565098988162462", text: "... This is how I see you, even when you act grown or upset", aspectRatio: "1", url: "https://tenor.com/view/bubu-cute-bubu-dudu-bubu-dudu-love-gif-8287565098988162462", label: "Bubu Cute Bubu Dudu Sticker" },
    { postId: "27096090", text: "... I'll let you bite me anywhere you want", aspectRatio: "1.00946", url: "https://tenor.com/view/bubu-love-bite-bubu-dudu-gif-27096090", label: "Bubu Love Bite Sticker" },
    { postId: "978400170714002539", text: "...I'll assist you with your nails and hair when you need me", aspectRatio: "1.34595", url: "https://tenor.com/view/care-bubu-gif-978400170714002539", label: "Care Bubu Sticker" },
    { postId: "1613492217735624274", text: "My heart works better when you're my Valentine.", aspectRatio: "1", url: "https://tenor.com/view/bubu-dudu-sseeyall-gif-1613492217735624274", label: "Bubu Dudu Sseeyall Sticker" },
    { postId: "10462476369196274028", text: "Sooo... Will you be my Valentine Now?", aspectRatio: "1", url: "https://tenor.com/view/hi-gif-10462476369196274028", label: "Hi Sticker" },
  ];

  useEffect(() => {
    setIsGifsLoaded(false);
    const scriptId = "tenor-embed-script";
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    const checkLoad = setInterval(() => {
      const currentCard = document.querySelector(`[data-postid="${cardsData[currentIndex].postId}"]`);
      if (currentCard && currentCard.querySelector('iframe')) {
        setIsGifsLoaded(true);
        clearInterval(checkLoad);
      }
    }, 100);

    return () => {
      const scriptToClean = document.getElementById(scriptId);
      if (scriptToClean) scriptToClean.remove();
      clearInterval(checkLoad);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused || !isGifsLoaded) return;
    if (currentIndex === totalCards - 1 && progress >= 100) return;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (STEP / DURATION) * 100;
        return next >= 100 ? 100 : next;
      });
    }, STEP);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isPaused, progress, isGifsLoaded]);

  useEffect(() => {
    if (progress >= 100 && currentIndex < totalCards - 1) {
      setProgress(0);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [progress, currentIndex]);

  const togglePause = () => {
    if (currentIndex === totalCards - 1 && progress >= 100) {
      setCurrentIndex(0);
      setProgress(0);
      setIsPaused(false);
    } else {
      setIsPaused((prev) => !prev);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsPaused(false);
      setProgress(0);
    }
  };

  const handleNoClick = () => {
    setNoClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setTimeout(() => {
          const noBtn = document.getElementById("noBtn");
          if (noBtn) noBtn.style.display = "none";
        }, 500);
      }
      return newCount;
    });
  };

  const handleYesClick = () => navigate("/final");

  const getYesButtonStyle = () => {
    switch (noClickCount) {
      case 1: return { transform: "scale(1.1)", padding: "1.5rem 0" };
      case 2: return { transform: "scale(1.3)", padding: "2.5rem 0", fontSize: "1.5rem" };
      case 3: return { transform: "scale(1.5)", padding: "4rem 0", fontSize: "2rem" };
      default: return {};
    }
  };

  const getNoButtonStyle = () => {
    switch (noClickCount) {
      case 1: return { transform: "translateY(20px)" };
      case 2: return { transform: "translateY(60px) scale(0.8)", opacity: 0.6 };
      case 3: return { transform: "translateY(200px)", opacity: 0 };
      default: return {};
    }
  };

  const isAtEnd = currentIndex === totalCards - 1 && progress >= 100;

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
        .card-stack {
          position: relative;
          height: 300px;
          width: 100%;
          perspective: 1000px;
        }
        .reason-card {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          pointer-events: none;
        }
        .reason-card.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          z-index: 10;
          pointer-events: auto;
        }
        .reason-card.prev {
          opacity: 0.4;
          transform: translateY(-25px) scale(0.95);
          z-index: 5;
        }
        .reason-card.hidden-prev {
          opacity: 0;
          transform: translateY(-50px) scale(0.9);
          z-index: 0;
        }
        .progress-container {
          display: flex;
          gap: 4px;
          width: 80%;
          padding: 0 10px;
        }
        .progress-segment {
          height: 3px;
          flex: 1;
          background: rgba(233, 78, 119, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #e94e77;
          transition: width 0.1s linear;
        }
        .tenor-gif-embed {
          width: 160px !important;
          height: 160px !important;
        }
        #yesBtn, #noBtn {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        /* Visual style for disabled buttons */
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(0.5);
        }
      `}</style>

      <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen w-full flex flex-col overflow-y-auto">
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative w-full max-w-md mx-auto">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>

          <div className="w-full text-center z-10">
            <div className="space-y-4 animate-reveal" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                Why you should say yes...
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary font-medium">To Being My Valentine</span>
              </div>
            </div>

            <div className="card-stack mt-6 animate-reveal" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="progress-container">
                  {Array.from({ length: totalCards }).map((_, idx) => (
                    <div key={idx} className="progress-segment">
                      <div
                        className="progress-fill"
                        style={{
                          width: idx < currentIndex ? "100%" : idx === currentIndex ? `${progress}%` : "0%",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={togglePause}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  <span 
                    className="material-icons text-xl transition-transform duration-500"
                    style={{ transform: isPaused ? "rotate(360deg)" : "rotate(0deg)" }}
                  >
                    {isAtEnd ? "replay" : isPaused ? "play_arrow" : "pause"}
                  </span>
                </button>
              </div>

              {cardsData.map((card, idx) => {
                let cardClass = "reason-card";
                if (idx === currentIndex) cardClass += " active";
                else if (idx < currentIndex) cardClass += idx === currentIndex - 1 ? " prev" : " hidden-prev";
                
                return (
                  <div key={idx} className={cardClass}>
                    <div className="bg-white dark:bg-white/10 p-8 py-12 rounded-2xl shadow-soft border border-primary/10 flex flex-col items-center justify-center gap-4">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 z-30 cursor-default"></div>
                        <div
                          className="tenor-gif-embed"
                          data-postid={card.postId}
                          data-share-method="host"
                          data-aspect-ratio={card.aspectRatio}
                          data-width="100%"
                        >
                          <a href={card.url}>{card.label}</a>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{card.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 w-full px-4 pt-4 mt-[90px] flex flex-col items-center animate-reveal" style={{ animationDelay: "0.5s" }}>
              <button
                id="yesBtn"
                onClick={handleYesClick}
                disabled={!isAtEnd} // UPDATED: Disabled until end
                style={getYesButtonStyle()}
                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-semibold text-lg rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Yes Bubu, I will</span>
              </button>

              <button
                id="noBtn"
                onClick={handleNoClick}
                disabled={!isAtEnd} // UPDATED: Disabled until end
                style={getNoButtonStyle()}
                className="w-full bg-white border border-primary text-primary hover:bg-primary/5 font-semibold text-[17px] py-4 rounded-[12px] transition-all duration-300"
              >
                Noooo
              </button>

              <button
                onClick={prevCard}
                className="w-full py-3 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-icons text-sm">replay</span>
                <span>Wait, read those again</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ConvinceScreen;