"use client";

import React from "react";

interface AddRemoveButtonProps {
  type: "add" | "remove";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
  type,
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  const isAdd = type === "add";
  const baseClass = isAdd ? "flight-segment__add-btn" : "flight-segment__remove-btn";
  const disabledClass = disabled ? `${baseClass}--disabled` : "";
  
  const defaultChildren = isAdd ? (
    <>
      <svg viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
      </svg>
      Tambah Rute
    </>
  ) : (
    <svg viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );

  return (
    <button
      aria-label={isAdd ? "Add segment" : "Remove segment"}
      className={`${baseClass} ${disabledClass} ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children || defaultChildren}
    </button>
  );
}; 