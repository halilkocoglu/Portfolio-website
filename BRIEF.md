# 📋 Proje Brief — Kişisel Portföy Sitesi + Admin Panel

> Bu dosya, Laravel + Filament tabanlı, **Full Stack Web Geliştirici Halil İbrahim Koçoğlu'nun
> kişisel portföy sitesi** için hazırlanmıştır. Mevcut React + Vite sitesinin Laravel + Blade + Filament
> altyapısına taşınmasını kapsar.
>
> Tech stack, deploy akışı ve güvenlik kontrolleri; daha önce geliştirilen **inşaat/dekorasyon firması
> template'inden** birebir alınmıştır. Bu brief yalnızca portföy sitesine özgü farkları ve ek gereksinimleri
> tanımlar.

---

## 🎯 Proje Amacı

Halil İbrahim Koçoğlu'nun kişisel portföy sitesi. Hedef kitle: iş fırsatı arayan işverenler,
potansiyel müşteriler ve diğer geliştiriciler.

Temel kullanım senaryoları:
- **Proje portföyü**: Geliştirilen projelerin kategori/teknoloji bazlı listelenmesi, detay sayfaları
  (açıklama, tech stack, canlı demo / GitHub linkleri, görseller).
- **Deneyim / CV**: İş deneyimleri zaman çizelgesi, indirilebilir CV (PDF).
- **Yetenekler**: Teknoloji/araç listesi kategorilere göre (Frontend, Backend, DevOps, Araçlar vb.).
- **Blog**: Teknik yazılar, notlar, deneyim paylaşımları.
- **İletişim**: Basit iletişim formu (teklif/mesaj), sosyal medya linkleri.
- **TR/EN dil desteği**: Tüm public sayfalar iki dilde, admin paneli yalnızca Türkçe.

---

## 🧱 Kullanılan Teknolojiler

> ⚠️ İnşaat template'iyle **birebir aynı** — değiştirme.

| Katman | Teknoloji | Versiyon |
|---|---|---|
| Backend | Laravel | **12.x** |
| Admin Panel | Filament | **3.3.x** |
| Frontend | Blade + Tailwind CSS | — |
| Veritabanı | MySQL | Lokal + cPanel'de |
| Fotoğraf | Laravel Storage (local) | — |
| Deploy Hedefi | Reseller cPanel Hosting | — |
| PHP | PHP | **8.3** |

> ⚠️ Laravel 13 Filament 3.x ile uyumsuz. Laravel 12 kullanılıyor.

---

## 🌐 Dil (i18n) Mimarisi

Admin paneli yalnızca **Türkçe** (`APP_LOCALE=tr`).

Public sitede **TR / EN** desteği:

- `app()->getLocale()` ile aktif dil belirlenir.
- URL prefix'i: `/` → TR (varsayılan), `/en/` → EN.
  - `LocaleMiddleware` ile `{locale}` parametresi `App::setLocale()` çağrısına iletilir.
- İçerik çevirileri iki katmanda tutulur:
  1. **Statik metinler** (menü, buton, etiket vb.): `lang/tr/*.php` ve `lang/en/*.php`.
  2. **Dinamik içerik** (proje başlığı, deneyim açıklaması vb.): modelde `_tr` / `_en` kolon çifti
     (ör. `title_tr`, `title_en`). Admin panelde her alan için iki input; public sitede
     `$model->title` accessor'ı aktif locale'e göre doğru kolonu döner.

```php
// Örnek accessor (Project modeli)
public function getTitleAttribute(): string
{
    $locale = app()->getLocale();
    return $locale === 'en' && $this->title_en
        ? $this->title_en
        : $this->title_tr;
}
```

- Dil seçici: navbar'da TR / EN toggle (Alpine.js ile, `<a href="{{ route('locale.switch', 'en') }}">` vb.).
- `hreflang` meta etiketleri her sayfada otomatik eklenir (SEO).

---

## 📁 Proje Yapısı

```
portfolio/
├── app/
│   ├── Models/
│   │   ├── Project.php           # Proje (portföy öğesi)
│   │   ├── Experience.php        # İş deneyimi
│   │   ├── Skill.php             # Yetenek / teknoloji
│   │   ├── BlogPost.php          # Blog yazısı
│   │   ├── Message.php           # İletişim mesajı
│   │   └── Setting.php           # Site ayarları (key-value)
│   ├── Filament/
│   │   └── Resources/
│   └── Http/
│       ├── Middleware/
│       │   └── SetLocale.php     # URL prefix'ten locale set eder
│       └── Controllers/
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── SettingSeeder.php
│       ├── ProjectSeeder.php
│       ├── ExperienceSeeder.php
│       ├── SkillSeeder.php
│       └── BlogPostSeeder.php
├── lang/
│   ├── tr/
│   │   └── site.php              # Statik TR metinler
│   └── en/
│       └── site.php              # Statik EN metinler
├── resources/
│   ├── css/app.css
│   └── views/
│       ├── layouts/app.blade.php
│       └── pages/
│           ├── home.blade.php
│           ├── projects/
│           │   ├── index.blade.php
│           │   └── show.blade.php
│           ├── experience.blade.php
│           ├── skills.blade.php
│           ├── blog/
│           │   ├── index.blade.php
│           │   └── show.blade.php
│           └── contact.blade.php
│       └── partials/
└── public/
    ├── images/
    │   ├── profile.webp
    │   └── og-image.webp
    └── 404.html
```

---

## 🗃️ Veritabanı Şeması

### `projects` — Proje Portföyü

```
id
title_tr, title_en
slug                          # otomatik üretilir (title_tr'den)
description_tr, description_en
tech_stack                    # JSON array: ["Laravel", "Vue", "MySQL"]
category                      # enum: web | mobile | api | other
live_url                      # nullable
github_url                    # nullable
image                         # kapak görseli (storage path)
is_featured                   # anasayfada öne çıkan
is_active
sort_order
created_at, updated_at
```

### `experiences` — İş Deneyimi

```
id
company
role_tr, role_en
description_tr, description_en
start_date
end_date                      # nullable (hâlâ devam ediyorsa)
is_current                    # boolean
sort_order
created_at, updated_at
```

### `skills` — Yetenekler

```
id
name                          # teknoloji adı (tek dil yeterli: "Laravel", "React" vb.)
category                      # enum: frontend | backend | devops | tool | other
icon                          # SVG/PNG (storage path) veya ikon adı (opsiyonel)
level                         # nullable int 1-5 (gösterilip gösterilmeyeceği opsiyonel)
sort_order
is_active
created_at, updated_at
```

### `blog_posts` — Blog Yazıları

```
id
title_tr, title_en
slug
content_tr, content_en        # RichEditor (HTML, sanitize edilecek)
excerpt_tr, excerpt_en
image
published_at
is_active
created_at, updated_at
```

### `messages` — İletişim Mesajları

```
id
name
email
phone                         # nullable
subject
message
is_read
created_at, updated_at
```

> İnşaat template'indeki `service_type`, `project_id`, `extra_fields`, `kvkk_consent` alanları
> bu projede **yok** — iletişim formu sadedir.

### `settings` — Site Ayarları (key-value)

```
id, key, value, created_at, updated_at
```

**Tanımlı Setting Key'leri:**

| Key | Açıklama |
|---|---|
| `site_title` | Site başlığı |
| `site_description_tr` | Meta description (TR) |
| `site_description_en` | Meta description (EN) |
| `profile_photo` | Profil fotoğrafı (storage path) |
| `about_text_tr` | Hakkımda metni (TR) |
| `about_text_en` | Hakkımda metni (EN) |
| `cv_file` | İndirilebilir CV (PDF, storage path) |
| `email` | E-posta |
| `phone` | Telefon (opsiyonel) |
| `github_url` | GitHub profil linki |
| `linkedin_url` | LinkedIn profil linki |
| `twitter_url` | Twitter/X profil linki (opsiyonel) |
| `og_image` | Varsayılan OG görseli |
| `hero_title_tr` | Hero başlık (TR) |
| `hero_title_en` | Hero başlık (EN) |
| `hero_subtitle_tr` | Hero alt başlık (TR) |
| `hero_subtitle_en` | Hero alt başlık (EN) |

---

## 🌐 Public Site Sayfaları

| Sayfa | URL (TR) | URL (EN) | Açıklama |
|---|---|---|---|
| Ana Sayfa | `/` | `/en/` | Hero, hakkımda özeti, öne çıkan projeler, yetenekler özeti, son blog yazıları, CTA |
| Projeler | `/projeler` | `/en/projects` | Kategori/teknoloji filtreli proje listesi |
| Proje Detay | `/projeler/{slug}` | `/en/projects/{slug}` | Görsel, açıklama, tech stack, demo/GitHub linkleri |
| Deneyim | `/deneyim` | `/en/experience` | İş deneyimi zaman çizelgesi + CV indirme |
| Yetenekler | `/yetenekler` | `/en/skills` | Kategorilere göre skill grid |
| Blog | `/blog` | `/en/blog` | Blog yazıları listesi |
| Blog Detay | `/blog/{slug}` | `/en/blog/{slug}` | Yazı detayı |
| İletişim | `/iletisim` | `/en/contact` | İletişim formu + sosyal linkler |
| Sitemap | `/sitemap.xml` | — | Dinamik, her iki dil URL'lerini içerir |
| Robots | `/robots.txt` | — | Dinamik |

### Anasayfa Bölümleri (sırasıyla)

1. **Hero** — profil fotoğrafı, isim, unvan (dinamik `setting`), kısa bio, CTA butonları (Projeleri Gör / CV İndir / İletişim).
2. **Öne Çıkan Projeler** — `is_featured=true` projeler, kart grid.
3. **Yetenekler Özeti** — kategori bazlı ikon/logo grid (tam liste `/yetenekler`'de).
4. **Son Blog Yazıları** — son 3 yazı.
5. **İletişime Geç CTA** — sosyal medya linkleri + form linki.

### Proje Detay Sayfası

- Kapak görseli (yoksa kategori bazlı degrade fallback).
- Açıklama (TR veya EN, locale'e göre).
- Tech stack rozet listesi (`tech_stack` JSON array'inden).
- Canlı demo butonu + GitHub butonu (URL varsa).
- Breadcrumb: Ana Sayfa → Projeler → Proje Adı.

---

## 🛠️ Admin Panel (Filament) Menüsü

```
├── 📊 Dashboard             → Toplam proje, okunmamış mesaj, toplam blog yazısı
├── 🗂️ Projeler              → Proje ekle/düzenle/sil (TR+EN alanlar, tech stack, linkler, görsel, öne çıkan/aktif/sıra)
├── 💼 Deneyimler            → Deneyim ekle/düzenle/sil (şirket, rol TR+EN, tarih, devam ediyor)
├── ⚡ Yetenekler            → Yetenek ekle/düzenle/sil (ad, kategori, ikon, sıra, aktif)
├── 📝 Blog                  → Blog yazısı ekle/düzenle/sil (TR+EN başlık/içerik/özet, görsel, yayın tarihi)
├── 📩 Mesajlar              → İletişim formu gelen kutusu (salt okunur, okunmamış rozeti)
└── ⚙️ Site Ayarları         → Profil fotoğrafı, CV, hakkımda, hero, sosyal linkler, SEO
```

- Admin paneli tamamen **Türkçe**.
- `slug` alanı gizli, `title_tr`'den otomatik üretilir.
- Tüm `FileUpload` alanlarında SVG yasak (`jpeg/png/webp`).
- Yeni mesaj geldiğinde okunmamış rozeti (`QUEUE_CONNECTION=sync`).

---

## 🔍 SEO & JSON-LD

- **Meta etiketler**: title, description (locale'e göre TR/EN), canonical, robots.
- **hreflang**: her sayfada `<link rel="alternate" hreflang="tr">` + `<link rel="alternate" hreflang="en">`.
- **Open Graph + Twitter Card**: `og:title`, `og:description`, `og:image`.
- **JSON-LD**:
  - Anasayfa: `Person` şeması (isim, unvan, sosyal linkler).
  - Proje detay: `SoftwareSourceCode` veya `CreativeWork` şeması.
  - Blog detay: `BlogPosting` şeması.
- **Sitemap**: Dinamik — TR ve EN URL'lerinin tamamı dahil.
- **Robots**: Dinamik route.
- **404**: Statik Apache fallback (`public/404.html`).

### 🚀 Gelecek SEO Geliştirmeleri (opsiyonel)

- [ ] `BreadcrumbList` JSON-LD (proje/blog detay)
- [ ] `FAQPage` JSON-LD (opsiyonel bir SSS bölümü eklenirse)
- [ ] Google Analytics / GTM için `gtm_id` setting key'i

---

## 🔐 Güvenlik Kontrolleri

> ⚠️ İnşaat template'indeki güvenlik listesiyle **birebir aynı** — her deploy öncesi tek tek kontrol edilmeli.

### 🔴 Kritik

- [ ] `DatabaseSeeder.php` varsayılan admin içermiyor — production admin `tinker` ile güçlü şifreyle elle oluşturulur.
- [ ] `User` modeli `FilamentUser` kontratını uyguluyor, `canAccessPanel(): true`.
- [ ] Production `.env`: `APP_ENV=production`, `APP_DEBUG=false`, `LOG_LEVEL=error`.
- [ ] Blog içeriği `setContentAttribute()` mutator'ı ile sanitize ediliyor (`symfony/html-sanitizer`).
- [ ] `QUEUE_CONNECTION=sync`.

### 🟡 Orta Risk

- [ ] `/iletisim` POST route'unda `throttle:5,1` middleware.
- [ ] Tüm `FileUpload` alanlarında `->acceptedFileTypes(['image/jpeg','image/png','image/webp'])`.
- [ ] Her kurulumda farklı ve güçlü DB şifresi.

---

## 🚀 cPanel Deploy Adımları

> ⚠️ İnşaat template'indeki deploy akışıyla **birebir aynı** — aşağıdaki adımlar o brief'ten alınmıştır.

### A) Lokalde hazırlık

```bash
npm run build
composer install --no-dev --optimize-autoloader
php artisan key:generate --show
```

Zip: `.git/`, `node_modules/`, `.env` hariç; `vendor/` dahil.

### B) WHM → cPanel + Veritabanı

WHM'den cPanel hesabı, MySQL DB + kullanıcı, "All Privileges".

### C) Köprüleme (document root değiştirilemiyor)

Proje `/home/kullanici/portfolio-app/` altına kurulur. `public/` içeriği `public_html`'e kopyalanır.
`public_html/index.php`:

```php
require __DIR__.'/../portfolio-app/vendor/autoload.php';
(require_once __DIR__.'/../portfolio-app/bootstrap/app.php')
```

### D) `.env`

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.halilibrahimkocoglu.com.tr
LOG_LEVEL=error
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=GUCLU_SIFRE
QUEUE_CONNECTION=sync
```

### E) Storage symlink (terminalsiz)

`public_html/link.php`:

```php
<?php
$target = __DIR__.'/../portfolio-app/storage/app/public';
$link   = __DIR__.'/storage';
if (!file_exists($link)) { symlink($target, $link); echo 'Tamam.'; }
else { echo 'Zaten mevcut.'; }
```

Tarayıcıdan çalıştır, **hemen sil**.

### F) Veritabanı aktarımı

Lokal: `mysqldump --no-tablespaces` ile `.sql` al → cPanel phpMyAdmin → Import.

### G) Son kontroller

- [ ] Anasayfa açılıyor, görseller görünüyor
- [ ] `/en/` sayfası açılıyor, dil doğru
- [ ] `/admin` paneline giriş yapılıyor
- [ ] Undefined URL → şık 404, stack trace yok
- [ ] `APP_DEBUG=false` doğrulandı
- [ ] AutoSSL aktif, site `https://` ile açılıyor
- [ ] `app/`, `.env`, `vendor/` `public_html`'de yok
- [ ] `/sitemap.xml` TR + EN URL'lerini içeriyor
- [ ] `/iletisim` formundan gönderilen mesaj admin panelde görünüyor
- [ ] CV indirme linki çalışıyor

---

## 📌 Yeni Kurulum Checklist

1. Repo kur: `composer install`, `npm install`, `.env`, `php artisan key:generate`, `php artisan migrate`.
2. Seeder'ları düzenle (gerçek veriler) → `php artisan db:seed`.
3. `resources/css/app.css`'te `--color-primary` güncelle → `npm run build`.
4. `public/images/` altındaki placeholder'ları gerçek görsellerle değiştir.
5. Admin panelden proje/deneyim/skill/blog içeriklerini gir.
6. Güvenlik listesini doğrula.
7. Deploy adımlarını takip et.

---

## 🧰 Bilinen Kısıtlar

- `slug` model seviyesinde otomatik üretilir (`title_tr`'den) — Filament formlarına `live()` slug alanı ekleme.
- `DB_HOST=localhost` (cPanel'de TCP genelde kapalı, Unix socket kullan).
- `QUEUE_CONNECTION=sync` (reseller hosting'de worker çalıştırılamaz).
- FileUpload'da SVG kabul edilmez.
- Admin panel için tarih gösteriminde `'Europe/Istanbul'` saat dilimi belirtilmeli.
- TR accessor pattern'i: `title_en` boşsa `title_tr`'ye fallback yapılır.

---

## ✅ Implementation Log

> Her tamamlanan aşamadan sonra bu bölüm güncellenecek.

### Yapılacaklar

- [ ] Laravel 12 + Filament 3.3 proje kurulumu
- [ ] Migration'lar: `projects` → `experiences` → `skills` → `blog_posts` → `messages` → `settings`
- [ ] Modeller + TR/EN accessor'ları
- [ ] `SetLocale` middleware + route grubu
- [ ] Seeder'lar (demo verilerle)
- [ ] Filament Resources: Project, Experience, Skill, BlogPost, Message, SiteSettings
- [ ] Public site: layout (navbar dil toggle dahil), tüm sayfalar
- [ ] SEO: meta, hreflang, JSON-LD, sitemap (TR+EN), robots
- [ ] `public/404.html` statik fallback
- [ ] cPanel deploy + test
