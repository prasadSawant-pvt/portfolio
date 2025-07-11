import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Layout title="About">
      <motion.section
        className="bg-white dark:bg-gray-900 min-h-screen py-16 px-4 text-center flex flex-col items-center justify-center transition-colors duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-accent dark:text-accent2 mb-4">About Me</h1>
        {/* About Me paragraph - updated for 2025 */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-6 md:px-10 md:py-8 mb-4 shadow-lg inline-block text-left max-w-2xl transition-colors duration-300">
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            I&apos;m a passionate and performance-driven Backend Software Engineer with hands-on experience building scalable APIs and microservices for enterprise-grade systems. Currently at PayPal, I specialize in Java, Spring Boot, and cloud-native architectures, delivering backend solutions that are fast, reliable, and production-ready.<br /><br />
            With a strong foundation in DevOps practices like Docker, CI/CD pipelines, and cloud deployments, I focus on building systems that are not just functional, but optimized for speed, scalability, and maintainability. I&apos;ve consistently contributed to improving system performance, accelerating development cycles, and reducing time-to-market.
          </p>
        </div>
        <div className="mt-6">
          <span className="block text-gray-500">Location: <span className="text-accent">India</span></span>
        </div>
      </motion.section>
    </Layout>
  );
}
