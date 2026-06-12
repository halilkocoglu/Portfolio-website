@extends('layouts.app')

@php
    $locale = app()->getLocale() === 'en' ? 'en' : 'tr';

    $serviceTitle = \App\Models\Setting::get("services_title_{$locale}");
    $serviceSubtitle = \App\Models\Setting::get("services_subtitle_{$locale}");
    $serviceIntro = \App\Models\Setting::get("services_intro_{$locale}");
    $packagesTitle = \App\Models\Setting::get("services_packages_title_{$locale}");
    $packages = json_decode(\App\Models\Setting::get("services_packages_{$locale}") ?? '[]', true) ?? [];
    $whyTitle = \App\Models\Setting::get("services_why_title_{$locale}");
    $whyItems = json_decode(\App\Models\Setting::get("services_why_items_{$locale}") ?? '[]', true) ?? [];
    $faqTitle = \App\Models\Setting::get("services_faq_title_{$locale}");
    $faqItems = json_decode(\App\Models\Setting::get("services_faq_items_{$locale}") ?? '[]', true) ?? [];
    $ctaTitle = \App\Models\Setting::get("services_cta_title_{$locale}");
    $ctaSubtitle = \App\Models\Setting::get("services_cta_subtitle_{$locale}");
    $ctaButton = \App\Models\Setting::get("services_cta_button_{$locale}");

    $title = $serviceTitle . ' — ' . __('site.meta.site_name');
    $description = $serviceIntro;
    $hreflang = [
        'tr' => route('services'),
        'en' => route('services.en'),
        'x-default' => route('services'),
    ];
@endphp

@push('head')
@if (! empty($faqItems))
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => array_map(fn ($item) => [
        '@type' => 'Question',
        'name' => $item['q'],
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text' => $item['a'],
        ],
    ], $faqItems),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
</script>
@endif
@endpush

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16 max-w-3xl mx-auto">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ $serviceSubtitle }}
            </span>
            <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">{{ $serviceTitle }}</h1>
            <p class="text-slate-600 text-lg leading-relaxed">{{ $serviceIntro }}</p>
        </div>

        {{-- Packages --}}
        @if (! empty($packages))
        <div class="mb-20">
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-10">{{ $packagesTitle }}</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 {{ count($packages) >= 3 ? 'lg:grid-cols-3 max-w-7xl' : 'max-w-3xl' }} gap-6 md:gap-7 mx-auto">
                @foreach ($packages as $package)
                    <div class="bg-white/80 backdrop-blur-sm p-7 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-violet-200 hover:-translate-y-1 transition-all duration-300">
                        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ $package['title'] }}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed mb-5">{{ $package['desc'] }}</p>
                        <ul class="space-y-2.5">
                            @foreach ($package['features'] ?? [] as $feature)
                                <li class="flex items-start gap-2 text-sm text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 text-violet-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span>{{ $feature }}</span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </div>
        </div>
        @endif

        {{-- Why choose me --}}
        @if (! empty($whyItems))
        <div class="mb-20">
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-10">{{ $whyTitle }}</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                @foreach ($whyItems as $item)
                    <div class="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-violet-300/50 hover:-translate-y-1 transition-all duration-300">
                        <h3 class="text-slate-900 font-bold text-base mb-2">{{ $item['title'] }}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed">{{ $item['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
        @endif

        {{-- FAQ --}}
        @if (! empty($faqItems))
        <div class="mb-20 max-w-3xl mx-auto">
            <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-10">{{ $faqTitle }}</h2>

            <div class="space-y-4">
                @foreach ($faqItems as $item)
                    <div class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                        <h3 class="text-slate-900 font-bold text-base mb-2">{{ $item['q'] }}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed">{{ $item['a'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
        @endif

        {{-- CTA --}}
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-violet-700 to-pink-600 px-8 py-16 text-center shadow-xl shadow-violet-500/25 max-w-5xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">{{ $ctaTitle }}</h2>
            <p class="text-violet-100 text-lg mb-8">{{ $ctaSubtitle }}</p>
            <a href="{{ lroute('contact') }}" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-violet-700 font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 active:scale-95">
                {{ $ctaButton }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>
    </div>
</section>
@endsection
