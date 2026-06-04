# Halil İbrahim Koçoğlu — Kişisel Portföy Web Sitesi

Nazilli / Aydın merkezli Full Stack Web Geliştirici **Halil İbrahim Koçoğlu**'nun kişisel portföy sitesi.

**Canlı Site:** [halilibrahimkocoglu.com.tr](https://www.halilibrahimkocoglu.com.tr)

---

## Özellikler

- TR / EN dil desteği
- Tamamen duyarlı (responsive) tasarım
- Lazy load + Intersection Observer animasyonları
- Schema.org yapılandırılmış veri (Person + ProfessionalService)
- Open Graph & Twitter Card meta tagları
- LCP görseli için `preload` optimizasyonu
- Özel 404 sayfası

## Teknolojiler

| Katman  | Teknoloji                                      |
| ------- | ---------------------------------------------- |
| UI      | React 18, Tailwind CSS, Radix UI, Lucide React |
| Build   | Vite                                           |
| Hosting | cPanel / Apache (.htaccess)                    |

## Kurulum

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Çıktı `dist/` klasörüne yazılır.

## Demolar

Netlify üzerinde yayınlanan örnek demo projeler:

| Proje | Canlı Demo |
| ----- | ---------- |
| Sağlıklı Yaşam | [saglikli-yasam-demo.netlify.app](https://saglikli-yasam-demo.netlify.app) |
| Genç Data | [genc-data-demo.netlify.app](https://genc-data-demo.netlify.app) |

## Proje Yapısı

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ErrorPage.jsx
│   └── ui/          # button, toast, toaster
├── assets/          # SVG ikonlar
├── lib/
├── App.jsx
├── main.jsx
└── index.css
public/
├── profilepicture.webp
├── postpicture.webp
├── robots.txt
├── sitemap.xml
└── .htaccess
```

## İletişim

- GitHub: [github.com/halilkocoglu](https://github.com/halilkocoglu)
- LinkedIn: [linkedin.com/in/halilkocoglu](https://www.linkedin.com/in/halilkocoglu/)
- E-posta: [halilkocoglu98@gmail.com](mailto:halilkocoglu98@gmail.com)
