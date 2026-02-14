import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionScreen = () => {
  const navigate = useNavigate();

  // Load and Reset Tenor embed script
  useEffect(() => {
    const scriptId = "tenor-embed-script";
    const existingScript = document.getElementById(scriptId);

    // If script exists, we remove it and re-add it to force a re-scan of the DOM
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: Optional, but good practice
    return () => {
      const scriptToClean = document.getElementById(scriptId);
      if (scriptToClean) scriptToClean.remove();
    };
  }, []);

  // UPDATED: Navigates to /final
  const handleYesClick = () => {
    navigate("/final");
  };

  // Navigates to /convince
  const handleConvinceClick = () => {
    navigate("/convince");
  };

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

        .tenor-gif-embed {
          width: 160px !important;
          height: 160px !important;
          margin-top: 20px;
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>

      <div
        className="bg-surface-light font-display flex flex-col items-center relative text-slate-800"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflow: "hidden",
          minHeight: "100dvh",
        }}
      >
        {/* Background effects */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-primary/5 to-transparent"></div>
        </div>

        <main className="w-full max-w-md mx-auto h-[100dvh] flex flex-col relative z-10 px-8 py-10 justify-between overflow-hidden">
          <div className="flex flex-col items-center text-center justify-center flex-1 space-y-6">
            <div className="animate-reveal" style={{ animationDelay: "0.1s" }}>
              <p className="text-[14px] text-text-gray font-medium tracking-wide">
                Let’s not overcomplicate this...
              </p>
            </div>

            <div
              className="max-w-[320px] mx-auto animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              <h1 className="text-[30px] md:text-[42px] font-bold text-text-dark leading-[1.15]">
                Will you be my Valentine?
              </h1>
            </div>

            <div
              className="py-4 animate-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="material-icons-round text-6xl text-primary drop-shadow-sm animate-bounce">
                favorite
              </span>
            </div>

            <div className="animate-reveal" style={{ animationDelay: "0.4s" }}>
              <div className="relative inline-block">
                <div className="absolute inset-0 z-30 cursor-default"></div>
                {/* Tenor GIF */}
                <div 
                   className="tenor-gif-embed" 
                   data-postid="2132781642126111018" 
                   data-share-method="host" 
                   data-aspect-ratio="1" 
                   data-width="100%"
                >
                  <a href="https://tenor.com/view/bubu-dudu-gif-2132781642126111018">Bubu Dudu Sticker</a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="w-full flex flex-col items-center space-y-4 pb-4 animate-reveal"
            style={{ animationDelay: "0.5s" }}
          >
            <button 
              onClick={handleYesClick}
              className="w-full max-w-[280px] bg-primary hover:bg-primary/90 text-white font-semibold text-[17px] py-4 rounded-[12px] shadow-glow transition-transform active:scale-95 duration-200"
            >
              Yes, I will
            </button>
            <button 
              onClick={handleConvinceClick}
              className="w-full max-w-[280px] bg-white border border-primary text-primary hover:bg-primary/5 font-semibold text-[17px] py-4 rounded-[12px] transition-colors duration-200"
            >
              Nahhh... Convince me first
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuestionScreen;