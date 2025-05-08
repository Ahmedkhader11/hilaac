"use client"; // Add this at the top

import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((err) => console.error(err));
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container mx-auto relative bg-no-repeat bg-cover bg-center py-24 md:py-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/videos/video1.mp4"
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
