import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import confetti from "canvas-confetti";

const ValentineMessage = () => {
  useEffect(() => {
    /* -----------------------------
        Load & Reset Tenor Script
    ------------------------------ */
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

    /* -----------------------------
        Confetti Celebration
    ------------------------------ */
    const duration = 3000;
    const end = Date.now() + duration;
    let animationFrameId;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e94e77", "#ff8fa3", "#ffffff"],
    });

    const frame = () => {
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 45,
        origin: { x: 0 },
        colors: ["#e94e77"],
      });
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 45,
        origin: { x: 1 },
        colors: ["#e94e77"],
      });

      if (Date.now() < end) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      const scriptToClean = document.getElementById(scriptId);
      if (scriptToClean) scriptToClean.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <style>
          {`
            body {
              -webkit-font-smoothing: antialiased;
              overflow: hidden;
              height: 100dvh;
              background-color: #f8f6f6;
            }

            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-reveal {
              opacity: 0;
              animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            .glass-overlay {
              position: absolute;
              inset: 0;
              z-index: 50;
              cursor: default;
            }

            .tenor-gif-embed {
              width: 175px !important;
              height: 175px !important;
              border-radius: 20px;
              overflow: hidden;
            }
          `}
        </style>
      </Helmet>
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
      <div
        className="font-display flex flex-col items-center justify-center relative px-8 bg-white"
        style={{ minHeight: "100dvh", overflow: "hidden" }}
      >
        {/* Background Decorative Blurs */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 w-full max-w-sm flex flex-col items-center text-center space-y-8">
          <div className="space-y-3">
            <h1 
              className="text-4xl font-bold text-text-dark leading-tight animate-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              Yayy!... <br /> I love you so much.
            </h1>
            <p 
              className="text-xl font-medium text-primary animate-reveal"
              style={{ animationDelay: "0.4s" }}
            >
              Happy Valentine's Day!
            </p>
          </div>

          {/* Tenor GIF Container */}
          <div className="relative animate-reveal" style={{ animationDelay: "0.6s" }}>
            <div className="glass-overlay"></div>
            <div
              className="tenor-gif-embed"
              data-postid="11000884495126033687"
              data-share-method="host"
              data-aspect-ratio="1.05769"
              data-width="100%"
            >
              <a href="https://tenor.com/view/cute-bears-gif-11000884495126033687">
                Cute Bears Sticker
              </a>
            </div>
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

export default ValentineMessage;