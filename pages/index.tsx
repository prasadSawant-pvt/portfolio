// Home page: friendly landing section introducing Prasad Sawant
// Layout and content are mobile-first and fully responsive
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import PacmanChaseBackground from '../components/ui/pacman-chase-background';

function MailRevealButton() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const email = "prasadsawant.pvt@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  // When mouse/focus enters either icon or reveal, show and clear timer
  const handleShow = () => {
    setShow(true);
    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }
  };
  // When mouse/focus leaves both, start timer to hide
  const handleHide = () => {
    if (hideTimer) clearTimeout(hideTimer);
    setHideTimer(setTimeout(() => setShow(false), 2000));
  };

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      tabIndex={-1}
    >
      <button
        aria-label="Show email address"
        className="text-accent dark:text-accent2 text-2xl hover:text-accent2 dark:hover:text-accent p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent transition"
        type="button"
        tabIndex={0}
      >
        <FaEnvelope />
      </button>
      {show && (
        <div
          className="flex items-center bg-white dark:bg-gray-900 border border-accent2 dark:border-accent rounded-xl shadow px-4 py-2 gap-2 animate-fade-in"
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          onFocus={handleShow}
          onBlur={handleHide}
          tabIndex={-1}
        >
          <a
            href={`mailto:${email}`}
            className="text-accent dark:text-accent2 font-semibold text-base sm:text-lg whitespace-nowrap hover:underline"
          >
            {email}
          </a>
          <button
            onClick={handleCopy}
            className="ml-2 px-2 py-1 rounded bg-accent2 text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent2 transition flex items-center gap-1"
            aria-label="Copy email address"
            type="button"
          >
            {copied ? (
              <span className="text-xs">Copied!</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6" /></svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}



/**
 * Home() is the landing page of the portfolio.
 * - Shows profile photo, name, and summary.
 * - All layout uses flexbox and responsive Tailwind classes for mobile friendliness.
 * - Animations are handled by Framer Motion for a modern feel.
 */
export default function Home() {
  return (
    <Layout title="Home">
      {/* Pacman background will be injected into the main layout container for correct stacking */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white dark:bg-gray-900 px-2 sm:px-0 transition-colors duration-300">
        {/* Profile photo with border and round shape */}
        <motion.div
          className="mb-6 w-40 h-40 rounded-full overflow-hidden border-4 border-accent mx-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/photo.jpg"
            alt="Prasad Sawant profile photo"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </motion.div>
        {/* Name/title, responsive text */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-accent dark:text-accent2 mb-2 font-[cursive]" // fallback cursive
          style={{ fontFamily: `'Dancing Script', 'Pacifico', cursive` }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Prasad Sawant
        </motion.h1>
        {/* Resume Download Button */}
        
        {/* Subtitle/role, responsive */}
        <motion.h2
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Backend Software Engineer at PayPal
        </motion.h2>
        {/* Short professional summary */}
        <motion.p
          className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Experienced Backend Software Engineer skilled in Java, Spring Boot, microservices, Docker, CI/CD, and cloud-native tech. Passionate about building scalable systems and delivering business value.
        </motion.p>
        {/* Contact info: email only, for privacy */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <MailRevealButton />
        </motion.div>
        {/* Social links: LinkedIn and GitHub, large and easy to tap */}
        <motion.div
          className="flex gap-4 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a href="https://www.linkedin.com/in/prasadsawant518" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-accent dark:text-accent2 text-2xl hover:text-accent2 dark:hover:text-accent">
            <FaLinkedin />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/prasadSawant-pvt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-accent dark:text-accent2 text-2xl hover:text-accent2 dark:hover:text-accent">
            <FaGithub />
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}
