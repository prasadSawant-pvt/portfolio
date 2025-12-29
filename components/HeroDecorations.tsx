import React from 'react';

export default function HeroDecorations() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-white/0 to-accent2/6 dark:from-accent/6 dark:via-transparent dark:to-accent2/12" />
      {/* Decorative blobs */}
      <div className="absolute -left-20 -top-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-blob-slow dark:bg-accent/10" />
      <div className="absolute -right-28 -bottom-24 w-96 h-96 bg-accent2/12 rounded-full blur-3xl animate-blob-slower dark:bg-accent2/8" />
    </div>
  );
}
