import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  duration: number;
  delay: number;
  xStart: number;
  yStart: number;
  colorClass: string;
}

const colors = [
  { name: 'cyan', gradient: 'from-cyan-400 to-cyan-300', glow: 'rgba(34, 211, 238, 0.6)' },
  { name: 'purple', gradient: 'from-purple-400 to-purple-300', glow: 'rgba(192, 132, 250, 0.6)' },
  { name: 'pink', gradient: 'from-pink-400 to-pink-300', glow: 'rgba(244, 114, 182, 0.6)' },
  { name: 'blue', gradient: 'from-blue-400 to-blue-300', glow: 'rgba(59, 130, 246, 0.6)' },
  { name: 'emerald', gradient: 'from-emerald-400 to-emerald-300', glow: 'rgba(52, 211, 153, 0.6)' },
];

export const AnimatedBackground = () => {
  // Generate random particles
  const particles: Particle[] = Array.from({ length: 28 }, (_, i) => {
    const color = colors[i % colors.length];
    return {
      id: i,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 8,
      xStart: Math.random() * 100,
      yStart: Math.random() * 100,
      colorClass: color.name,
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.12),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.14),_transparent_40%),linear-gradient(180deg,#050816_0%,#070b1a_100%)]" />
      
      {/* Animated particles */}
      {particles.map((particle) => {
        const color = colors.find(c => c.name === particle.colorClass);
        return (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${color?.gradient} shadow-lg`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.xStart}%`,
              top: `${particle.yStart}%`,
              boxShadow: `0 0 20px ${color?.glow}`,
            }}
            animate={{
              y: [0, -150, -300],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.1, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Larger floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 blur-3xl"
        style={{ left: '10%', top: '20%' }}
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 blur-3xl"
        style={{ right: '10%', bottom: '10%' }}
        animate={{
          x: [0, -80, 0],
          y: [0, -50, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional accent orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 blur-3xl"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -80, 80, 0],
          opacity: [0.05, 0.15, 0.05, 0.1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
