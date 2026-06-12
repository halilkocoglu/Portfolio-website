<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        BlogPost::updateOrCreate(
            ['slug' => 'merhaba-dunya'],
            [
                'title_tr' => 'Merhaba Dünya',
                'title_en' => 'Hello World',
                'content_tr' => '<p>Portföy sitemin Laravel ve Filament altyapısına taşınmasıyla birlikte blog bölümü de aktif hale geldi. Burada yazılım geliştirme deneyimlerimi ve teknik notlarımı paylaşacağım.</p>',
                'content_en' => '<p>With the migration of my portfolio to Laravel and Filament, the blog section is now live. Here I will share my software development experiences and technical notes.</p>',
                'excerpt_tr' => 'Portföy sitem Laravel + Filament altyapısına taşındı. Blog yazılarım burada yer alacak.',
                'excerpt_en' => 'My portfolio has been migrated to Laravel + Filament. My blog posts will live here.',
                'image' => null,
                'published_at' => now(),
                'is_active' => true,
            ]
        );
    }
}
