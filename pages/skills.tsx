import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frameworks & Project Tools',
    items: ['Spring Boot', 'Spring JPA', 'JUnit', 'RESTful API', 'Microservices', 'SDLC', 'Jira']
  },
  {
    category: 'DevOps & Platform Tools',
    items: ['Git', 'Docker', 'SonarQube', 'OpenShift', 'Jenkins', 'Maven', 'Gradle', 'Apache Kafka', 'CI/CD']
  },
  {
    category: 'Languages & Databases',
    items: ['Java', 'Python', 'JavaScript', 'SQL', 'MongoDB', 'MySQL']
  },
  {
    category: 'Other Technologies',
    items: ['PHP', 'JSP & Servlet', 'RxJava', 'Card Payment Systems', 'Datadog', 'Kibana', 'FPTI']
  }
];

export default function Skills() {

  return (
    <Layout title="Skills">
      <motion.section
        className="max-w-4xl mx-auto py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-accent mb-8">Skills</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.category}
              className="bg-gray-100 rounded-lg shadow p-6 hover:scale-105 hover:shadow-xl transition-transform duration-150 cursor-pointer border border-transparent hover:border-accent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(52,152,219,0.15)' }}
            >
              <h2 className="text-xl font-semibold text-accent2 mb-2">{skill.category}</h2>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <li key={item} className="bg-accent text-white rounded-full px-3 py-1 text-sm font-medium">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
}
