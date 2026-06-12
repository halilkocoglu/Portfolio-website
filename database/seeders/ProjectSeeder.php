<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title_tr' => 'Alka Yapı — İnşaat & Dekorasyon Web Sitesi',
                'title_en' => 'Alka Yapı — Construction & Decoration Website',
                'description_tr' => 'Nazilli merkezli inşaat, iç mimari ve dekorasyon firması için kurumsal web sitesi. Proje portföyü, hizmet sayfaları ve ücretsiz keşif talep akışı içerir.',
                'description_en' => 'Corporate website for a Nazilli-based construction, interior design and renovation company. Features project portfolio, service pages and consultation request flow.',
                'tech_stack' => ['React', 'Tailwind CSS', 'Vite', 'SEO Optimization', 'Responsive Design'],
                'category' => 'web',
                'live_url' => 'https://www.alkayapiinsaat.com/',
                'github_url' => null,
                'image' => 'projects/alka_yapi.jpeg',
                'mobile_image' => 'projects/alka_yapi_mobile.jpeg',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title_tr' => 'Nazilli Korkmaz Optik — Ürün & Blog Web Sitesi',
                'title_en' => 'Nazilli Korkmaz Optik — Product & Blog Website',
                'description_tr' => 'Yerel optik firması için ürün tanıtımı ve bilgilendirme blog yazılarını bir arada sunan, yerel SEO odaklı tanıtım web sitesi.',
                'description_en' => 'Promotional website for a local optical company featuring product showcase, informational blog posts, and local SEO optimization.',
                'tech_stack' => ['React', 'Tailwind CSS', 'Vite', 'Blog', 'SEO Optimization'],
                'category' => 'web',
                'live_url' => 'https://nazillikorkmazoptik.com.tr/',
                'github_url' => null,
                'image' => 'projects/korkmaz_optik.jpeg',
                'mobile_image' => 'projects/korkmaz_optik_mobile.jpeg',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title_tr' => 'Ardel Group — Taşımacılık, Tur & İnşaat Web Sitesi',
                'title_en' => 'Ardel Group — Transportation, Tours & Construction',
                'description_tr' => 'Personel taşımacılığı, tur gezileri, inşaat ve dekorasyon alanlarında faaliyet gösteren çok sektörlü Ardel Group için kurumsal web sitesi. Hizmet sayfaları, araç filosu ve iletişim akışı içerir.',
                'description_en' => 'Corporate website for Ardel Group, a multi-sector company operating in personnel transportation, tour travel, construction and interior decoration. Features service pages, fleet showcase and contact flow.',
                'tech_stack' => ['React', 'Tailwind CSS', 'Vite', 'SEO Optimization', 'Responsive Design'],
                'category' => 'web',
                'live_url' => 'https://ardelgroup.com.tr/',
                'github_url' => null,
                'image' => 'projects/ardel_group.jpeg',
                'mobile_image' => 'projects/ardel_group_mobile.jpeg',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title_tr' => 'ATM Tel Örgü İş Yönetim Sistemi (CMS)',
                'title_en' => 'ATM Wire Business Management System (CMS)',
                'description_tr' => 'Kurumsal düzeyde CMS ve envanter yönetim platformu. Java ve React ile geliştirilmiş, sipariş takibi ve güvenli müşteri veri yönetimi çözümü.',
                'description_en' => 'An enterprise-level CMS and inventory management platform. Includes automated order tracking and secure customer data management built with Java and React.',
                'tech_stack' => ['React', 'Java Spring Boot', 'PostgreSQL', 'Docker', 'REST API', 'Cloud'],
                'category' => 'other',
                'live_url' => null,
                'github_url' => null,
                'image' => 'projects/ATM-logo.webp',
                'mobile_image' => null,
                'is_featured' => false,
                'sort_order' => 4,
            ],
            [
                'title_tr' => 'Uçtan Uca Araç Kiralama Uygulaması',
                'title_en' => 'Full-Stack Car Rental Application',
                'description_tr' => 'Entegre rezervasyon sistemi, filo takibi ve kullanıcı dostu arayüze sahip kapsamlı bir araç kiralama web yazılımı çözümü.',
                'description_en' => 'A comprehensive car rental solution with integrated reservation systems, fleet tracking, and responsive user interface for seamless bookings.',
                'tech_stack' => ['React', 'Spring Boot', 'JPA', 'PostgreSQL', 'WebSocket'],
                'category' => 'web',
                'live_url' => null,
                'github_url' => 'https://github.com/halilkocoglu/Full-Stack-RentACar',
                'image' => null,
                'mobile_image' => null,
                'is_featured' => false,
                'sort_order' => 5,
            ],
            [
                'title_tr' => 'Üniversite ve Eğitim Kurumu Web Sitesi',
                'title_en' => 'Educational Institution & University Website',
                'description_tr' => 'Öğrenci yönetimi, kurs katalogları ve dinamik etkinlik sistemleri içeren, SEO uyumlu eğitim portalı yazılımı.',
                'description_en' => 'SEO-friendly educational portal featuring student management, course catalogs, and dynamic event systems using Node.js and MongoDB.',
                'tech_stack' => ['Node.js', 'Express', 'MongoDB', 'EJS', 'HTML5/CSS3'],
                'category' => 'web',
                'live_url' => null,
                'github_url' => 'https://github.com/halilkocoglu/smart-edu-project',
                'image' => 'projects/smart-edu.webp',
                'mobile_image' => null,
                'is_featured' => false,
                'sort_order' => 6,
            ],
            [
                'title_tr' => 'Portföy Web Sitesi',
                'title_en' => 'Portfolio Website',
                'description_tr' => 'Modern teknolojilerle geliştirilmiş kişisel tek sayfa portföy web sitesi.',
                'description_en' => 'Personal single page portfolio website built with modern tech stack.',
                'tech_stack' => ['React', 'Radix UI', 'Lucide React', 'Tailwind CSS', 'Netlify'],
                'category' => 'web',
                'live_url' => null,
                'github_url' => 'https://github.com/halilkocoglu/Portfolio-website',
                'image' => 'projects/portfolio.webp',
                'mobile_image' => null,
                'is_featured' => false,
                'sort_order' => 7,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($project['title_tr'])],
                $project + ['is_active' => true]
            );
        }
    }
}
