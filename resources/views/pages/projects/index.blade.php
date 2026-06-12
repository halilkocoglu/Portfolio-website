@extends('layouts.app')

@php
    $title = __('site.projects.title') . ' — ' . __('site.meta.site_name');
    $description = __('site.projects.subtitle');
    $hreflang = [
        'tr' => route('projects.index'),
        'en' => route('projects.index.en'),
        'x-default' => route('projects.index'),
    ];
    $categories = ['web', 'mobile', 'api', 'other'];
@endphp

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-12">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.projects.subtitle') }}
            </span>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.projects.title') }}</h1>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-12">
            <a href="{{ lroute('projects.index') }}" class="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors {{ !$category ? 'bg-violet-700 text-white border-violet-700' : 'bg-white/70 text-slate-600 border-slate-200/60 hover:border-violet-300' }}">
                {{ __('site.projects.all') }}
            </a>
            @foreach ($categories as $cat)
                <a href="{{ lroute('projects.index') }}?category={{ $cat }}" class="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors {{ $category === $cat ? 'bg-violet-700 text-white border-violet-700' : 'bg-white/70 text-slate-600 border-slate-200/60 hover:border-violet-300' }}">
                    {{ __('site.projects.category_' . $cat) }}
                </a>
            @endforeach
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            @forelse ($projects as $project)
                @include('partials.project-card', ['project' => $project])
            @empty
                <p class="col-span-full text-center text-slate-500">—</p>
            @endforelse
        </div>
    </div>
</section>
@endsection
