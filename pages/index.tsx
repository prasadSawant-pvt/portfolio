// Home page: friendly landing section introducing Prasad Sawant
// Layout and content are mobile-first and fully responsive
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

/**
 * Home() is the landing page of the portfolio.
 * - Shows profile photo, name, and summary.
 * - All layout uses flexbox and responsive Tailwind classes for mobile friendliness.
 * - Animations are handled by Framer Motion for a modern feel.
 */
export default function Home() {
  return (
    <Layout title="Home">
      {/* Main hero section: vertically centered, mobile-friendly */}
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
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="/Prasad_Sawant_CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-accent dark:bg-accent2 text-white dark:text-gray-900 font-semibold rounded-full shadow hover:bg-accent2 dark:hover:bg-accent transition-colors duration-150 text-lg"
            aria-label="Download Resume PDF"
          >
            Download Resume
          </a>
        </motion.div>
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
          <a
            href="mailto:prasadsawant.pvt@gmail.com"
            className="text-accent dark:text-accent2 hover:underline"
          >
            prasadsawant.pvt@gmail.com
          </a>
        </motion.div>
        {/* Social links: LinkedIn and GitHub, large and easy to tap */}
        <motion.div
          className="flex gap-4 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a href="https://www.linkedin.com/in/prasadsawant518" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-accent dark:text-accent2 text-2xl hover:text-accent2 dark:hover:text-accent">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/prasadSawant-pvt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-accent dark:text-accent2 text-2xl hover:text-accent2 dark:hover:text-accent">
            <i className="fab fa-github"></i>
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}
