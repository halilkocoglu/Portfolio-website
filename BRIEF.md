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

> Proje dosyaları repo kökünde (root) yer alır — ayrı bir `portfolio/` alt klasörü yoktur.

```
.
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

### `project_images` — Proje Galeri Görselleri

```
id
project_id                    # FK -> projects, cascade delete
image                         # storage path
caption_tr, caption_en        # opsiyonel açıklama (görsel altında gösterilir)
sort_order
created_at, updated_at
```

> Proje detay sayfasında kapak görseli dışında ek galeri görselleri gösterir. Admin panelde
> proje formunun "Galeri" bölümünde `Repeater` ile yönetilir (sıralanabilir).

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
project_type                  # nullable, contact_project_types setting'inden seçilir
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
| `whatsapp_number` | WhatsApp numarası (ülke kodu ile, ör. `905XXXXXXXXX`) — floating buton, proje kartları ve proje detay CTA'sında kullanılır |
| `contact_project_types` | İletişim formu "Proje Türü" seçenekleri (JSON: `[{label_tr, label_en}]`, e-ticaret hariç) |
| `github_url` | GitHub profil linki |
| `linkedin_url` | LinkedIn profil linki |
| `twitter_url` | Twitter/X profil linki (opsiyonel) |
| `og_image` | Varsayılan OG görseli |
| `hero_title_tr` | Hero başlık (TR) |
| `hero_title_en` | Hero başlık (EN) |
| `hero_subtitle_tr` | Hero alt başlık (TR) |
| `hero_subtitle_en` | Hero alt başlık (EN) |
| `services_title_tr` / `_en` | Hizmetler sayfası başlığı |
| `services_subtitle_tr` / `_en` | Hizmetler sayfası alt başlığı |
| `services_intro_tr` / `_en` | Hizmetler sayfası giriş metni |
| `services_packages_title_tr` / `_en` | "Hizmet Paketlerim" bölüm başlığı |
| `services_packages_tr` / `_en` | Hizmet paketleri (JSON: title, desc, features[]) |
| `services_why_title_tr` / `_en` | "Neden Beni Seçmelisiniz" bölüm başlığı |
| `services_why_items_tr` / `_en` | Neden beni seçmelisiniz maddeleri (JSON: title, desc) |
| `services_faq_title_tr` / `_en` | SSS bölüm başlığı |
| `services_faq_items_tr` / `_en` | SSS maddeleri (JSON: q, a) — `FAQPage` JSON-LD için kullanılır |
| `services_cta_title_tr` / `_en` | Hizmetler sayfası CTA başlığı |
| `services_cta_subtitle_tr` / `_en` | Hizmetler sayfası CTA açıklaması |
| `services_cta_button_tr` / `_en` | Hizmetler sayfası CTA buton metni |

> `services_*` key'leri admin panelde **⚙️ Hizmetler Sayfası** üzerinden TR/EN olarak düzenlenebilir (paketler, "neden beni seçmelisiniz" ve SSS alanları Filament `Repeater` ile yönetilir, JSON olarak saklanır).

---

## 🌐 Public Site Sayfaları

| Sayfa | URL (TR) | URL (EN) | Açıklama |
|---|---|---|---|
| Ana Sayfa | `/` | `/en/` | Hero, hakkımda özeti, öne çıkan projeler, yetenekler özeti, son blog yazıları, CTA |
| Hizmetler | `/web-sitesi-hizmetleri` | `/en/website-services` | Nazilli/Aydın web sitesi hizmetleri: paketler, "neden beni seçmelisiniz", SSS, CTA — local SEO odaklı |
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
├── ⚙️ Site Ayarları         → Profil fotoğrafı, CV, hakkımda, hero, sosyal linkler, SEO
└── ⚙️ Hizmetler Sayfası     → /web-sitesi-hizmetleri içeriği: başlık/alt başlık/giriş, hizmet paketleri (repeater), "neden beni seçmelisiniz" (repeater), SSS (repeater), CTA — TR+EN
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
- **Local SEO (Nazilli/Aydın web sitesi satışı odaklı)**:
  - `geo.region` (`TR-09`), `geo.placename` (`Nazilli, Aydın`), `ICBM` meta etiketleri tüm sayfalarda (`layouts/app.blade.php`).
  - `site_title`, `site_description_tr/en`, `hero_subtitle_tr/en`, `about_text_tr/en` ve `meta.site_name` "Nazilli web sitesi / web tasarım" anahtar kelimelerine odaklı şekilde güncellendi.
  - Yeni **Hizmetler** sayfası (`/web-sitesi-hizmetleri`, `/en/website-services`) "Nazilli Web Sitesi Hizmetleri" anahtar kelimesine odaklı, paket/SSS/CTA içerikli landing page — admin panelden düzenlenebilir (bkz. `services_*` setting key'leri).
- **JSON-LD**:
  - Anasayfa: `Person` şeması (isim, unvan, sosyal linkler) + `ProfessionalService` şeması (adres: Nazilli/Aydın, `areaServed`, telefon, e-posta, `priceRange`).
  - Hizmetler sayfası: `FAQPage` şeması (`services_faq_items_tr/en`'den üretilir).
  - Proje detay: `SoftwareSourceCode` veya `CreativeWork` şeması.
  - Blog detay: `BlogPosting` şeması.
- **Sitemap**: Dinamik — TR ve EN URL'lerinin tamamı dahil (Hizmetler sayfası dahil).
- **Robots**: Dinamik route.
- **404**: Statik Apache fallback (`public/404.html`).

### 🚀 Gelecek SEO Geliştirmeleri (opsiyonel)

- [ ] `BreadcrumbList` JSON-LD (proje/blog detay)
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

### Tamamlananlar

- [x] **APP_URL düzeltmesi**: `.env`'de `APP_URL=http://localhost` idi, `php artisan serve` ise `http://127.0.0.1:8000`'de çalışıyordu. Bu uyuşmazlık Filament FileUpload alanlarının (Site Ayarları, Projeler, Blog vb.) önizleme/boyut hesaplama isteklerinin yanlış origin'e gitmesine ve sonsuz "Yükleniyor / Boyut hesaplanıyor" spinner'ına sebep oluyordu. `APP_URL=http://127.0.0.1:8000` olarak güncellendi. ⚠️ Production'da `APP_URL` mutlaka gerçek domain ile eşleşmeli (`https://www.halilibrahimkocoglu.com.tr`).
- [x] **Lokal veritabanı SQLite'tan MySQL'e geçirildi**: `portfolio` veritabanı ve `portfolio_user` kullanıcısı oluşturuldu, `.env` (`DB_CONNECTION=mysql`, `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_DATABASE=portfolio`, `DB_USERNAME=portfolio_user`, `DB_PASSWORD=sifre123`) güncellendi, `php artisan migrate:fresh --seed` çalıştırıldı.
- [x] **Admin kullanıcısı oluşturuldu**: `tinker` ile `admin@test.com` / `admin123!` (DatabaseSeeder'da admin yok, güvenlik kontrolüne uygun — production'da farklı/güçlü bilgilerle elle oluşturulmalı).
- [x] **Eski React + Vite projesi kaldırıldı**: Repo kökündeki eski React kaynak kodu (`src/`, `public/`, `index.html`, `dist/`, `vite.config.js`, `tailwind.config.cjs`, `postcss.config.cjs`, `eslint.config.js`, eski `package.json`/`package-lock.json`, `README.md`, `LICENSE`, `.gitignore`) silindi. Görseller ve PDF'ler zaten `storage/app/public/` altına taşınmış durumdaydı; eksik olan favicon varyantları (`favicon.png`, `favicon-apple.png`, `favicon.webp`) ve `projectplaceholderimage.webp` `public/` klasörüne kopyalandı.
- [x] **`portfolio/` alt klasörü repo köküne taşındı**: Laravel projesi artık `portfolio/` alt klasöründe değil, doğrudan repo kökünde. `portfolio/` klasörü silindi.
- [x] **Admin şifresi güncellendi**: Mevcut admin kullanıcısının (`halilkocoglu98@gmail.com`) şifresi `admin123!` olarak ayarlandı (geçici — production öncesi güçlü bir şifreyle değiştirilmeli).
- [x] **Storage symlink düzeltildi**: `portfolio/` → root taşıması sonrası `public/storage` eski (`portfolio/storage/app/public`) yolu işaret ediyordu ve görseller kayboluyordu. `php artisan storage:link` ile yeniden oluşturuldu, artık `storage/app/public`'e doğru bağlanıyor.
- [x] **SEO, Nazilli/Aydın web sitesi satışına odaklandı**: `site_title`, `site_description_tr/en`, `hero_subtitle_tr/en`, `about_text_tr/en` ve `meta.site_name` "Nazilli web sitesi / web tasarım" anahtar kelimelerine göre yeniden yazıldı; anasayfaya `ProfessionalService` JSON-LD (adres Nazilli/Aydın, `areaServed`, telefon/e-posta, `priceRange`) ve tüm sayfalara `geo.region` / `geo.placename` / `ICBM` meta etiketleri eklendi.
- [x] **Yeni "Hizmetler" sayfası eklendi**: `/web-sitesi-hizmetleri` (TR) ve `/en/website-services` (EN) — `ServiceController`, `pages/services.blade.php`, navbar linki ve sitemap girişi eklendi. Sayfada hizmet paketleri, "neden beni seçmelisiniz" ve SSS (`FAQPage` JSON-LD) bölümleri var.
- [x] **Hizmetler sayfası admin panelden düzenlenebilir hale getirildi**: Tüm içerik (`services_*` key'leri — başlıklar, paketler, "neden beni seçmelisiniz", SSS, CTA, TR+EN) `settings` tablosunda JSON olarak saklanıyor; yeni Filament sayfası **⚙️ Hizmetler Sayfası** (`app/Filament/Pages/ServicesSettings.php`) üzerinden repeater alanlarıyla yönetiliyor. Eski statik `lang/*/site.php` içindeki `services` blokları kaldırıldı.
- [x] **WhatsApp iletişimi eklendi**:
  - Yeni `whatsapp_number` setting key'i (`SettingSeeder`'a ve `settings` tablosuna eklendi, admin panelden **⚙️ Site Ayarları → İletişim & Sosyal Medya** bölümünden düzenlenebilir).
  - `whatsapp_url(?string $message = null)` helper'ı (`app/Support/helpers.php`) numarayı sanitize edip wa.me linki üretiyor, mesaj varsa URL-encode ediyor.
  - `<x-icons.whatsapp>` ikon bileşeni eklendi (`resources/views/components/icons/whatsapp.blade.php`).
  - Sitenin tüm sayfalarında sağ altta floating WhatsApp butonu (`resources/views/partials/whatsapp-float.blade.php`, `layouts/app.blade.php`'e dahil edildi) — genel bilgi mesajı (`site.whatsapp.float_message`) ile açılıyor.
  - Proje kartlarında (`partials/project-card.blade.php`) GitHub butonunun yanına WhatsApp ikon butonu eklendi — proje adını içeren otomatik mesajla (`site.whatsapp.project_message`) açılıyor.
  - Proje detay sayfasında (`pages/projects/show.blade.php`) "Benzer Bir Proje mi İstiyorsunuz?" başlıklı WhatsApp CTA bölümü eklendi.
  - TR/EN `lang/*/site.php` dosyalarına `whatsapp` çeviri bloğu eklendi (`label`, `float_message`, `project_message`, `cta_title`, `cta_subtitle`, `cta_button`).
- [x] **İletişim formuna "Proje Türü" alanı eklendi**:
  - `messages` tablosuna nullable `project_type` kolonu eklendi (migration `2026_06_13_000000_add_project_type_to_messages_table`), `Message` modelinin `fillable`'ına eklendi.
  - Yeni `contact_project_types` setting key'i — JSON array (`[{label_tr, label_en}, ...]`), admin panelde **⚙️ Site Ayarları → İletişim Formu** bölümünden Filament `Repeater` ile yönetiliyor (e-ticaret hariç; varsayılan: Kurumsal Web Sitesi, Mobil Uygulama, Web Uygulaması, Diğer).
  - `ContactController`: `projectTypes()` aktif locale'e göre etiketleri döner, `/iletisim` formunda `project_type` `select` alanı olarak gösterilir (opsiyonel), `store()` içinde `in:` kuralıyla doğrulanır.
  - `/iletisim` ve `/en/contact` sayfalarında "Proje Türü" `select` alanı eklendi (`pages/contact.blade.php`), `lang/*/site.php`'ye `contact.project_type` / `contact.project_type_placeholder` çevirileri eklendi.
  - Admin panel **📩 Mesajlar** bölümünde (`MessageResource`) tablo ve detay formuna salt okunur "Proje Türü" kolonu/alanı eklendi (badge olarak gösteriliyor).

- [x] **Laravel 12 + Filament 3.3 proje kurulumu, migration'lar, modeller, middleware, seeder'lar, Filament Resources, public site (layout + tüm sayfalar) ve SEO (meta, hreflang, JSON-LD, sitemap, robots) tamamlandı.** (Detaylar yukarıdaki maddelerde.)

- [x] **Proje detay galerisi eklendi**: Yeni `project_images` tablosu (migration `2026_06_13_000001_create_project_images_table`) ve `ProjectImage` modeli (`caption_tr`/`caption_en` ile `HasLocaleFields`). `Project::images()` ilişkisi (`sort_order`'a göre).
- [x] **Kapak görseli galeriden seçiliyor**: Ayrı "Kapak Görseli" yükleme alanı kaldırıldı. Admin panelde **🗂️ Projeler** formunda tek bir "Görseller" `Repeater`'ı var — birden fazla görsel yüklenebilir, her birine isteğe bağlı başlık ve açıklama eklenebilir, ok butonlarıyla sıralanabilir. Her görselde **"Kapak Görseli Olarak Kullan"** toggle'ı var (`project_images.is_cover`, tek seçim — biri işaretlenince diğerleri otomatik kapanır). `Project::cover_image` accessor önce `is_cover=true` görseli, yoksa ilk sıradaki görseli, galeri boşsa eski `image` kolonunu (geriye dönük uyumluluk) döner. Mobil önizleme görseli (`mobile_image`) ayrı ve tek görsel olarak kalır. Proje kartları (`project-card.blade.php`), anasayfa öne çıkan projeler ve admin tablo kolonu `cover_image`'i kullanır.
- [x] **Galeri görsellerine başlık alanı eklendi**: `project_images` tablosuna `title_tr`/`title_en` kolonları eklendi (migration `2026_06_13_000002_add_title_and_cover_to_project_images_table`), `ProjectImage` modelinde `title` accessor (`HasLocaleFields`). Admin panelde her galeri görseli için açıklamanın üstünde başlık (TR/EN) alanı var.
- [x] **Proje detay sayfasında galeri carousel'i**: `pages/projects/show.blade.php`'de kapak görseli yerine tüm galeri görsellerini gösteren, sağ/sol ok butonları ve nokta göstergeleriyle gezilebilen bir carousel (`resources/js/app.js` — `.project-gallery` vanilla JS). Her görselin altında varsa başlığı (kalın) ve açıklaması gösteriliyor. Galeri boşsa eski `cover_image`'e (tekil görsel) fallback yapılıyor.

### Yapılacaklar

- [ ] `public/404.html` statik fallback
- [ ] cPanel deploy + test
