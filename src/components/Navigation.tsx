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
    try {
      // Get the base path from the current location
      const basePath = window.location.pathname.split('/jeevan-resume')[0] + '/jeevan-resume';
      const fileUrl = basePath + '/Jeevan_Prabhath_Resume.pdf';

      // Try to use File System Access API for folder selection (modern browsers)
      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: 'Jeevan_Prabhath_Resume.pdf',
            types: [{ description: 'PDF Files', accept: { 'application/pdf': ['.pdf'] } }],
          });

          const response = await fetch(fileUrl);
          if (!response.ok) throw new Error('Failed to fetch file');
          
          const blob = await response.blob();
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (error: any) {
          // If user cancels file picker or an error occurs, use fallback
          if (error.name === 'AbortError') {
            return; // User cancelled
          }
          throw error;
        }
      } else {
        // Fallback: simple download to browser's default downloads folder
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Jeevan_Prabhath_Resume.pdf';
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-slate-900/70 backdrop-blur-xl border-b border-white/10 z-50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          JP
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
              onClick={(e) => {
                if (item.href.startsWith('#') && item.href !== '#') {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
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
            transition={{ delay: 0.1 + navItems.length * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all font-medium border border-blue-400/50 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download Resume
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-xl bg-white/10 border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                onClick={(e) => {
                  if (item.href.startsWith('#') && item.href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(item.href);
                    target?.scrollIntoView({ behavior: 'smooth' });
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2 backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all font-medium mt-4 border border-blue-400/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
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
