import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <section id="experience" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading kicker="Career path" title="Experience" />

        <motion.div
          className="relative space-y-4 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-cyan-400/50 before:via-violet-400/30 before:to-transparent md:before:left-[13px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resumeData.experience.map((job) => {
            const isOpen = expandedId === job.id;
            return (
              <motion.div key={job.id} variants={itemVariants} className="relative pl-8 md:pl-10">
                <div className="absolute left-0 top-6 h-6 w-6 rounded-full border border-cyan-300/40 bg-[#050816] flex items-center justify-center">
                  <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-cyan-300' : 'bg-slate-500'}`} />
                </div>
                <motion.div
                  className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-all ${isOpen ? 'ring-1 ring-cyan-400/30' : ''}`}
                  onClick={() => setExpandedId(isOpen ? null : job.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg md:text-xl font-bold text-white leading-snug">
                          {job.position}
                        </h3>
                        {job.company && (
                          <p className="text-cyan-300 font-medium mt-1">{job.company}</p>
                        )}
                        <p className="text-sm text-slate-400 mt-1">{job.duration}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-1 shrink-0"
                      >
                        <ChevronRight className="text-cyan-300" />
                      </motion.div>
                    </div>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.28 }}
                      className="border-t border-white/10 px-6 py-5 bg-white/[0.03]"
                    >
                      <p className="text-slate-300 mb-4 leading-relaxed">{job.description}</p>
                      <div className="mb-5">
                        <h4 className="text-xs tracking-wider uppercase text-cyan-300/90 mb-3">
                          Key Contributions
                        </h4>
                        <ul className="space-y-2">
                          {job.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-slate-300 flex items-start leading-relaxed">
                              <span className="text-cyan-300 mr-2 mt-0.5">▸</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs tracking-wider uppercase text-cyan-300/90 mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
