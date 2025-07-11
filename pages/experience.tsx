import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Backend Software Engineer',
    company: 'PayPal, Bengaluru',
    date: 'Jan 2025 – Present',
    description: [
      'Design, develop, and optimize core systems that power millions of transactions daily.',
      'Collaborate closely with experienced engineers to learn and grow skills.',
      'Develop and maintain backend components, write clean and efficient code, and participate in code reviews.'
    ]
  },
  {
    title: 'Analyst',
    company: 'TIAA, Bengaluru',
    date: 'July 2022 – Dec 2024',
    description: [
      'Developed robust and scalable APIs for the web-based platform ICON.',
      'Contributed to the Retireplus Team (RST), enhancing investment and balance management tools.',
      'Participated actively in feature discussions, requirement gathering, and technical analysis.'
    ]
  }
];

export default function Experience() {
  return (
    <Layout title="Experience">
      <motion.section
        className="max-w-3xl mx-auto py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-accent mb-8">Experience</h1>
        <div className="flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              className="bg-gray-100 rounded-xl shadow p-6 border-l-4 border-accent hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(52,152,219,0.15)' }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <div className="text-xl font-semibold text-accent2">{exp.title}</div>
                  <div className="text-accent font-medium">{exp.company}</div>
                </div>
                <div className="text-gray-500 italic text-sm mt-2 md:mt-0">{exp.date}</div>
              </div>
              <ul className="list-disc ml-6 text-gray-700 mt-2">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
}
