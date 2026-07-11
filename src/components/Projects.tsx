import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { ExternalLink, X } from 'lucide-react';

const PlayStoreIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 280"
    aria-label="Google Play Store"
  >
    <defs>
      <linearGradient id="ps-a" x1="91.49%" x2="-38.351%" y1="4.948%" y2="71.907%">
        <stop offset="0%" stopColor="#00A0FF" />
        <stop offset="1%" stopColor="#00A1FF" />
        <stop offset="26%" stopColor="#00BEFF" />
        <stop offset="51%" stopColor="#00D2FF" />
        <stop offset="76%" stopColor="#00DFFF" />
        <stop offset="100%" stopColor="#00E3FF" />
      </linearGradient>
      <linearGradient id="ps-b" x1="107.685%" x2="-130.64%" y1="49.997%" y2="49.997%">
        <stop offset="0%" stopColor="#FFE000" />
        <stop offset="41%" stopColor="#FFBD00" />
        <stop offset="78%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FF9C00" />
      </linearGradient>
      <linearGradient id="ps-c" x1="86.219%" x2="-50.15%" y1="17.877%" y2="194.703%">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="ps-d" x1="-18.754%" x2="42.121%" y1="-54.052%" y2="24.917%">
        <stop offset="0%" stopColor="#32A071" />
        <stop offset="7%" stopColor="#2DA771" />
        <stop offset="48%" stopColor="#15CF74" />
        <stop offset="80%" stopColor="#06E775" />
        <stop offset="100%" stopColor="#00F076" />
      </linearGradient>
    </defs>
    <g fill="none">
      <path
        fill="url(#ps-a)"
        d="M.535 1.97C.017 2.52-.288 3.37-.288 4.48v270.034c0 1.11.305 1.96.823 2.51l.873.873L153.522 140.65v-1.74L1.408 1.097.535 1.97z"
      />
      <path
        fill="url(#ps-b)"
        d="M204.193 192.124L153.523 141.4v-1.74l50.673-50.673 1.144.65 60.014 34.092c17.15 9.74 17.15 25.685 0 35.425l-60.014 34.092-1.147.65z"
      />
      <path
        fill="url(#ps-c)"
        d="M205.337 191.474l-51.814-51.81L.535 277.927c5.65 5.984 14.984 6.72 25.493.748l179.31-101.913"
      />
      <path
        fill="url(#ps-d)"
        d="M205.337 88.182L26.025.535C15.516-5.434 6.184-4.7.534 1.282l153 152.95 51.804-66.05z"
      />
    </g>
  </svg>
);
import { useState } from 'react';
import appScreenshot from '../../public/app-sc.png?url';

export const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Keep UI order fixed: Professional first, then Personal
  const { professionalProjects, personalProjects } = resumeData.projectsByCompany.reduce(
    (acc, companyGroup) => {
      companyGroup.projects.forEach((project: any) => {
        const category = project.category || 'Other';
        if (category === 'Professional') {
          acc.professionalProjects.push(project);
        } else if (category === 'Personal') {
          acc.personalProjects.push(project);
        }
      });
      return acc;
    },
    { professionalProjects: [] as any[], personalProjects: [] as any[] }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 bg-slate-800/30 border-b border-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text"
        >
          Notable Projects
        </motion.h2>

        {/* Personal Projects Section */}
        {personalProjects.length > 0 && (
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-8 text-purple-400"
            >
              Personal Projects
            </motion.h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {personalProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  setSelectedProject={setSelectedProject}
                  itemVariants={itemVariants}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Professional Projects Section */}
        {professionalProjects.length > 0 && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-8 text-blue-400"
            >
              Professional Projects
            </motion.h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {professionalProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  setSelectedProject={setSelectedProject}
                  itemVariants={itemVariants}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Modal for displaying project images */}
      {selectedProject && (
        <ImageModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

// Separate component for project card
const ProjectCard = ({ project, hoveredId, setHoveredId, setSelectedProject, itemVariants }: any) => {
  const isFriendLocator = project.name === 'FriendLocator';
  
  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="group"
    >
      <motion.div
        className={`backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20 h-full flex flex-col hover:border-blue-400/50 hover:shadow-2xl transition-all shadow-xl ${isFriendLocator ? 'cursor-pointer' : ''}`}
        whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
        transition={{ duration: 0.3 }}
        onClick={() => isFriendLocator && setSelectedProject(project)}
      >
      {/* Project Header */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
            {project.subtitle && (
              <p className="text-gray-400 text-sm mb-2 font-light italic">{project.subtitle}</p>
            )}
            <p className="text-blue-400 text-sm font-semibold">{project.company}</p>
          </div>
          <div className="flex items-center gap-2">
            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-blue-400 hover:text-blue-300"
                title="View live web app"
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
            {project.playStoreUrl && (
              <motion.a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="inline-flex items-center"
                title="View on Google Play Store"
              >
                <PlayStoreIcon size={22} />
              </motion.a>
            )}
          </div>
          {isFriendLocator && (
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-purple-400 hover:text-purple-300 cursor-pointer"
              title="Click to view project screenshot"
            >
              <ExternalLink size={20} />
            </motion.div>
          )}
        </div>

        {/* <p className="text-xs text-gray-400 mb-3">{project.duration}</p> */}
        <p className="text-gray-300 text-sm mb-4 flex-1">{project.description}</p>

        {/* Highlights */}
        {project.highlights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: hoveredId === project.id ? 1 : 0,
              height: hoveredId === project.id ? 'auto' : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <ul className="space-y-1 pb-3 border-b border-slate-600">
              {project.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-2">▸</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="px-2.5 py-1 backdrop-blur-md bg-blue-500/20 text-blue-200 text-xs rounded-full border border-blue-400/40 hover:bg-blue-500/30 hover:border-blue-400/60 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
    </motion.div>
  );
};

// Modal component for displaying project images
const ImageModal = ({ project, onClose }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full max-h-90vh overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">{project.name}</h2>
        
        <div className="rounded-lg overflow-hidden bg-slate-800 px-2 py-2 sm:px-4 sm:py-3">
          <img
            src={appScreenshot}
            alt={`${project.name} screenshot`}
            className="w-full h-auto rounded-md"
          />
        </div>

        <div className="mt-4">
          <p className="text-gray-300">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
