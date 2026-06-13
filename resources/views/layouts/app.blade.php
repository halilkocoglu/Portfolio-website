<!DOCTYPE html>
<html lang="{{ app()->getLocale() === 'en' ? 'en' : 'tr' }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#7c3aed">

        <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('favicon-apple.png') }}">

        <title>{{ $title ?? __('site.meta.site_name') }}</title>
        <meta name="description" content="{{ $description ?? \App\Models\Setting::get(app()->getLocale() === 'en' ? 'site_description_en' : 'site_description_tr') }}">

        {{-- Local SEO --}}
        <meta name="geo.region" content="TR-09">
        <meta name="geo.placename" content="Nazilli, Aydın">
        <meta name="ICBM" content="37.9167, 28.3167">

        {{-- hreflang alternates --}}
        @isset($hreflang)
            @foreach ($hreflang as $locale => $url)
                <link rel="alternate" hreflang="{{ $locale }}" href="{{ $url }}">
            @endforeach
        @endisset

        {{-- Open Graph --}}
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ $title ?? __('site.meta.site_name') }}">
        <meta property="og:description" content="{{ $description ?? \App\Models\Setting::get(app()->getLocale() === 'en' ? 'site_description_en' : 'site_description_tr') }}">
        <meta property="og:url" content="{{ url()->current() }}">
        @if ($ogImage = \App\Models\Setting::get('og_image'))
            <meta property="og:image" content="{{ Illuminate\Support\Facades\Storage::url($ogImage) }}">
        @endif

        {{-- Fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        @stack('head')
    </head>
    <body class="min-h-screen text-slate-900 selection:bg-violet-500/20 font-sans">
        @include('partials.navbar')

        <main id="main-content" class="flex flex-col min-h-screen">
            {{ $slot ?? '' }}
            @yield('content')
        </main>

        @include('partials.footer')
        @include('partials.whatsapp-float')
    </body>
</html>
