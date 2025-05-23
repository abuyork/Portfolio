import { 
  Github, ExternalLink, 
  Home, // For Real Estate
  Pizza, // For Pizza Shop
  HelpCircle // For Quiz Website
} from 'lucide-react';
import { useScroll } from 'framer-motion';
import { useRef} from 'react';
import { 
  ReactIcon, NodeIcon, MongoDbIcon,
  NextJsIcon, TypeScriptIcon, SocketIoIcon,
  FirebaseIcon,
  AiIcon
} from '../utils/TechIcons';
import penthouseImg from '../assets/penthouse.jpeg';
import pizeriaImg from '../assets/pizeria.jpeg';
import quizappImg from '../assets/quizapp.jpeg';

const Projects = () => {
  const containerRef = useRef<HTMLElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  const projects = [
    {
      title: 'Real Estate Agency',
      icon: Home,
      description: 'Penthouse: A modern real estate agency platform where users can mint properties as NFTs, enabling secure blockchain-based ownership and transactions.',
      image: penthouseImg,
      technologies: [
        { icon: NextJsIcon, name: 'Next.js' },
        { icon: NodeIcon, name: 'Node.js' },
        { icon: MongoDbIcon, name: 'MongoDB' },
        { icon: SocketIoIcon, name: 'Socket.io' }
      ],
      github: 'https://github.com',
      demo: 'http://penthouse.click',
    },
    {
      title: 'Pizza Delivery Shop',
      icon: Pizza,
      description: 'Pizzeria: An online pizza shop featuring an AI-powered calorie tracking tool, allowing users to customize orders and monitor nutritional intake.',
      image: pizeriaImg,
      technologies: [
        { icon: ReactIcon, name: 'React' },
        { icon: TypeScriptIcon, name: 'TypeScript' },
        { icon: MongoDbIcon, name: 'MongoDB' },
        { icon: AiIcon, name: 'AI' }
      ],
      github: 'https://github.com',
      demo: 'http://pizeria.store',
    },
    {
      title: 'Quiz Website',
      icon: HelpCircle,
      description: 'Full Stack Quiz App: A dynamic quiz platform built with React and TypeScript, utilizing Firestore for data storage and Firebase for authentication.',
      image: quizappImg,
      technologies: [
        { icon: ReactIcon, name: 'React' },
        { icon: TypeScriptIcon, name: 'TypeScript' },
        { icon: FirebaseIcon, name: 'Firebase' }
      ],
      github: 'https://github.com',
      demo: 'https://js-quizmax.netlify.app',
    },
  ];

  return (
    <section 
      id="projects" 
      ref={containerRef}
      style={{ position: 'relative' }}
      className="relative min-h-[110vh] py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950/90 text-white overflow-hidden flex items-center justify-center"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 font-['Space_Grotesk'] tracking-tight">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full" />
        </div>
        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-xl
                bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-gray-900/95
                border border-white/10 hover:border-transparent
                shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                transition-all duration-500 ease-out
                hover:shadow-[0_20px_70px_rgba(59,130,246,0.4)]
                hover:-translate-y-2
                after:absolute after:inset-[1px] after:rounded-[10px] after:z-10 after:pointer-events-none
                after:opacity-0 after:transition-opacity after:duration-500
                after:bg-gradient-to-b after:from-white/5 after:to-transparent
                group-hover:after:opacity-100
              `}
              style={{
                boxShadow: '0 0 20px 2px rgba(59,130,246,0.15), 0 0 40px 4px rgba(168,85,247,0.1)',
              }}
            >
              {/* Animated border glow */}
              <div 
                className="absolute inset-0 -z-10 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(120deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3), rgba(16,185,129,0.3))',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 8s ease infinite, pulse 3s ease-in-out infinite alternate',
                }}
              />
              
              {/* Image section */}
              <div className="relative h-64 overflow-hidden z-20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 filter brightness-105 contrast-105 saturate-105 group-hover:scale-110"
                  style={{ transform: 'scale(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="absolute bottom-0 left-0 right-0 px-8 py-4 flex justify-between items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <div className="flex gap-2 ml-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content section */}
              <div className="relative z-20 p-10 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300">
                    <project.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors duration-200 drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_2px_15px_rgba(59,130,246,0.5)]">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-100 mb-6 line-clamp-2 transition-colors duration-200 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="relative group/tech"
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/10 p-1 hover:bg-blue-500/10 transition-all duration-200 border border-white/10 hover:border-blue-500/20 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center">
                        <tech.icon className="w-full h-full text-white group-hover/tech:text-blue-400 transition-colors duration-200" />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10">
                        {tech.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;