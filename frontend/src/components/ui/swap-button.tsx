"use client";

import React from "react";

interface SwapButtonProps {
  onClick: () => void;
  rotation: "clockwise" | "counterclockwise";
  className?: string;
  ariaLabel?: string;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  onClick,
  rotation,
  className = "",
  ariaLabel = "Swap",
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`flight-swap-btn flight-swap-btn--${rotation} ${className}`}
      type="button"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24">
        <path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path>
      </svg>
    </button>
  );
}; 