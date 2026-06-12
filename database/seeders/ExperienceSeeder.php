<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'company' => 'Genç Data Bilişim — Yazılım ve Güvenlik Çözümleri',
                'role_tr' => 'Full Stack Geliştirici',
                'role_en' => 'Full Stack Software Developer',
                'description_tr' => 'Java Spring Boot ve React kullanarak kurumsal web uygulamaları ve özel yazılım çözümleri geliştiriyorum. Yazılım süreçlerinin yanı sıra, işletmeler için kritik teknik altyapı yönetimi ve profesyonel güvenlik kamerası sistemleri kurulumu hizmetlerini koordine ediyorum.',
                'description_en' => 'Providing end-to-end digital solutions including custom corporate web applications using Java Spring Boot and React. Beyond software, I manage technical infrastructure projects, including server maintenance and professional security camera system installations for businesses.',
                'technologies' => ['React', 'Java', 'Spring Boot', 'Docker', 'CI/CD', 'Security Systems', 'Network Infrastructure', 'PostgreSQL'],
                'start_date' => '2025-01-01',
                'end_date' => null,
                'is_current' => true,
                'sort_order' => 1,
            ],
            [
                'company' => 'İstanbul Kodluyor — Tobeto (Uzaktan)',
                'role_tr' => 'Full Stack Geliştirici',
                'role_en' => 'Full Stack Web Developer',
                'description_tr' => 'Yüksek performanslı, duyarlı ve SEO uyumlu web arayüzleri geliştirdim. Veritabanı tasarımından canlıya alım süreçlerine kadar tam kapsamlı yazılım geliştirme projelerinde yer aldım.',
                'description_en' => 'Developed high-performance, responsive web applications and SEO-friendly interfaces. Participated in the complete software development lifecycle (SDLC) from database design to frontend deployment.',
                'technologies' => ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'JPA', 'Responsive Design'],
                'start_date' => '2023-09-01',
                'end_date' => '2024-04-01',
                'is_current' => false,
                'sort_order' => 2,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::updateOrCreate(
                ['company' => $experience['company'], 'start_date' => $experience['start_date']],
                $experience
            );
        }
    }
}
