import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Blogs() {
  return (
    <Layout title="Blogs">
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white dark:bg-gray-900 px-2 sm:px-0 transition-colors duration-300">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-accent dark:text-accent2 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Personal Blogs
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          This page is under construction. <br />
          <span className="font-semibold text-accent dark:text-accent2">Upcoming!</span> Soon, you’ll find my personal tech blogs and insights here. Stay tuned for updates!
        </motion.p>
        <motion.div
          className="mt-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          🚧 In Progress: Personal blog section coming soon.
        </motion.div>
      </section>
    </Layout>
  );
}
