import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface SkillBadgeProps {
  skill: string;
  level: number; // 1-5, can be 4.5
  showRating?: boolean; // global flag to show/hide ratings
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, level, showRating = false }) => {
  const [hovered, setHovered] = useState(false);

  // Determine how many full, half, and empty stars
  const fullStars = Math.floor(level);
  const hasHalf = level % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span
      className="relative group bg-accent text-white rounded-full px-4 py-2 text-sm sm:text-base font-medium cursor-pointer transition-shadow hover:shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${skill} skill level: ${level} stars`}
    >
      {skill}
      {showRating && hovered && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex gap-1 px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 shadow-lg border border-gray-200 dark:border-gray-700 z-20 animate-fade-in text-base sm:text-lg min-w-[120px] max-w-xs whitespace-nowrap">
          {Array.from({ length: fullStars }).map((_, i) => (
            <FaStar key={"full" + i} className="text-yellow-400 drop-shadow" aria-label="filled star" />
          ))}
          {hasHalf && <FaStarHalfAlt className="text-yellow-400 drop-shadow" aria-label="half star" />}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <FaRegStar key={"empty" + i} className="text-gray-300 dark:text-gray-600" aria-label="empty star" />
          ))}
        </span>
      )}
    </span>
  );
};
