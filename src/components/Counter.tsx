import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const Counter = ({
  end,
  duration = 2,
  label,
  suffix = '',
  prefix = '',
  className = '',
}: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      setCount(Math.floor(end * progress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-gray-300 font-medium text-lg">{label}</p>
    </motion.div>
  );
};
