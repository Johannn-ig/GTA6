import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);

  // Match the SVG viewBox to the real viewport so it looks correct on any screen size
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const viFontSize = Math.round(Math.min(vw * 0.55, 280));
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    const isMobile = window.innerWidth < 768;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: isMobile ? 0.8 : 1.4,
      x: "-50%",
      bottom: isMobile ? "-5%" : "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    // Only add mousemove parallax on non-touch devices
    if (!("ontouchstart" in window)) {
      main?.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".main .text", {
          x: `${xMove * 0.4}%`,
        });
        gsap.to(".sky", {
          x: xMove,
        });
        gsap.to(".bg", {
          x: xMove * 1.7,
        });
      });
    }
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize={viFontSize}
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-5 px-4 md:py-10 md:px-10">
              <div className="logo flex gap-4 md:gap-7 items-center">
                <div className="lines flex flex-col gap-[4px] md:gap-[5px]">
                  <div className="line w-8 md:w-15 h-1.5 md:h-2 bg-white"></div>
                  <div className="line w-5 md:w-8 h-1.5 md:h-2 bg-white"></div>
                  <div className="line w-3 md:w-5 h-1.5 md:h-2 bg-white"></div>
                </div>
                <h3 className="text-2xl md:text-4xl -mt-[6px] md:-mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Images & Hero Text */}
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />

              {/* Hero Text */}
              <div className="text text-white flex flex-col gap-1 md:gap-3 absolute top-16 md:top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[7rem] lg:text-[12rem] leading-none -ml-10 sm:-ml-16 md:-ml-28 lg:-ml-40">
                  grand
                </h1>
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[7rem] lg:text-[12rem] leading-none ml-6 sm:ml-10 md:ml-14 lg:ml-20">
                  theft
                </h1>
                <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[7rem] lg:text-[12rem] leading-none -ml-10 sm:-ml-16 md:-ml-28 lg:-ml-40">
                  auto
                </h1>
              </div>

              {/* Character */}
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-6 md:py-15 px-4 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-3 md:gap-4 items-center">
                <i className="text-2xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-base md:text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[35px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="w-full min-h-screen flex items-center justify-center bg-black py-16 md:py-0">
            <div className="cntnr flex flex-col md:flex-row text-white w-full min-h-[80%] gap-8 md:gap-0">
              {/* Left Image */}
              <div className="limg relative w-full md:w-1/2 h-64 sm:h-80 md:h-auto flex-shrink-0">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] md:max-w-none"
                  src="./imag.png"
                  alt=""
                />
              </div>

              {/* Right Content */}
              <div className="rg w-full md:w-[40%] py-6 px-5 md:py-20 md:px-0">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight">Still Running,</h1>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight">Not Hunting</h1>
                <p className="mt-6 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Welcome back to Vice City — sun-soaked, corrupt, and more
                  dangerous than ever. Grand Theft Auto VI drops you into a
                  sprawling open world inspired by Miami and the Florida Keys,
                  where every block has a story and every deal has a price.
                </p>
                <p className="mt-3 text-base md:text-xl font-[Helvetica_Now_Display]">
                  Play as Lucia, a sharp and fearless woman navigating the
                  criminal underworld alongside her unpredictable partner Jason.
                  Together they hustle through heists, high-speed chases, and
                  uneasy alliances — surviving a city that chews up the weak
                  and spits them out before sunset.
                </p>
                <p className="mt-6 md:mt-10 text-base md:text-xl font-[Helvetica_Now_Display]">
                  With the most advanced open world Rockstar has ever built,
                  GTA VI features a living, breathing Vice City that evolves
                  around you — dynamic weather, a reactive economy, and a cast
                  of unforgettable characters. The next chapter starts now.
                </p>
                <button className="bg-yellow-500 px-6 py-4 md:px-10 md:py-10 text-black mt-8 md:mt-10 text-xl md:text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
