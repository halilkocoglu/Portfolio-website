<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_title' => 'Halil İbrahim Koçoğlu | Nazilli Web Sitesi & Web Tasarım',
            'site_description_tr' => 'Nazilli ve Aydın\'daki işletmeniz için profesyonel, hızlı ve SEO uyumlu web sitesi tasarımı. Kurumsal web sitesi, e-ticaret ve özel yazılım çözümleri için Full Stack Web Geliştirici Halil İbrahim Koçoğlu ile iletişime geçin.',
            'site_description_en' => 'Professional, fast and SEO-friendly website design for businesses in Nazilli and Aydın, Turkey. Corporate websites, e-commerce and custom software solutions by Full-Stack Web Developer Halil İbrahim Koçoğlu.',
            'profile_photo' => 'settings/profilepicture.webp',
            'about_text_tr' => 'Nazilli ve Aydın\'daki işletmeler için web sitesi tasarımı ve özel yazılım çözümleri sunan bir Full-Stack Web Geliştiricisiyim. Java Spring Boot ve React teknolojilerinde uzmanlaşarak, kurumsal web sitesi tasarımından e-ticaret altyapılarına ve ölçeklenebilir backend sistemlerine kadar uçtan uca çözümler üretiyorum. Amacım, Nazilli ve Aydın\'daki yerel işletmelerin iş gereksinimlerini yüksek performanslı, mobil uyumlu ve SEO uyumlu web sitelerine dönüştürmektir.',
            'about_text_en' => 'I am a Full-Stack Web Developer providing website design and custom software solutions for businesses in Nazilli and Aydın, Turkey. Specialized in Java Spring Boot and React, I deliver end-to-end solutions ranging from corporate website design to e-commerce platforms and scalable backend systems. My mission is to turn the needs of local businesses in Nazilli and Aydın into high-performance, mobile-friendly and SEO-friendly websites.',
            'cv_file_tr' => 'settings/Halil_Ibrahim_Kocoglu_TR.pdf',
            'cv_file_en' => 'settings/Halil_Ibrahim_Kocoglu_EN.pdf',
            'email' => 'halilkocoglu98@gmail.com',
            'phone' => '+90 533 947 52 17',
            'github_url' => 'https://github.com/halilkocoglu',
            'linkedin_url' => 'https://www.linkedin.com/in/halilkocoglu/',
            'twitter_url' => null,
            'og_image' => 'settings/postpicture.webp',
            'hero_title_tr' => 'Halil İbrahim Koçoğlu',
            'hero_title_en' => 'Halil İbrahim Koçoğlu',
            'hero_subtitle_tr' => 'Nazilli ve Aydın\'daki işletmeler için modern, hızlı ve SEO uyumlu web sitesi tasarımı; React ve Spring Boot ile özel yazılım çözümleri sunuyorum.',
            'hero_subtitle_en' => 'I design modern, fast and SEO-friendly websites for businesses in Nazilli and Aydın, plus custom software solutions using React and Spring Boot.',

            // Hizmetler sayfası (TR)
            'services_title_tr' => 'Nazilli Web Sitesi Hizmetleri',
            'services_subtitle_tr' => 'Nazilli ve Aydın\'daki İşletmeler İçin Web Sitesi Tasarımı & Geliştirme',
            'services_intro_tr' => 'Nazilli ve Aydın bölgesinde işletmenizin dijitalde güçlü bir şekilde yer almasını sağlıyorum. Kurumsal web sitesi, e-ticaret altyapısı ve özel yazılım projelerinde modern teknolojiler ve SEO odaklı yaklaşımla hızlı, güvenilir sonuçlar sunuyorum.',
            'services_packages_title_tr' => 'Hizmet Paketlerim',
            'services_packages_tr' => json_encode([
                [
                    'title' => 'Kurumsal Web Sitesi',
                    'desc' => 'Nazilli ve Aydın\'daki işletmeler için modern, mobil uyumlu ve SEO uyumlu kurumsal web sitesi tasarımı.',
                    'features' => [
                        'Mobil uyumlu, hızlı yüklenen modern tasarım',
                        'Google\'da yerel aramalarda öne çıkmak için temel SEO kurulumu',
                        'İletişim formu, harita ve sosyal medya entegrasyonu',
                        'İçerik yönetim paneli ile kolay güncelleme',
                    ],
                ],
                [
                    'title' => 'E-Ticaret Sitesi',
                    'desc' => 'Ürünlerinizi online satışa hazırlayan, ödeme ve kargo entegrasyonlu e-ticaret web sitesi çözümleri.',
                    'features' => [
                        'Ürün, kategori ve stok yönetimi',
                        'Online ödeme altyapısı entegrasyonu',
                        'Hızlı, güvenli ve ölçeklenebilir altyapı',
                        'Sipariş takibi ve müşteri paneli',
                    ],
                ],
                [
                    'title' => 'Özel Yazılım & Web Uygulaması',
                    'desc' => 'İşletmenize özel web uygulamaları, otomasyon panelleri ve entegrasyonlar geliştiriyorum.',
                    'features' => [
                        'İhtiyaca özel analiz ve mimari tasarım',
                        'React ve Spring Boot ile ölçeklenebilir geliştirme',
                        'Mevcut sistemlerle (CRM, ERP vb.) entegrasyon',
                        'Bakım ve teknik destek',
                    ],
                ],
            ], JSON_UNESCAPED_UNICODE),
            'services_why_title_tr' => 'Neden Nazilli ve Aydın\'daki İşletmeler Beni Seçiyor?',
            'services_why_items_tr' => json_encode([
                ['title' => 'Yerel Bilgi, Yüz Yüze İletişim', 'desc' => 'Nazilli ve Aydın\'da yaşıyorum; isteğinize göre yüz yüze görüşme ve hızlı destek sağlıyorum.'],
                ['title' => 'SEO Odaklı Geliştirme', 'desc' => 'Web siteniz sadece güzel görünmekle kalmaz, Google aramalarında da öne çıkar.'],
                ['title' => 'Modern ve Hızlı Teknolojiler', 'desc' => 'Laravel, React ve Spring Boot gibi güncel teknolojilerle hızlı ve güvenilir web siteleri geliştiriyorum.'],
                ['title' => 'Şeffaf Fiyatlandırma', 'desc' => 'İhtiyacınıza özel teklif hazırlıyorum, gizli ücret veya sürpriz maliyet yok.'],
            ], JSON_UNESCAPED_UNICODE),
            'services_faq_title_tr' => 'Sıkça Sorulan Sorular',
            'services_faq_items_tr' => json_encode([
                ['q' => 'Nazilli\'de web sitesi yaptırmak ne kadar sürer?', 'a' => 'Kurumsal bir web sitesi genellikle 1-3 hafta içinde, e-ticaret ve özel yazılım projeleri kapsamına göre 3-8 hafta içinde tamamlanır.'],
                ['q' => 'Web sitesi fiyatları nasıl belirleniyor?', 'a' => 'Fiyat; sayfa sayısı, tasarım karmaşıklığı, e-ticaret veya özel yazılım gereksinimlerine göre değişir. İletişim sayfasından bilgi vererek ücretsiz teklif alabilirsiniz.'],
                ['q' => 'Hazır şablon mu yoksa özel tasarım mı kullanıyorsunuz?', 'a' => 'İşletmenize özel, sıfırdan tasarlanmış ve kodlanmış web siteleri geliştiriyorum. Bu sayede marka kimliğinize tam uyumlu, hızlı ve SEO uyumlu bir sonuç elde edersiniz.'],
                ['q' => 'Nazilli ve Aydın dışında da hizmet veriyor musunuz?', 'a' => 'Evet, uzaktan çalışarak Türkiye\'nin her yerinden müşterilere hizmet veriyorum. Ancak Nazilli ve Aydın bölgesindeki işletmelere yüz yüze görüşme imkânı da sunuyorum.'],
            ], JSON_UNESCAPED_UNICODE),
            'services_cta_title_tr' => 'Nazilli\'de Web Sitenizi Birlikte Yapalım',
            'services_cta_subtitle_tr' => 'Projeniz için ücretsiz teklif almak üzere hemen iletişime geçin.',
            'services_cta_button_tr' => 'Teklif Al',

            // Hizmetler sayfası (EN)
            'services_title_en' => 'Website Services in Nazilli',
            'services_subtitle_en' => 'Website Design & Development for Businesses in Nazilli & Aydın',
            'services_intro_en' => 'I help businesses in Nazilli and Aydın build a strong digital presence. From corporate websites to e-commerce platforms and custom software projects, I deliver fast, reliable results using modern technologies and an SEO-first approach.',
            'services_packages_title_en' => 'My Service Packages',
            'services_packages_en' => json_encode([
                [
                    'title' => 'Corporate Website',
                    'desc' => 'Modern, mobile-friendly and SEO-optimized corporate websites for businesses in Nazilli and Aydın.',
                    'features' => [
                        'Fast-loading, mobile-friendly modern design',
                        'On-page SEO setup to stand out in local search',
                        'Contact form, map and social media integration',
                        'Easy-to-use content management panel',
                    ],
                ],
                [
                    'title' => 'E-Commerce Website',
                    'desc' => 'E-commerce solutions with payment and shipping integrations to get your products selling online.',
                    'features' => [
                        'Product, category and stock management',
                        'Online payment gateway integration',
                        'Fast, secure and scalable infrastructure',
                        'Order tracking and customer dashboard',
                    ],
                ],
                [
                    'title' => 'Custom Software & Web Apps',
                    'desc' => 'Custom web applications, automation dashboards and integrations tailored to your business.',
                    'features' => [
                        'Requirements analysis and architecture design',
                        'Scalable development with React and Spring Boot',
                        'Integration with existing systems (CRM, ERP, etc.)',
                        'Ongoing maintenance and technical support',
                    ],
                ],
            ], JSON_UNESCAPED_UNICODE),
            'services_why_title_en' => 'Why Businesses in Nazilli & Aydın Choose Me',
            'services_why_items_en' => json_encode([
                ['title' => 'Local Knowledge, Face-to-Face Support', 'desc' => 'I live in Nazilli, Aydın and offer in-person meetings and fast support on request.'],
                ['title' => 'SEO-Driven Development', 'desc' => 'Your website won\'t just look great — it will be built to rank in Google search.'],
                ['title' => 'Modern, Fast Technologies', 'desc' => 'I build fast, reliable websites with up-to-date technologies like Laravel, React and Spring Boot.'],
                ['title' => 'Transparent Pricing', 'desc' => 'I prepare a tailored quote for your needs — no hidden fees or surprise costs.'],
            ], JSON_UNESCAPED_UNICODE),
            'services_faq_title_en' => 'Frequently Asked Questions',
            'services_faq_items_en' => json_encode([
                ['q' => 'How long does it take to build a website in Nazilli?', 'a' => 'A corporate website usually takes 1-3 weeks, while e-commerce or custom software projects take 3-8 weeks depending on scope.'],
                ['q' => 'How is website pricing determined?', 'a' => 'Pricing depends on the number of pages, design complexity, and e-commerce or custom software requirements. Contact me for a free quote.'],
                ['q' => 'Do you use templates or custom designs?', 'a' => 'I build websites from scratch, tailored to your business — giving you a result that matches your brand, loads fast and is SEO-friendly.'],
                ['q' => 'Do you work with businesses outside Nazilli and Aydın?', 'a' => 'Yes, I work remotely with clients across Turkey, while also offering in-person meetings for businesses in the Nazilli and Aydın region.'],
            ], JSON_UNESCAPED_UNICODE),
            'services_cta_title_en' => 'Let\'s Build Your Website in Nazilli',
            'services_cta_subtitle_en' => 'Get in touch now for a free quote for your project.',
            'services_cta_button_en' => 'Get a Quote',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
