import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const Contact = () => {
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
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          I'm always interested in learning about new projects and opportunities. Whether you have a project in mind or just want to reach out, feel free to contact me.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                variants={itemVariants}
                href={social.href}
                className="flex items-center gap-3 px-6 py-3 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 text-gray-300 hover:text-white transition-all hover:bg-white/20 hover:border-blue-400/50 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                target={social.href.startsWith('mailto') || social.href.startsWith('tel') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') || social.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
              >
                <Icon size={20} />
                <span>{social.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8"
        >
          <p className="text-white text-sm mb-4">
            📧 Email me directly at <span className="font-bold">{resumeData.email}</span>
          </p>
          <p className="text-white text-sm">
            📞 Call me at <span className="font-bold">{resumeData.phone}</span>
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-sm mt-12"
        >
          © 2026 P Jeevan Prabhath. All rights reserved.
        </motion.p>
      </motion.div>
    </section>
  );
};
