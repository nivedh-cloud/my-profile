import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypingText = ({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else if (displayedText.length === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span
          className="inline-block w-0.5 h-em ml-0.5 bg-current animate-pulse"
          style={{ 
            display: 'inline-block',
            marginLeft: '3px',
            opacity: 0.8
          }}
        >
          &nbsp;
        </span>
      )}
    </span>
  );
};
