import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const Projects = ({ language }) => {
  const translations = {
    en: {
      title: "Projects",
      subtitle: "Some of my recent work",
      viewLive: "View Live",
      viewCode: "View Code",
      projects: [
        {
          title: "E-Commerce Platform",
          description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          image: "Modern e-commerce website showing product catalog and shopping cart"
        },
        {
          title: "Task Management App",
          description: "Collaborative task management tool with real-time updates and team features.",
          technologies: ["React", "Firebase", "TailwindCSS", "WebSocket"],
          image: "Task management dashboard with kanban board and team collaboration"
        },
        {
          title: "Social Media Dashboard",
          description: "Analytics dashboard for social media management with data visualization.",
          technologies: ["Vue.js", "Chart.js", "Express", "PostgreSQL"],
          image: "Social media analytics dashboard with graphs and statistics"
        },
        {
          title: "Portfolio CMS",
          description: "Content management system for creating and managing portfolio websites.",
          technologies: ["React", "Next.js", "Prisma", "AWS"],
          image: "Content management system interface for portfolio creation"
        },
        {
          title: "Weather Application",
          description: "Real-time weather app with forecasts and location-based features.",
          technologies: ["React", "OpenWeather API", "Geolocation"],
          image: "Weather application showing forecast and current conditions"
        },
        {
          title: "Fitness Tracker",
          description: "Mobile-responsive fitness tracking app with workout logs and progress charts.",
          technologies: ["React Native", "Redux", "Node.js", "MySQL"],
          image: "Fitness tracking app with workout logs and progress graphs"
        }
      ]
    },
    tr: {
      title: "Projeler",
      subtitle: "Son çalışmalarımdan bazıları",
      viewLive: "Canlı Görüntüle",
      viewCode: "Kodu Görüntüle",
      projects: [
        {
          title: "E-Ticaret Platformu",
          description: "Sepet, ödeme ve ödeme entegrasyonlu tam özellikli online alışveriş platformu.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          image: "Modern e-ticaret web sitesi ürün kataloğu ve alışveriş sepeti gösterimi"
        },
        {
          title: "Görev Yönetim Uygulaması",
          description: "Gerçek zamanlı güncellemeler ve takım özellikleri ile işbirlikli görev yönetim aracı.",
          technologies: ["React", "Firebase", "TailwindCSS", "WebSocket"],
          image: "Kanban panosu ve takım işbirliği ile görev yönetim paneli"
        },
        {
          title: "Sosyal Medya Panosu",
          description: "Veri görselleştirme ile sosyal medya yönetimi için analitik panosu.",
          technologies: ["Vue.js", "Chart.js", "Express", "PostgreSQL"],
          image: "Grafikler ve istatistiklerle sosyal medya analitik panosu"
        },
        {
          title: "Portföy CMS",
          description: "Portföy web siteleri oluşturmak ve yönetmek için içerik yönetim sistemi.",
          technologies: ["React", "Next.js", "Prisma", "AWS"],
          image: "Portföy oluşturma için içerik yönetim sistemi arayüzü"
        },
        {
          title: "Hava Durumu Uygulaması",
          description: "Tahminler ve konum tabanlı özelliklerle gerçek zamanlı hava durumu uygulaması.",
          technologies: ["React", "OpenWeather API", "Geolocation"],
          image: "Tahmin ve mevcut koşulları gösteren hava durumu uygulaması"
        },
        {
          title: "Fitness Takipçisi",
          description: "Antrenman kayıtları ve ilerleme grafikleri ile mobil duyarlı fitness takip uygulaması.",
          technologies: ["React Native", "Redux", "Node.js", "MySQL"],
          image: "Antrenman kayıtları ve ilerleme grafikleri ile fitness takip uygulaması"
        }
      ]
    }
  };

  const t = translations[language];

  const handleProjectClick = (type) => {
    toast({
      title: "🚧 Project Link",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <section id="projects" className="py-20 px-4 ">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {t.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleProjectClick('live')}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.viewLive}
                  </Button>
                  <Button
                    onClick={() => handleProjectClick('code')}
                    size="sm"
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;