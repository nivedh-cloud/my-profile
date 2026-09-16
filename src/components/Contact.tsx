import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { SectionHeading } from './SectionHeading';

export const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const socialLinks = [
    { icon: Mail, href: `mailto:${resumeData.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${resumeData.phone}`, label: 'Phone' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jeevan-prabhath/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/nivedh-cloud', label: 'GitHub' },
  ];

  return (
    <section className="py-24 px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionHeading kicker="Say hello" title="Let's Connect" />

        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          I am always interested in learning about new projects and opportunities. Whether you have a project in mind or just want to reach out, feel free to contact me.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                variants={itemVariants}
                href={social.href}
                className="glass-card flex items-center gap-3 px-5 py-3 rounded-2xl text-slate-200 hover:text-white"
                whileHover={{ scale: 1.04, y: -2 }}
                target={social.href.startsWith('mailto') || social.href.startsWith('tel') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') || social.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
              >
                <Icon size={18} />
                <span>{social.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card rounded-2xl p-8 max-w-xl mx-auto"
        >
          <p className="text-slate-200 text-sm mb-3">
            Email me at <span className="font-semibold text-white">{resumeData.email}</span>
          </p>
          <p className="text-slate-200 text-sm">
            Call me at <span className="font-semibold text-white">{resumeData.phone}</span>
          </p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-slate-500 text-sm mt-12">
          © 2026 P Jeevan Prabhath. All rights reserved.
        </motion.p>
      </motion.div>
    </section>
  );
};
