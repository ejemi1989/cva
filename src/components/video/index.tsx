"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented, do nothing
      });
    }
  }, []);

  const togglePlay = () => {
    const video = document.querySelector('video');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our World</h1>
        <p className="text-xl mb-8">Discover the beauty of nature</p>
        <Button onClick={togglePlay} variant="outline" size="lg">
          {isPlaying ? 'Pause Video' : 'Play Video'}
        </Button>
      </div>
    </div>
  );
}