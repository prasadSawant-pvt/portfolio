// Home page: friendly landing section introducing Prasad Sawant
// Layout and content are mobile-first and fully responsive
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '../components/ToastProvider';

// Lazy load HeroDecorations to reduce initial bundle size
const HeroDecorations = dynamic(() => import('../components/HeroDecorations'), {
  loading: () => null,
  ssr: false
});

function MailRevealButton({ onToast }: { onToast?: (msg: string, type?: 'info'|'success'|'error') => void }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const email = "prasadsawant.pvt@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      onToast && onToast('Copied email to clipboard', 'success');
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
      onToast && onToast('Failed to copy', 'error');
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
      className="relative inline-flex items-center"
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      tabIndex={-1}
    >
      <button
        aria-label="Show email address"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-accent bg-white text-accent dark:bg-gray-900 dark:text-accent2 dark:border-accent2 pill-btn focus:outline-none focus:ring-2 focus:ring-accent transition hover:bg-accent/10 dark:hover:bg-accent2/10"
        type="button"
        tabIndex={0}
      >
        <span className="flex items-center gap-2">
          <FaEnvelope />
          <span className="hidden sm:inline">Email</span>
        </span>
      </button>
      {show && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20"
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          onFocus={handleShow}
          onBlur={handleHide}
          tabIndex={-1}
        >
          <div className="flex items-center bg-white dark:bg-gray-900 border border-accent2 dark:border-accent rounded-xl shadow px-4 py-2 gap-2 animate-fade-in">
            <a
              href={`mailto:${email}`}
              className="text-accent dark:text-accent2 font-semibold text-sm sm:text-base whitespace-nowrap hover:underline"
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
  const { showToast } = useToast();

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const pdfUrl = encodeURIComponent(window.location.origin + '/Resume.pdf');
    const viewerUrl = `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true`;
    showToast('Choose an option:', 'info', [
      {
        label: 'View',
        onClick: () => window.open(viewerUrl, '_blank')
      },
      {
        label: 'Download',
        onClick: () => {
          const link = document.createElement('a');
          link.href = '/Resume.pdf';
          link.download = 'PrasadSawant_Resume.pdf';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    ]);
  };

  return (
    <Layout title="Home">
      {/* Decorations and Pacman background (Pacman respects reduced-motion and small screens) */}
      <HeroDecorations />
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white dark:bg-gray-900 px-4 sm:px-0 transition-colors duration-300">
        {/* Glass card to focus hero */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 max-w-3xl w-full text-center shadow-lg relative z-10">
          {/* Profile photo with ring and floating */}
          <motion.div
            className="mb-6 w-40 h-40 rounded-full overflow-hidden profile-ring mx-auto bg-gray-200 dark:bg-gray-800 flex items-center justify-center animate-float-slow"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Image
              src="/photo.jpg"
              alt="Prasad Sawant profile photo"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
              sizes="(max-width: 640px) 160px, 160px"
            />
          </motion.div>

          {/* Name/title, responsive text */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-accent dark:text-accent2 mb-2 font-[cursive]"
            style={{ fontFamily: `'Dancing Script', 'Pacifico', cursive` }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Prasad Sawant
          </motion.h1>

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
            className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6 mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Experienced Backend Software Engineer skilled in Java, Spring Boot, microservices, Docker, CI/CD, and cloud-native tech. Passionate about building scalable systems and delivering business value.
          </motion.p>

          {/* CTA Row (Email + Resume + Social) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <div className="flex gap-3 items-center">
              <MailRevealButton onToast={showToast} />
              <button
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-accent bg-accent text-white pill-btn shadow-sm hover:bg-accent2 hover:border-accent2 focus:outline-none focus:ring-2 focus:ring-accent transition"
                aria-label="Download Resume PDF"
                type="button"
              >
                Resume
              </button>
            </div>

            <div className="flex gap-3 mt-2 sm:mt-0">
              <a
                href="https://www.linkedin.com/in/prasadsawant518"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent bg-white text-accent dark:bg-gray-900 dark:text-accent2 dark:border-accent2 pill-btn focus:outline-none focus:ring-2 focus:ring-accent transition hover:bg-accent/10 dark:hover:bg-accent2/10"
              >
                <FaLinkedin />
                <span className="hidden sm:inline font-semibold">LinkedIn</span>
              </a>
              <a
                href="https://github.com/prasadSawant-pvt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent bg-white text-accent dark:bg-gray-900 dark:text-accent2 dark:border-accent2 pill-btn focus:outline-none focus:ring-2 focus:ring-accent transition hover:bg-accent/10 dark:hover:bg-accent2/10"
              >
                <FaGithub />
                <span className="hidden sm:inline font-semibold">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
