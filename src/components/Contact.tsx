import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'nortoshev@bk.ru',
      href: 'mailto:nortoshev@bk.ru',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+82 10 6895 3473',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Seoul, SK',
      href: 'https://maps.google.com/?q=Seoul',
    },
  ];


  return (
    <section id="contact" className="py-14 bg-gradient-to-br from-[#0e131f] via-[#181c2a] to-[#1a223a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 opacity-0 animate-slide-up">
          <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk'] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
            Contact Me
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="flex flex-col items-center text-center space-y-0 opacity-0 animate-slide-up animation-delay-200 w-full">
          <div>
            <p className="text-gray-300 mb-5 text-sm">
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out if you'd like to connect!
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-evenly md:space-x-0 space-y-4 md:space-y-0">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-gradient-to-br from-[#171c2c] to-[#121624] shadow-xl hover:shadow-2xl transition-all duration-300 group w-full md:w-1/4 justify-center mx-1 overflow-hidden backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/20 relative min-h-0"
                >
                  {/* Glass reflection overlay */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(2px)',
                    }}
                  />
                  {/* Glow effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 z-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)',
                      filter: 'blur(40px)',
                    }}
                  />
                  {/* Card content */}
                  <div className="relative flex items-center z-10">
                    <div className="p-2 rounded-lg bg-blue-500 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 text-left">
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 text-base">
                        {info.title}
                      </h4>
                      <p className="text-gray-300 text-sm">{info.value}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;