// Layout component: wraps every page with a consistent structure and meta tags.
// Provides a mobile-friendly, responsive shell for all content.
import Head from 'next/head';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { ThemeProvider } from './ThemeContext';

// Props for the Layout component
interface Props {
  title?: string; // Page title for <title> tag
  children: React.ReactNode; // Page content
}

/**
 * Layout provides a consistent app frame: meta tags, navbar, and animated footer.
 * - Uses flexbox for vertical stacking and min-h-screen for full viewport height.
 * - <main> grows to fill space, keeping footer at the bottom.
 * - All styles are mobile-first and responsive.
 */
export default function Layout({ title, children }: Props) {
  return (
    // ThemeProvider wraps the app to provide dark/light mode functionality
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Head: Meta tags, favicon, Google Fonts, and FontAwesome icons */}
        <Head>
          <title>{title ? `${title} | Prasad Sawant` : 'Prasad Sawant Portfolio'}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Dancing+Script:wght@700&family=Pacifico&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </Head>
        {/* Navbar: always at the top */}
        <Navbar />
        {/* Main content area: grows to fill space */}
        <main className="flex-1">{children}</main>
        {/* Animated footer for a polished finish */}
        <motion.footer
          className="text-center py-6 text-gray-500 border-t border-gray-200 mt-12 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          &copy; 2025 Prasad Sawant. All rights reserved.
        </motion.footer>
      </div>
    </ThemeProvider>
  );
}
