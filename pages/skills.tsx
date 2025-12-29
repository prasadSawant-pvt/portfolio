import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/apple-cards-carousel';
import { SkillBadge } from '../components/ui/skill-badge';
import HeroDecorations from '../components/HeroDecorations';

// Demo skill level mapping - easily update ratings here
const skillLevels: Record<string, number> = {
  'Java': 4.5,
  'Spring Boot': 4.5,
  'SQL': 4.5,
  'JUnit': 4.5,
  'Microservices': 4.5,
  'CI/CD': 4.5,
  'SonarQube': 4.5,
  'Apache Kafka': 4,
};

// Global flag to show/hide skill ratings on hover
const SHOW_SKILL_RATINGS = false;

function getSkillLevel(skill: string): number {
  if (skillLevels.hasOwnProperty(skill)) return skillLevels[skill];
  return 4;
}

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
      <HeroDecorations />
      <motion.section
        className="relative max-w-4xl mx-auto py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-accent mb-8">Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <Card
              key={skill.category}
              card={{
                category: skill.category,
                title: skill.category,
                content: (
                  <ul className="flex flex-wrap gap-3 md:gap-2 mt-2">
                    {skill.items.map(item => (
                      <li key={item}>
                        <SkillBadge skill={item} level={getSkillLevel(item)} showRating={SHOW_SKILL_RATINGS} />
                      </li>
                    ))}
                  </ul>
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
