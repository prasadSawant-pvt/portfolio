// This file wraps the entire Next.js app, enabling animated page transitions and global styles.
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

/**
 * The App component enables animated route transitions using Framer Motion.
 * AnimatePresence ensures exit/enter animations run when changing pages.
 * motion.div provides the fade/slide effect between routes.
 * Animation duration is tuned for snappiness.
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 16 }} // Start slightly lower for a subtle effect
        animate={{ opacity: 1, y: 0 }} // Fade in and slide up
        exit={{ opacity: 0, y: -16 }}  // Fade out and slide up
        transition={{ duration: 0.18, ease: 'easeInOut' }} // Faster, smoother
      >
        {/* Render the current page */}
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
