@extends('layouts.app')

@php
    $title = \App\Models\Setting::get(app()->getLocale() === 'en' ? 'hero_title_en' : 'hero_title_tr') . ' — ' . __('site.hero.badge');
    $description = \App\Models\Setting::get(app()->getLocale() === 'en' ? 'site_description_en' : 'site_description_tr');
    $hreflang = [
        'tr' => route('home'),
        'en' => route('home.en'),
        'x-default' => route('home'),
    ];

    $categoryColors = [
        'frontend' => ['icon' => 'bg-violet-100 text-violet-700 border-violet-200/60', 'tag' => 'bg-violet-50 text-violet-700 border-violet-200/50'],
        'backend' => ['icon' => 'bg-pink-100 text-pink-700 border-pink-200/60', 'tag' => 'bg-pink-50 text-pink-700 border-pink-200/50'],
        'devops' => ['icon' => 'bg-sky-100 text-sky-700 border-sky-200/60', 'tag' => 'bg-sky-50 text-sky-700 border-sky-200/50'],
        'database' => ['icon' => 'bg-emerald-100 text-emerald-700 border-emerald-200/60', 'tag' => 'bg-emerald-50 text-emerald-700 border-emerald-200/50'],
        'design' => ['icon' => 'bg-amber-100 text-amber-700 border-amber-200/60', 'tag' => 'bg-amber-50 text-amber-700 border-amber-200/50'],
        'tool' => ['icon' => 'bg-violet-100 text-violet-700 border-violet-200/60', 'tag' => 'bg-violet-50 text-violet-700 border-violet-200/50'],
        'other' => ['icon' => 'bg-slate-100 text-slate-700 border-slate-200/60', 'tag' => 'bg-slate-50 text-slate-700 border-slate-200/50'],
    ];
@endphp

@push('head')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'Person',
    'name' => 'Halil İbrahim Koçoğlu',
    'jobTitle' => __('site.hero.badge'),
    'url' => route('home'),
    'email' => 'mailto:' . \App\Models\Setting::get('email'),
    'sameAs' => array_values(array_filter([
        \App\Models\Setting::get('github_url'),
        \App\Models\Setting::get('linkedin_url'),
    ])),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
</script>
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'ProfessionalService',
    'name' => 'Halil İbrahim Koçoğlu — Web Sitesi Tasarımı',
    'image' => $ogImage = \App\Models\Setting::get('og_image') ? \Illuminate\Support\Facades\Storage::url(\App\Models\Setting::get('og_image')) : null,
    'url' => route('home'),
    'telephone' => \App\Models\Setting::get('phone'),
    'email' => \App\Models\Setting::get('email'),
    'priceRange' => '$$',
    'address' => [
        '@type' => 'PostalAddress',
        'addressLocality' => 'Nazilli',
        'addressRegion' => 'Aydın',
        'addressCountry' => 'TR',
    ],
    'areaServed' => [
        ['@type' => 'City', 'name' => 'Nazilli'],
        ['@type' => 'AdministrativeArea', 'name' => 'Aydın'],
    ],
    'sameAs' => array_values(array_filter([
        \App\Models\Setting::get('github_url'),
        \App\Models\Setting::get('linkedin_url'),
    ])),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
</script>
@endpush

@section('content')

{{-- Hero --}}
<section id="hero" class="min-h-screen flex items-center justify-center px-1 sm:px-4 pt-20 overflow-hidden relative">
    <div class="absolute inset-0 pointer-events-none opacity-40" style="background-image: radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-400/15 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-400/12 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto max-w-7xl relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200/60">
                    <span class="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></span>
                    <span class="text-violet-700 text-sm font-semibold">{{ __('site.hero.badge') }}</span>
                </div>

                <div>
                    <p class="text-slate-500 text-base font-medium mb-1">{{ __('site.hero.greeting') }}</p>
                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                        <span class="block text-slate-900">Halil İbrahim</span>
                        <span class="block bg-gradient-to-r from-violet-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">Koçoğlu</span>
                    </h1>
                </div>

                <p class="text-slate-600 text-md md:text-lg leading-relaxed max-w-md">
                    {{ \App\Models\Setting::get(app()->getLocale() === 'en' ? 'hero_subtitle_en' : 'hero_subtitle_tr') }}
                </p>

                <div class="flex flex-wrap gap-3 pt-2">
                    <a href="{{ lroute('projects.index') }}" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-95">
                        {{ __('site.hero.view_projects') }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>

                    @php
                        $cv = app()->getLocale() === 'en'
                            ? (\App\Models\Setting::get('cv_file_en') ?? \App\Models\Setting::get('cv_file_tr'))
                            : (\App\Models\Setting::get('cv_file_tr') ?? \App\Models\Setting::get('cv_file_en'));
                    @endphp
                    @if ($cv)
                        <a href="{{ \Illuminate\Support\Facades\Storage::url($cv) }}" download class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-violet-300/60 text-violet-700 font-semibold hover:bg-violet-50 hover:border-violet-400 hover:scale-[1.03] transition-all duration-300 active:scale-95 bg-white/60 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            {{ __('site.hero.download_cv') }}
                        </a>
                    @endif
                </div>

                <div class="flex gap-3 pt-2">
                    @if ($github = \App\Models\Setting::get('github_url'))
                        <a href="{{ $github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-11 h-11 rounded-xl bg-white/70 border border-slate-200/60 flex items-center justify-center text-slate-600 shadow-sm hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:shadow-violet-500/25 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                            <x-icons.github />
                        </a>
                    @endif
                    @if ($linkedin = \App\Models\Setting::get('linkedin_url'))
                        <a href="{{ $linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-11 h-11 rounded-xl bg-white/70 border border-slate-200/60 flex items-center justify-center text-slate-600 shadow-sm hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:shadow-violet-500/25 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                            <x-icons.linkedin />
                        </a>
                    @endif
                    @if ($email = \App\Models\Setting::get('email'))
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to={{ $email }}" target="_blank" rel="noopener noreferrer" aria-label="Email" class="w-11 h-11 rounded-xl bg-white/70 border border-slate-200/60 flex items-center justify-center text-slate-600 shadow-sm hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:shadow-violet-500/25 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                    @endif
                </div>
            </div>

            <div class="relative flex flex-col items-center gap-8">
                <div class="relative">
                    <div class="absolute -inset-4 bg-gradient-to-br from-violet-400/30 to-pink-400/20 rounded-full blur-xl"></div>
                    <div class="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-violet-300/30 animate-float">
                        @if ($photo = \App\Models\Setting::get('profile_photo'))
                            <img fetchpriority="high" alt="Halil İbrahim Koçoğlu - {{ __('site.hero.badge') }}" class="w-full h-full object-cover" src="{{ \Illuminate\Support\Facades\Storage::url($photo) }}">
                        @endif
                    </div>

                    <div class="absolute -bottom-0 -left-0 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl px-4 py-3 text-center">
                        <p class="text-2xl font-extrabold text-violet-700">3+</p>
                        <p class="text-xs text-slate-500 font-medium">{{ __('site.hero.stat_experience') }}</p>
                    </div>
                    <div class="absolute -top-0 -right-0 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl px-4 py-3 text-center">
                        <p class="text-2xl font-extrabold text-pink-600">10+</p>
                        <p class="text-xs text-slate-500 font-medium">{{ __('site.hero.stat_projects') }}</p>
                    </div>
                </div>

                <div class="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-2xl px-6 py-3 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <span class="text-emerald-600 text-sm font-bold">&check;</span>
                    </div>
                    <div>
                        <p class="text-slate-900 font-bold text-sm">100%</p>
                        <p class="text-slate-500 text-xs">{{ __('site.hero.stat_satisfaction') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- About --}}
<section id="about" class="py-20 md:py-28 px-1 sm:px-6 overflow-hidden">
    <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.about.subtitle') }}
            </span>
            <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.about.title') }}</h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-14 items-start">
            <div class="relative">
                <div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
                    <img alt="{{ __('site.about.title') }}" class="w-full h-full object-cover aspect-video" src="{{ \Illuminate\Support\Facades\Storage::url('settings/codingmonitors.webp') }}">
                    <div class="absolute inset-0 bg-gradient-to-t from-violet-950/30 via-transparent to-transparent"></div>
                </div>

                <div class="absolute -bottom-5 -right-4 bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-xl rounded-2xl px-5 py-3 hidden md:block">
                    <p class="text-2xl font-extrabold text-violet-700">3+</p>
                    <p class="text-slate-500 text-xs font-medium uppercase tracking-wide">{{ __('site.about.years_experience') }}</p>
                </div>
            </div>

            <div>
                <p class="text-slate-600 text-lg leading-relaxed mb-8">
                    {{ \App\Models\Setting::get(app()->getLocale() === 'en' ? 'about_text_en' : 'about_text_tr') }}
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    @php
                        $highlights = app()->getLocale() === 'en' ? [
                            ['icon' => 'code', 'title' => 'Custom Development', 'desc' => 'Tailor-made software solutions for your business needs.'],
                            ['icon' => 'palette', 'title' => 'Modern UI/UX', 'desc' => 'Responsive, mobile-friendly, and conversion-oriented designs.'],
                            ['icon' => 'rocket', 'title' => 'SEO & Visibility', 'desc' => "Top rankings in local searches like 'Nazilli Web Design'."],
                            ['icon' => 'pin', 'title' => 'Regional Support', 'desc' => 'On-site and remote support for businesses in Aydın.'],
                        ] : [
                            ['icon' => 'code', 'title' => 'Özel Yazılım', 'desc' => 'İhtiyaçlarınıza yönelik butik ve ölçeklenebilir çözümler.'],
                            ['icon' => 'palette', 'title' => 'Modern Tasarım', 'desc' => 'Mobil uyumlu, şık ve kullanıcı odaklı arayüzler.'],
                            ['icon' => 'rocket', 'title' => 'SEO & Görünürlük', 'desc' => "Google'da üst sıralarda yer alma hedefi."],
                            ['icon' => 'pin', 'title' => 'Yerel Destek', 'desc' => 'Aydın ve Nazilli içi yüz yüze görüşme ve hızlı destek.'],
                        ];
                        $icons = [
                            'code' => '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
                            'palette' => '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
                            'rocket' => '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
                            'pin' => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
                        ];
                    @endphp
                    @foreach ($highlights as $item)
                        <div class="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-violet-300/50 hover:-translate-y-1 transition-all duration-300">
                            <div class="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3 text-violet-700 border border-violet-200/50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $icons[$item['icon']] !!}</svg>
                            </div>
                            <h3 class="text-slate-900 font-bold text-sm mb-1">{{ $item['title'] }}</h3>
                            <p class="text-slate-500 text-sm leading-snug">{{ $item['desc'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</section>

{{-- Featured projects --}}
@if ($featuredProjects->isNotEmpty())
<section class="py-20 md:py-28 px-1 sm:px-4 overflow-hidden bg-white/30">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.home.featured_projects') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            @foreach ($featuredProjects as $project)
                @include('partials.project-card', ['project' => $project])
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ lroute('projects.index') }}" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-95">
                {{ __('site.home.view_all') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>
    </div>
</section>
@endif

{{-- Skills summary --}}
@if ($skills->isNotEmpty())
<section class="py-20 md:py-28 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.home.skills_summary') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            @foreach ($skills as $category => $items)
                @php $colors = $categoryColors[$category] ?? $categoryColors['other']; @endphp
                <div class="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-violet-200 hover:-translate-y-1 transition-all duration-300 group">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="w-11 h-11 rounded-2xl flex items-center justify-center border {{ $colors['icon'] }} group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        </div>
                        <h3 class="text-slate-900 font-bold text-base">{{ __('site.skills.category_' . $category) }}</h3>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        @foreach ($items as $skill)
                            <span class="px-3 py-1.5 rounded-xl text-xs font-semibold border {{ $colors['tag'] }} hover:-translate-y-0.5 transition-transform duration-200 cursor-default">
                                {{ $skill->name }}
                            </span>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ lroute('skills') }}" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-violet-300/60 text-violet-700 font-semibold hover:bg-violet-50 hover:border-violet-400 hover:scale-[1.03] transition-all duration-300 active:scale-95 bg-white/60 backdrop-blur-sm">
                {{ __('site.home.view_all') }}
            </a>
        </div>
    </div>
</section>
@endif

{{-- Latest blog posts --}}
@if ($latestPosts->isNotEmpty())
<section class="py-20 md:py-28 px-1 sm:px-4 overflow-hidden bg-white/30">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.home.latest_posts') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            @foreach ($latestPosts as $post)
                <a href="{{ lroute('blog.show', ['slug' => $post->slug]) }}" class="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-violet-200/40 hover:-translate-y-2 hover:border-violet-200 transition-all duration-300 group">
                    @if ($post->image)
                        <div class="h-44 overflow-hidden bg-slate-100">
                            <img src="{{ \Illuminate\Support\Facades\Storage::url($post->image) }}" alt="{{ $post->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                    @endif
                    <div class="p-6">
                        <p class="text-slate-400 text-xs mb-2">{{ $post->published_at->translatedFormat('d M Y') }}</p>
                        <h3 class="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug mb-2">{{ $post->title }}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">{{ $post->excerpt }}</p>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>
@endif

{{-- CTA --}}
<section class="py-20 md:py-28 px-1 sm:px-4 overflow-hidden">
    <div class="container mx-auto max-w-5xl">
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-700 to-pink-600 px-8 py-16 text-center shadow-xl shadow-violet-500/25">
            <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">{{ __('site.home.cta_title') }}</h2>
            <p class="text-violet-100 text-lg mb-8">{{ __('site.home.cta_subtitle') }}</p>
            <a href="{{ lroute('contact') }}" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-violet-700 font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 active:scale-95">
                {{ __('site.nav.contact') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>
    </div>
</section>

@endsection
