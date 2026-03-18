import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 bg-slate-800/30 border-b border-blue-500/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text"
        >
          Experience
        </motion.h2>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resumeData.experience.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <motion.div
                className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20 hover:border-blue-400/50 transition-all cursor-pointer shadow-xl hover:shadow-2xl hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10"
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-white">{job.position}</h3>
                      </div>
                      <p className="text-blue-400 font-semibold mb-1">{job.company}</p>
                      <p className="text-sm text-gray-300">{job.duration}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === job.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="text-blue-400" />
                    </motion.div>
                  </div>
                </div>

                {expandedId === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 px-6 py-4 backdrop-blur-md bg-white/5"
                  >
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-blue-400 mb-2">Key Contributions:</h4>
                      <ul className="space-y-1">
                        {job.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start">
                            <span className="text-blue-400 mr-2">▸</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-400 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 backdrop-blur-md bg-blue-500/20 text-blue-200 text-xs rounded-full border border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
