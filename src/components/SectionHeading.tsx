import { motion } from 'framer-motion';

interface SectionHeadingProps {
  kicker: string;
  title: string;
}

export const SectionHeading = ({ kicker, title }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55 }}
    viewport={{ once: true }}
    className="mb-12 text-center"
  >
    <p className="section-kicker">{kicker}</p>
    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text">
      {title}
    </h2>
    <div className="title-underline" />
  </motion.div>
);
