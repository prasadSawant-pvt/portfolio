import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/apple-cards-carousel';
import HeroDecorations from '../components/HeroDecorations';

const experiences = [
  {
    title: 'Backend Software Engineer',
    company: 'PayPal, Bengaluru',
    date: 'Jan 2025 – Present',
    description: [
     'Optimized core card-payment flows across Authorization, Switch, and Settlement layers, improving routing accuracy and reducing downgrades across major processors (Visa, Discover, Amex, FDMS, OMNIPAY).',
'Delivered key interchange optimization programs (Visa SMB, Discover TPAN), improving qualification accuracy and generating over $1.5M annual savings through rule and processor-level enhancements.',
'Led controlled traffic rollouts from pilot to full production (100%), ensuring zero performance issues through continuous telemetry and monitoring.',
'Modernized observability by driving the OpenTelemetry migration and stabilizing telemetry pipelines, improving metrics, logs, and alerts across high-throughput payment services (Datadog, Kibana, Micrometer).',
'Owned production incident response for declines, routing faults, auth-capture mismatches, and certificate/key rotations; performed deep RCA and delivered fixes to improve platform reliability.',

    ]
  },
  {
    title: 'Analyst',
    company: 'TIAA, Pune',
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
      <HeroDecorations />
      <motion.section
        className="relative max-w-3xl mx-auto py-12"
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
