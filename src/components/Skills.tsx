import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

export const Skills = () => {
  const skillCategories = Object.entries(resumeData.skills).map(([category, skills]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    skills: skills as string[]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 bg-slate-900/20 border-b border-purple-500/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all shadow-xl hover:shadow-2xl hover:bg-white/15"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 backdrop-blur-md bg-white/10 text-sm rounded-full text-gray-200 hover:bg-white/20 cursor-default transition-colors border border-white/20 hover:border-blue-400/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
