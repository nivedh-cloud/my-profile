import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleDownloadResume = async () => {
    const baseUrl = String(import.meta.env.BASE_URL || '/');
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const fileUrl = `${window.location.origin}${normalizedBaseUrl}Jeevan_Prabhath_Senior_React_Dev.pdf`;

    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Jeevan_Prabhath_Senior_React_Dev.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Download failed:', error, { fileUrl });
      alert(`Failed to download resume. ${error?.message || 'Please try again.'}`);
    }
  };

  const scrollTo = (href: string) => {
    if (href.startsWith('#') && href !== '#') {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400"
        >
          JP
        </motion.div>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium"
              onClick={(e) => {
                if (item.href.startsWith('#') && item.href !== '#') {
                  e.preventDefault();
                  scrollTo(item.href);
                }
              }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            onClick={handleDownloadResume}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + navItems.length * 0.08 }}
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-600 border border-indigo-300/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={16} />
            Resume
          </motion.button>
        </div>

        <motion.button
          className="md:hidden text-slate-200"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-white/10 bg-[#050816]/90 backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                onClick={(e) => {
                  if (item.href.startsWith('#') && item.href !== '#') {
                    e.preventDefault();
                    scrollTo(item.href);
                    setIsOpen(false);
                  }
                }}
                whileHover={{ x: 4 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-violet-600"
              whileTap={{ scale: 0.97 }}
            >
              <Download size={18} />
              Download Resume
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
