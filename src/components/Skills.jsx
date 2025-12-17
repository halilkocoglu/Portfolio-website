import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Smartphone, Wrench as Tool } from 'lucide-react';

const Skills = ({ language }) => {
  const translations = {
    en: {
      title: "Skills",
      subtitle: "Technologies I work with",
      categories: [
        {
          icon: Code,
          title: "Frontend",
          skills: ["React", "Vue.js", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"]
        },
        {
          icon: Server,
          title: "Backend",
          skills: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"]
        },
        {
          icon: Database,
          title: "Database",
          skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"]
        },
        {
          icon: Tool,
          title: "DevOps",
          skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Nginx"]
        },
        {
          icon: Smartphone,
          title: "Mobile",
          skills: ["React Native", "PWA", "Responsive Design", "Mobile-First"]
        },
        {
          icon: Layout,
          title: "Design",
          skills: ["UI/UX", "Figma", "Adobe XD", "Wireframing", "Prototyping"]
        }
      ]
    },
    tr: {
      title: "Yetenekler",
      subtitle: "Çalıştığım teknolojiler",
      categories: [
        {
          icon: Code,
          title: "Frontend",
          skills: ["React", "Vue.js", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"]
        },
        {
          icon: Server,
          title: "Backend",
          skills: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"]
        },
        {
          icon: Database,
          title: "Veritabanı",
          skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"]
        },
        {
          icon: Tool,
          title: "DevOps",
          skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Nginx"]
        },
        {
          icon: Smartphone,
          title: "Mobil",
          skills: ["React Native", "PWA", "Duyarlı Tasarım", "Mobil-İlk"]
        },
        {
          icon: Layout,
          title: "Tasarım",
          skills: ["UI/UX", "Figma", "Adobe XD", "Tel Çerçeve", "Prototipleme"]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section id="skills" className="py-20 px-4 bg-slate-900/50">
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
          {t.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;