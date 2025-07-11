// Navbar component: provides the main site navigation and branding.
// Designed to be mobile-friendly, sticky, and accessible.
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Navigation links for the site
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/portfolio', label: 'Portfolio' },
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
  return (
    <motion.nav
      className="bg-gray-950 bg-opacity-80 sticky top-0 z-50 shadow"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 py-3">
        {/* Theme switch button: top left */}
        <button
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          onClick={toggleTheme}
          className="mr-4 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent transition"
          style={{ position: 'absolute', left: 12, top: 12 }}
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
          <span className="text-2xl font-bold text-accent cursor-pointer">Prasad Sawant</span>
        </Link>
        {/* Navigation links */}
        <ul className="flex flex-wrap gap-4 md:gap-6 mt-2 md:mt-0">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href}>
                <span
                  className={`hover:text-accent2 transition font-semibold cursor-pointer ${router.pathname === link.href ? 'text-accent2' : 'text-gray-300'}`}
                  aria-current={router.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
