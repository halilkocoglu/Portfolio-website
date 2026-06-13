import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('max-h-0');
            menu.classList.toggle('opacity-0');
            menu.classList.toggle('max-h-[400px]');
            menu.classList.toggle('opacity-100');
            menu.classList.toggle('mt-4');
        });
    }

    let lastScroll = 0;
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            header.classList.toggle('bg-white/80', scrolled);
            header.classList.toggle('backdrop-blur-xl', scrolled);
            header.classList.toggle('shadow-sm', scrolled);
            header.classList.toggle('shadow-slate-200/60', scrolled);
            header.classList.toggle('border-b', scrolled);
            header.classList.toggle('border-slate-200/50', scrolled);
            header.classList.toggle('py-3', scrolled);
            header.classList.toggle('bg-transparent', !scrolled);
            header.classList.toggle('py-5', !scrolled);
            lastScroll = window.scrollY;
        });
    }

    document.querySelectorAll('.project-gallery').forEach((gallery) => {
        const slides = gallery.querySelectorAll('.project-gallery-slide');
        const dots = gallery.querySelectorAll('.project-gallery-dot');
        let current = 0;

        const show = (index) => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle('hidden', i !== current));
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === current);
                dot.classList.toggle('bg-white/40', i !== current);
            });
        };

        gallery.querySelector('.project-gallery-prev')?.addEventListener('click', () => show(current - 1));
        gallery.querySelector('.project-gallery-next')?.addEventListener('click', () => show(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    });

    document.querySelectorAll('[data-copy]').forEach((el) => {
        el.addEventListener('click', () => {
            const value = el.getAttribute('data-copy');
            navigator.clipboard?.writeText(value);
            const badge = el.querySelector('[data-copy-icon]');
            if (badge) {
                badge.classList.add('text-emerald-500');
                setTimeout(() => badge.classList.remove('text-emerald-500'), 2000);
            }
        });
    });
});
