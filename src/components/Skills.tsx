import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { SectionHeading } from './SectionHeading';

export const Skills = () => {
  const categoryNames: Record<string, string> = {
    backend: 'Backend & Cloud',
  };

  const formatCategory = (key: string) => {
    const withSpaces = key.replace(/([A-Z])/g, ' $1');
    return withSpaces
      .split(' ')
      .filter(Boolean)
      .map((word) =>
        word.toLowerCase() === 'ai' ? 'AI' : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

  const skillCategories = Object.entries(resumeData.skills).map(([category, skills]) => ({
    category: categoryNames[category] ?? formatCategory(category),
    skills: skills as string[],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Toolkit" title="Skills & Expertise" />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <h3 className="font-display text-lg font-semibold text-white mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full text-slate-200 bg-white/10 border border-white/15 hover:border-cyan-300/40 hover:bg-white/15 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
