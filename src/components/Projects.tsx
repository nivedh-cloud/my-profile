import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { ExternalLink, X } from 'lucide-react';
import { useState } from 'react';
import appScreenshot from '../../public/app-sc.png?url';

export const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Organize projects by category and company
  const groupedProjects = resumeData.projectsByCompany.reduce((acc, companyGroup) => {
    companyGroup.projects.forEach(project => {
      const category = (project as any).category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
    });
    return acc;
  }, {} as Record<string, any[]>);

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

        {/* Professional Projects Section */}
        {groupedProjects['Professional'] && (
          <motion.div
            className="mb-16"
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
              {groupedProjects['Professional'].map((project: any) => (
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

        {/* Personal Projects Section */}
        {groupedProjects['Personal'] && (
          <motion.div
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
              {groupedProjects['Personal'].map((project: any) => (
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
          {project.url && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
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
        
        <div className="rounded-lg overflow-hidden bg-slate-800">
          <img
            src={appScreenshot}
            alt={`${project.name} screenshot`}
            className="w-full h-auto"
          />
        </div>

        <div className="mt-4">
          <p className="text-gray-300">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
