"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type IntroSplashProps = {
  children: React.ReactNode;
};

const EXIT_DURATION_MS = 1400;
const FALLBACK_DURATION_MS = 12000;

export default function IntroSplash({ children }: IntroSplashProps) {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">("playing");
  const hasStartedExit = useRef(false);

  const beginExit = useCallback(() => {
    if (hasStartedExit.current) {
      return;
    }

    hasStartedExit.current = true;
    setPhase("exiting");

    window.setTimeout(() => {
      setPhase("done");
    }, EXIT_DURATION_MS);
  }, []);

  useEffect(() => {
    if (phase === "done") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      beginExit();
    }, FALLBACK_DURATION_MS);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [beginExit]);

  return (
    <div className="intro-experience">
      <div
        className={`intro-home ${phase !== "playing" ? "intro-home--visible" : ""}`}
      >
        {children}
      </div>

      {phase !== "done" && (
        <div
          className={`intro-splash ${phase === "exiting" ? "intro-splash--exit" : ""}`}
        >
          <video
            className="intro-splash__video"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={beginExit}
            onError={beginExit}
          >
            <source src="/Intro.mp4" type="video/mp4" />
          </video>

          <div className="intro-splash__veil" />
          <div className="intro-splash__flash" />
        </div>
      )}
    </div>
  );
}