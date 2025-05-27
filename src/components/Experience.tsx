import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const Experience = () => {
  const experiences = [
    {
      company: 'Innovatech Development',
      position: 'Full Stack Developer',
      period: 'Jul 2024 - Apr 2025',
      description: `Designed and built multiple scalable RESTful and GraphQL APIs using NestJS, TypeScript, and Apollo Server, serving as the core backend for complex web and mobile frontend clients. Engineered and integrated critical frontend features with Next.js (Pages Router), React Query, and Apollo Client, collaborating closely with UI/UX designers to deliver robust user experiences across key application modules. Streamlined application deployment workflows by containerizing services with Docker, managing process control with PM2, and configuring NGINX as a reverse proxy, enhancing system stability and reducing manual intervention.`,
      achievements: [
        'Designed and built scalable RESTful and GraphQL APIs with NestJS, TypeScript, and Apollo Server',
        'Integrated frontend features using Next.js, React Query, and Apollo Client in collaboration with UI/UX designers',
        'Streamlined deployments with Docker, PM2, and NGINX for improved stability',
        'Implemented real-time updates with WebSocket and Socket.IO',
        'Led architectural planning, database ER modeling, and flowchart creation for scalable growth',
      ],
    },
    {
      company: 'Webbrain Solution',
      position: 'Frontend Developer',
      period: 'Apr 2022 - Jun 2024',
      description: `Developed and launched multiple responsive landing pages and client websites using React, TypeScript, and EJS, consistently delivering on tight deadlines in a fast-paced environment supporting early-stage product iterations. Built highly reusable and cross-browser compatible UI components with MUI and Bootstrap, directly contributing to the consistent user experience for both internal tools and outsourced client projects. Enhanced frontend architecture by implementing Redux Toolkit and Context API, significantly improving complex application state management and developer experience for future feature expansion. Created rich, animated user experiences using Three.js, React Fiber, and Anime.js on marketing pages, elevating user engagement and product presentation. `,
      achievements: [
        'Developed and launched responsive landing pages and client websites with React, TypeScript, and EJS',
        'Built highly reusable, cross-browser UI components using MUI and Bootstrap',
        'Enhanced frontend architecture with Redux Toolkit and Context API for scalable state management',
        'Created rich, animated user experiences with Three.js, React Fiber, and Anime.js',
        'Integrated multilingual support using React-i18next for key client websites',
        'Helped develop a standardized design system in Figma with designers',
        'Actively participated in sprint planning, code reviews, and weekly standups',
      ],
    },
  ];

  return (
    <section id="experience" className="min-h-[80vh] flex flex-col justify-center py-10 bg-gradient-to-br from-[#0e131f] via-[#181c2a] to-[#1a223a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
            Experience
          </h2>
          <div className="w-10 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 justify-center items-start">
          {experiences.map((exp, index) => {
            const [isHovered, setIsHovered] = useState(false);
            const [rotation, setRotation] = useState({ x: 0, y: 0 });
            const cardRef = useRef<HTMLDivElement>(null);

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = -(y / rect.height) * 5;
                const rotateY = (x / rect.width) * 5;
                setRotation({ x: rotateX, y: rotateY });
              }
            };
            const handleMouseLeave = () => {
              setIsHovered(false);
              setRotation({ x: 0, y: 0 });
            };
            return (
              <motion.div
                key={index}
                ref={cardRef}
                className="relative rounded-[32px] overflow-hidden min-h-[200px] max-w-[500px] min-w-[360px] w-full flex flex-col cursor-pointer mx-auto md:mx-4 mb-6"
                style={{
                  backgroundColor: '#0e131f',
                  boxShadow: '0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)',
                  perspective: 1000,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: isHovered ? -5 : 0,
                  rotateX: rotation.x,
                  rotateY: rotation.y,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                {/* Glass reflection overlay */}
                <motion.div
                  className="absolute inset-0 z-35 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(2px)',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    opacity: isHovered ? 0.7 : 0.5,
                    rotateX: -rotation.x * 0.2,
                    rotateY: -rotation.y * 0.2,
                    z: 1,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
                  style={{
                    background:
                      'radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)',
                    filter: 'blur(40px)',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    opacity: isHovered ? 0.9 : 0.8,
                    y: isHovered ? rotation.x * 0.5 : 0,
                    z: 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Card content */}
                <motion.div className="relative flex flex-col h-full p-8 z-40" style={{ transformStyle: 'preserve-3d' }}>
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: 'linear-gradient(225deg, #171c2c 0%, #121624 100%)',
                      position: 'relative',
                      overflow: 'hidden',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      boxShadow: isHovered
                        ? '0 8px 16px -2px rgba(0, 0, 0, 0.3), 0 4px 8px -1px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.15), inset -2px -2px 5px rgba(0, 0, 0, 0.7)'
                        : '0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 3px 6px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)',
                      z: isHovered ? 10 : 5,
                      y: isHovered ? -2 : 0,
                      rotateX: isHovered ? -rotation.x * 0.5 : 0,
                      rotateY: isHovered ? -rotation.y * 0.5 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <Briefcase className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div className="mb-auto">
                    <motion.h3 className="text-2xl font-medium text-white mb-3">
                      {exp.position}
                    </motion.h3>
                    <span className="text-blue-400 font-semibold text-sm md:text-base block mb-1">{exp.period}</span>
                    <span className="text-gray-300 font-medium text-sm block mb-2">{exp.company}</span>
                    <motion.p className="text-sm mb-4 text-gray-300">
                      {exp.description}
                    </motion.p>
                    <ul className="space-y-1">
                      {exp.achievements.slice(0, 2).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-center text-gray-300 text-sm md:text-base">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;