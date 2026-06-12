<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'frontend' => ['React', 'TailwindCSS', 'JavaScript', 'TypeScript', 'Bootstrap', 'HTML5', 'CSS3', 'Redux', 'Vite', 'Three.js', 'Material-UI', 'Chart.js', 'Performance Optimization', 'SEO'],
            'backend' => ['Node.js', 'Express', 'Java', 'Spring Boot', 'REST APIs', 'WebSocket', 'JWT', 'Scalability', 'Security'],
            'devops' => ['Git', 'Docker', 'CI/CD', 'Linux', 'Nginx', 'Cloud Deployment', 'Hosting Services'],
            'database' => ['MongoDB', 'PostgreSQL', 'MySQL', 'Database Design', 'Query Optimization'],
            'design' => ['UI/UX', 'Figma', 'Adobe XD', 'Responsive Design', 'Accessibility'],
        ];

        $sortOrder = 1;

        foreach ($categories as $category => $skills) {
            foreach ($skills as $skill) {
                Skill::updateOrCreate(
                    ['name' => $skill, 'category' => $category],
                    ['sort_order' => $sortOrder++, 'is_active' => true]
                );
            }
        }
    }
}
