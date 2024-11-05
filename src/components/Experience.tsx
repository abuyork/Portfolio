import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2021 - Present',
      description: 'Led development of enterprise-level applications, mentored junior developers, and implemented CI/CD pipelines.',
      achievements: [
        'Reduced application load time by 40%',
        'Implemented microservices architecture',
        'Led team of 5 developers',
      ],
    },
    {
      company: 'Digital Innovations',
      position: 'Full Stack Developer',
      period: '2019 - 2021',
      description: 'Developed and maintained multiple client projects using React and Node.js.',
      achievements: [
        'Delivered 10+ successful projects',
        'Improved code coverage to 90%',
        'Introduced automated testing',
      ],
    },
    {
      company: 'StartUp Labs',
      position: 'Frontend Developer',
      period: '2018 - 2019',
      description: 'Built responsive web applications and implemented modern UI/UX designs.',
      achievements: [
        'Developed component library',
        'Optimized frontend performance',
        'Collaborated with UX team',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 opacity-0 animate-slide-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
            Experience
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className={`relative ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-16 md:pr-0' : 'md:mr-auto md:pr-16 md:pl-0'
                } ml-8 md:w-1/2 group`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col">
                      <span className="text-blue-500 font-semibold group-hover:text-blue-600 transition-colors duration-200">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-blue-500 transition-colors duration-200">
                        {exp.position}
                      </h3>
                      <span className="text-gray-600 font-medium">{exp.company}</span>
                      <p className="text-gray-600 mt-4">{exp.description}</p>
                      <ul className="mt-4 space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-200"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;