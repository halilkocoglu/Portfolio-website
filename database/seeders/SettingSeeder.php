<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_title' => 'Halil İbrahim Koçoğlu — Full Stack Web Geliştirici',
            'site_description_tr' => 'Java Spring Boot ve React teknolojilerinde uzmanlaşmış, Nazilli ve Aydın çevresinde profesyonel dijital hizmetler sunan bir Full-Stack Web Geliştiricisiyim.',
            'site_description_en' => 'I am a Full-Stack Web Developer specialized in Java Spring Boot and React, providing professional digital services in the Nazilli and Aydın regions.',
            'profile_photo' => 'settings/profilepicture.webp',
            'about_text_tr' => 'Java Spring Boot ve React teknolojilerinde uzmanlaşmış, Nazilli ve Aydın çevresinde profesyonel dijital hizmetler sunan bir Full-Stack Web Geliştiricisiyim. Sadece kod yazmakla kalmıyor, kurumsal web sitesi tasarımından ölçeklenebilir backend sistemlerine kadar uçtan uca çözümler üretiyorum. Amacım, yerel işletmelerin ve küresel markaların iş gereksinimlerini yüksek performanslı ve SEO uyumlu dijital deneyimlere dönüştürmektir.',
            'about_text_en' => 'I am a Full-Stack Web Developer specialized in Java Spring Boot and React, providing professional digital services in the Nazilli and Aydın regions. Beyond writing code, I deliver end-to-end solutions ranging from corporate website design to scalable backend systems. My mission is to transform the business requirements of local and global brands into high-performance, SEO-friendly digital experiences.',
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
            'hero_subtitle_tr' => 'Modern teknolojilerle yüksek performanslı web uygulamaları ve ihtiyaca özel kurumsal web sitesi çözümleri sunuyorum.',
            'hero_subtitle_en' => 'I build high-performance web applications and custom corporate websites using modern technologies like React and Spring Boot.',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
