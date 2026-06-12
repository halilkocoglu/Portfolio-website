@extends('layouts.app')

@php
    $title = __('site.skills.title') . ' — ' . __('site.meta.site_name');
    $description = __('site.skills.subtitle');
    $hreflang = [
        'tr' => route('skills'),
        'en' => route('skills.en'),
        'x-default' => route('skills'),
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

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.skills.subtitle') }}
            </span>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.skills.title') }}</h1>
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
    </div>
</section>
@endsection
