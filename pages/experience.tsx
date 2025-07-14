import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/apple-cards-carousel';

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
        <div className="flex flex-col gap-6 w-full py-6 sm:py-10">
          {experiences.map((exp, idx) => (
            <Card
              key={exp.title}
              card={{
                category: exp.company,
                title: exp.title,
                content: (
                  <>
                    <div className="text-gray-500 italic text-xs sm:text-sm mb-2">{exp.date}</div>
                    <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-2">
                      {exp.description.map((desc: string, i: number) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </>
                ),
              }}
              index={idx}
            />
          ))}
        </div>
      </motion.section>
    </Layout>
  );
}
