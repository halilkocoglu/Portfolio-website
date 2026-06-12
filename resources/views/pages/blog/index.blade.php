@extends('layouts.app')

@php
    $title = __('site.blog.title') . ' — ' . __('site.meta.site_name');
    $description = __('site.blog.subtitle');
    $hreflang = [
        'tr' => route('blog.index'),
        'en' => route('blog.index.en'),
        'x-default' => route('blog.index'),
    ];
@endphp

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.blog.subtitle') }}
            </span>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.blog.title') }}</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            @foreach ($posts as $post)
                <a href="{{ lroute('blog.show', ['slug' => $post->slug]) }}" class="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-violet-200/40 hover:-translate-y-2 hover:border-violet-200 transition-all duration-300 group">
                    @if ($post->image)
                        <div class="h-44 overflow-hidden bg-slate-100">
                            <img src="{{ \Illuminate\Support\Facades\Storage::url($post->image) }}" alt="{{ $post->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                    @endif
                    <div class="p-6">
                        <p class="text-slate-400 text-xs mb-2">{{ $post->published_at->translatedFormat('d M Y') }}</p>
                        <h2 class="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug mb-2">{{ $post->title }}</h2>
                        <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">{{ $post->excerpt }}</p>
                        <span class="inline-flex items-center gap-1 text-violet-700 text-sm font-semibold mt-4">
                            {{ __('site.blog.read_more') }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </span>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>
@endsection
