@extends('layouts.app')

@php
    $title = $project->title . ' — ' . __('site.meta.site_name');
    $description = $project->description;
    $hreflang = [
        'tr' => route('projects.show', ['slug' => $project->slug]),
        'en' => route('projects.show.en', ['slug' => $project->slug]),
        'x-default' => route('projects.show', ['slug' => $project->slug]),
    ];
@endphp

@push('head')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'CreativeWork',
    'name' => $project->title,
    'description' => $project->description,
    'url' => $project->live_url,
    'creator' => [
        '@type' => 'Person',
        'name' => 'Halil İbrahim Koçoğlu',
    ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
</script>
@endpush

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-5xl">
        <nav class="text-sm text-slate-500 mb-8">
            <a href="{{ lroute('home') }}" class="hover:text-violet-700">{{ __('site.projects.breadcrumb_home') }}</a>
            <span class="mx-2">/</span>
            <a href="{{ lroute('projects.index') }}" class="hover:text-violet-700">{{ __('site.projects.title') }}</a>
            <span class="mx-2">/</span>
            <span class="text-slate-800">{{ $project->title }}</span>
        </nav>

        @if ($project->image)
            <div class="rounded-3xl overflow-hidden shadow-xl shadow-slate-300/30 border border-white mb-10">
                <img src="{{ \Illuminate\Support\Facades\Storage::url($project->image) }}" alt="{{ $project->title }}" class="w-full h-auto object-cover">
            </div>
        @endif

        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{{ $project->title }}</h1>
        <p class="text-slate-600 text-lg leading-relaxed mb-8">{{ $project->description }}</p>

        @if (!empty($project->tech_stack))
            <div class="mb-10">
                <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">{{ __('site.projects.tech_stack') }}</h2>
                <div class="flex flex-wrap gap-2">
                    @foreach ($project->tech_stack as $tech)
                        <span class="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium border border-violet-200/60">{{ $tech }}</span>
                    @endforeach
                </div>
            </div>
        @endif

        <div class="flex gap-3">
            @if ($project->live_url)
                <a href="{{ $project->live_url }}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    {{ __('site.projects.visit_site') }}
                </a>
            @endif
            @if ($project->github_url)
                <a href="{{ $project->github_url }}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all active:scale-95">
                    <x-icons.github />
                    GitHub
                </a>
            @endif
        </div>
    </div>
</section>
@endsection
