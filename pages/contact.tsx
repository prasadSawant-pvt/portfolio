import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <Layout title="Contact">
      <motion.section
        id="contact"
        className="bg-white dark:bg-gray-900 min-h-screen py-16 px-4 text-center text-accent dark:text-accent2 flex flex-col items-center justify-center transition-colors duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-accent dark:text-accent2">Get In Touch</h2>
        {/* LinkedIn Card */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-8 max-w-md w-full mx-auto shadow-lg transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="text-xl font-bold mb-4 text-accent dark:text-accent2">Connect with me on LinkedIn</div>
          <div className="flex gap-2 justify-center">
            <a
              href="https://www.linkedin.com/in/prasadsawant518"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow transition-colors duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
              CONNECT
            </a>
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=prasadsawant518"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow transition-colors duration-150"
            >
              FOLLOW
            </a>
          </div>
        </motion.div>



        {/* Contact Form (Formspree) */}
        <motion.form
          action="https://formspree.io/f/mzzgnoeo"
          method="POST"
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-accent dark:border-accent2 shadow-lg max-w-md w-full mx-auto text-left transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-accent dark:text-accent2 mb-2 font-semibold">Name</label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-accent dark:text-accent2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-accent dark:focus:border-accent2" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-accent mb-2 font-semibold">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded bg-gray-100 text-accent border border-gray-300 focus:outline-none focus:border-accent" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-accent mb-2 font-semibold">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 rounded bg-gray-100 text-accent border border-gray-300 focus:outline-none focus:border-accent"></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold transition-colors duration-150">Send Message</button>
        </motion.form>
      </motion.section>
    </Layout>
  );
}
