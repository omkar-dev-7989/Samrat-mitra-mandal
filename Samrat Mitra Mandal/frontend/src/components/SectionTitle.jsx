import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, children, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-8 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[0.26em] text-temple dark:text-gold">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-stone-700 dark:text-cream/76">{children}</p>}
    </motion.div>
  );
}
