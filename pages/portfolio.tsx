import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Portfolio-Website',
    year: 2025,
    description: [
      'Personal portfolio website to showcase my work, skills, and experience.',
      'Features modern UI/UX, animated transitions, and responsive design.',
      'Built using Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
      'Deployed on Vercel with best practices for SEO and performance.'
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    tag: 'Personal Project',
    link: 'https://github.com/prasadSawant-pvt/portfolio'
  },
  {
    title: 'E-commerce Website Backend Services',
    year: 2024,
    description: [
      'Developed a robust microservices architecture using Spring Boot for an e-commerce backend, encompassing Product, Inventory, Order, and Notification services.',
      'Implemented service discovery with Netflix Eureka and API routing via Spring Cloud Gateway for efficient communication and load balancing.',
      'Integrated Keycloak for secure identity management and Spring Cloud Circuit Breaker for fault tolerance.',
      'Utilized Apache Kafka for event-driven communication, enabling asynchronous processing and improved scalability.',
      'Dockerized all microservices for consistent deployment, and set up Prometheus & Grafana for monitoring and optimization.'
    ],
    tech: ['Java', 'Spring Boot', 'Microservices', 'Netflix Eureka', 'Spring Cloud Gateway', 'Event-driven Architecture', 'REST API', 'Apache Kafka', 'Docker', 'Keycloak', 'Prometheus', 'Grafana'],
    tag: 'Personal Project',
    link: 'https://github.com/prasadSawant-pvt/E-commerce-Website-Backend-Services'
  },
  {
    title: 'Fund-Lineup-Change Service (ICON) - Backend Microservice',
    year: 2023,
    description: [
      'Implemented a robust Data Management System using Spring Boot and MongoDB to handle investment lineup changes, client data, fees, pricing, and workflow microservices.',
      'Designed specialized microservices (document, fund lineup change, offer, rules) tailored to client needs.',
      'Ensured seamless data exchange with Apache Kafka for critical operations like pricing updates and notifications.',
      'Optimized performance with REST APIs and caching mechanisms for fast data retrieval.',
      'Managed complex workflows for investment lineup changes, ensuring efficient and accurate processing.'
    ],
    tech: ['Java', 'MongoDB', 'REST-API', 'Microservice Architecture', 'Spring Boot', 'Apache Kafka', 'Docker', 'Junit', 'Design Pattern'],
    tag: 'Professional Experience',
    link: 'https://github.com/prasadSawant-pvt/Fund-Lineup-Change-Service'
  },
  {
    title: 'Interview Management System',
    year: 2022,
    description: [
      'Backend service for managing interview scheduling and notifications.',
      'Allows booking of interview slots and automatically sends meeting links to both interviewer and interviewee.',
      'Handles interviewer notifications and conflict resolution for scheduling.',
      'Built with Java and Spring Boot.'
    ],
    tech: ['Java', 'Spring Boot'],
    tag: 'Professional Experience'
  },
  {
    title: 'Plant Disease Detection using Deep Learning',
    year: 2020,
    description: [
      'Developed a deep learning model to detect plant diseases from leaf images.',
      'Used convolutional neural networks (CNNs) for image classification.',
      'Built a web interface for farmers to upload images and get instant results.'
    ],
    tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
    tag: 'Personal Project',
    link: 'https://github.com/prasadSawant-pvt/Plant-Disease-Detection'
  },
  {
    title: 'Bus Pass Booking Portal',
    year: 2019,
    description: [
      'Online web application for booking bus tickets.',
      'Features include user registration, ticket booking, and admin control.',
      'Streamlined the booking process for students and daily commuters.'
    ],
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    tag: 'Personal Project',
    link: 'https://github.com/prasadSawant-pvt/Bus-Pass-Booking-Portal'
  },
  {
    title: 'Hostel Admission and Management System',
    year: 2019,
    description: [
      'Platform for online hostel admissions, merit list management, and student profiles.',
      'Automated the admission process and record keeping.',
      'Improved efficiency for hostel administration.'
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'HTML/CSS'],
    tag: 'Personal Project',
    link: 'https://github.com/prasadSawant-pvt/Hostel-Admission-and-Management-System'
  }
];

projects.sort((a, b) => (Number(b.year || 0) - Number(a.year || 0)));

import React, { useState } from 'react';
import { Carousel, Card } from '../components/ui/apple-cards-carousel';

export default function Portfolio() {
  const [filter, setFilter] = useState<'All' | 'Personal' | 'Professional'>('All');

  return (
    <Layout title="Portfolio">
      <motion.section
        className="max-w-4xl mx-auto py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-accent mb-8">Projects</h1>
        <div className="flex gap-3 mb-8">
          {(['All', 'Personal', 'Professional'] as const).map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full border font-semibold transition-colors duration-150 ${filter === type ? 'bg-accent text-white border-accent' : 'bg-white text-accent border-accent hover:bg-accent hover:text-white'}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-6 w-full h-full py-6 sm:py-10">
          {projects
            .filter(project =>
              filter === 'All' ? true : filter === 'Personal' ? project.tag === 'Personal Project' : project.tag === 'Professional Experience'
            )
            .map((project, idx) => (
              <Card
                key={project.title}
                card={{
                  category: project.tag,
                  title: project.title,
                  content: (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tech.map((t: string, i: number) => (
                          <span key={i} className="bg-accent bg-opacity-10 text-accent px-2 py-1 rounded text-xs font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-2">
                        {project.description.map((desc: string, i: number) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                      {project.link && (
                        <div className="mt-2">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                            View on GitHub
                          </a>
                        </div>
                      )}
                      <div className="text-gray-500 italic text-xs sm:text-sm mt-2">{project.year}</div>
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
