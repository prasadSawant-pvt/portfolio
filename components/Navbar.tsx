// Navbar component: provides the main site navigation and branding.
// Designed to be mobile-friendly, sticky, and accessible.
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useState } from 'react';
import { useToast } from './ToastProvider';

function MobileNav({ onResumeClick }: { onResumeClick: (e: React.MouseEvent) => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="md:hidden absolute right-4 top-3 z-50">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="p-2 rounded-md text-accent dark:text-accent2 bg-white dark:bg-gray-900 border border-accent2 dark:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-accent2 dark:border-accent py-2 flex flex-col gap-2 animate-fade-in">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block px-4 py-2 text-accent dark:text-accent2 font-semibold hover:bg-accent2/10 rounded transition ${router.pathname === link.href ? 'text-accent2' : ''}`}
                aria-current={router.pathname === link.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <button
            type="button"
            className="block w-full px-4 py-2 mt-1 border border-accent bg-white text-accent dark:bg-gray-900 dark:text-accent2 dark:border-accent2 rounded-full font-semibold text-sm text-center pill-btn focus:outline-none focus:ring-2 focus:ring-accent transition hover:bg-accent/10 dark:hover:bg-accent2/10"
            aria-label="Download Resume PDF"
            onClick={(e) => {
              setOpen(false);
              onResumeClick(e);
            }}
          >
            Resume
          </button>
        </div>
      )}
    </div>
  );
}


// Navigation links for the site
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' }
];

/**
 * Navbar is sticky at the top and animates in on load.
 * - Uses flexbox for layout.
 * - Responsive: will wrap or scroll horizontally on small screens if needed.
 * - Highlights the current page for user clarity.
 */
export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const resumeUrl = typeof window !== 'undefined' ? `${window.location.origin}/Resume.pdf` : '/Resume.pdf';
    showToast('Choose an option:', 'info', [
      {
        label: 'View',
        onClick: () => {
          const link = document.createElement('a');
          link.href = resumeUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.click();
        }
      },
      {
        label: 'Download',
        onClick: () => {
          const link = document.createElement('a');
          link.href = resumeUrl;
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
    <motion.nav
      className="bg-gray-950 bg-opacity-80 sticky top-0 z-50 shadow"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between px-4 py-3 gap-2 md:gap-4">
        {/* Hamburger menu for mobile */}
        <MobileNav onResumeClick={handleResumeClick} />
        {/* Left section: Theme toggle and Brand */}
        <div className="flex flex-row items-center gap-2 md:gap-4 flex-shrink-0">
          <button
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            {theme === 'light' ? (
              // Moon icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M17.293 13.293a8 8 0 01-10.586-10.586A8.001 8.001 0 1017.293 13.293z" />
              </svg>
            ) : (
              // Sun icon for light mode
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 110-14 7 7 0 010 14zm0-18a1 1 0 011 1v2a1 1 0 01-2 0V0a1 1 0 011-1zm0 20a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm10-10a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-20 0a1 1 0 011 1H0a1 1 0 110-2h2a1 1 0 011 1zm15.071-7.071a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-12.142 0a1 1 0 010 1.414L2.929 5.343A1 1 0 111.515 3.929l1.414-1.414a1 1 0 011.414 0zm12.142 12.142a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zm-12.142 0a1 1 0 01-1.414 0L0 16.071a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414z" />
              </svg>
            )}
          </button>
          {/* Brand/Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-accent cursor-pointer whitespace-nowrap">Prasad Sawant</span>
          </Link>
        </div>
        {/* Right section: Nav links and Resume */}
        <div className="flex flex-row items-center gap-2 md:gap-4">
          <ul className="hidden md:flex gap-4 lg:gap-6 items-center">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    `px-3 py-2 rounded-lg font-medium transition-colors duration-150 text-sm lg:text-base hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white` +
                    (router.pathname === link.href
                      ? ' bg-accent text-white dark:bg-accent dark:text-white'
                      : ' text-white dark:text-gray-200')
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Resume download button */}
          <button
            onClick={handleResumeClick}
            className="hidden md:inline-flex items-center gap-2 ml-2 px-4 py-2 rounded-full font-semibold border border-accent bg-accent text-white pill-btn shadow-sm hover:bg-accent2 hover:border-accent2 focus:outline-none focus:ring-2 focus:ring-accent transition"
            aria-label="Download Resume PDF"
            type="button"
          >
            Resume
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
