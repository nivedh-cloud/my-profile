import React from 'react';

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const AnimatedBorder = ({ 
  children, 
  className = '',
  speed = 3
}: AnimatedBorderProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(59, 130, 246, 0.5),
            rgba(147, 51, 234, 0.5),
            rgba(59, 130, 246, 0.5)
          )`,
          animation: `spin ${speed}s linear infinite`,
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-slate-900/95 backdrop-blur-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 rounded-2xl">
        {children}
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
