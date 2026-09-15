import { motion } from 'framer-motion';
import { ChevronDown, Mail, ArrowRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const Hero = () => {
  const heroImage = `${import.meta.env.BASE_URL}jeevan-img.jpeg`;
  const taglineParts = resumeData.tagline.split('|').map((part) => part.trim());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 relative z-20">
      <motion.div
        className="text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative w-44 h-44 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 blur-md opacity-70" />
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-cyan-300 via-indigo-400 to-fuchsia-500">
              <img
                src={heroImage}
                alt="P Jeevan Prabhath"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold mb-5 tracking-tight">
          <span className="gradient-text">P Jeevan Prabhath</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8">
          {taglineParts.map((part) => (
            <span
              key={part}
              className="px-3 py-1 text-xs md:text-sm rounded-full border border-cyan-400/25 bg-white/5 text-cyan-100"
            >
              {part}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-slate-300/90 leading-relaxed text-left md:text-center mb-8 max-w-3xl mx-auto"
        >
          {resumeData.experienceHeadline.prefix}
          <span className="font-semibold text-white">{resumeData.experienceHeadline.highlight}</span>
          {resumeData.experienceHeadline.suffix}
        </motion.p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
          {[
            { label: 'Years building UI', value: '10+' },
            { label: 'AI-native delivery', value: 'Cursor + Copilot' },
            { label: 'Focus', value: 'React, IoT, PWA' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl px-4 py-3">
              <p className="text-sm font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap mb-12">
          <a href={`mailto:${resumeData.email}`} className="btn-primary">
            <Mail size={18} />
            Get In Touch
          </a>
          <a href="#projects" className="btn-secondary">
            View Work
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <ChevronDown size={32} className="text-cyan-300/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
