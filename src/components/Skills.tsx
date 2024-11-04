import { useState } from 'react';
import { Code, Server, Wrench } from 'lucide-react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = {
    'Frontend': {
      icon: Code,
      color: 'blue',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'CSS/Tailwind', level: 90 },
        { name: 'Next.js', level: 80 },
      ],
    },
    'Backend': {
      icon: Server,
      color: 'green',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 75 },
        { name: 'SQL', level: 80 },
        { name: 'GraphQL', level: 70 },
      ],
    },
    'Tools': {
      icon: Wrench,
      color: 'purple',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 80 },
      ],
    },
  };

  const getGradient = (color: string) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
    };
    return gradients[color as keyof typeof gradients];
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 opacity-0 animate-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {Object.entries(skillCategories).map(([category, { icon: Icon, color, skills }], index) => (
            <div 
              key={category}
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getGradient(color)}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{category}</h3>
                </div>
                
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="group"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium group-hover:text-blue-500 transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className={`text-gray-500 transition-colors duration-200 
                          ${hoveredSkill === skill.name ? 'text-blue-500' : ''}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ease-out 
                            bg-gradient-to-r ${getGradient(color)}
                            ${hoveredSkill === skill.name ? 'scale-x-105' : 'scale-x-100'}`}
                          style={{ 
                            width: `${skill.level}%`,
                            transformOrigin: 'left',
                          }}
                        >
                        </div>
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

export default Skills;