@extends('layouts.app')

@php
    $title = $post->title . ' — ' . __('site.meta.site_name');
    $description = $post->excerpt;
    $hreflang = [
        'tr' => route('blog.show', ['slug' => $post->slug]),
        'en' => route('blog.show.en', ['slug' => $post->slug]),
        'x-default' => route('blog.show', ['slug' => $post->slug]),
    ];
@endphp

@push('head')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'BlogPosting',
    'headline' => $post->title,
    'description' => $post->excerpt,
    'datePublished' => $post->published_at?->toIso8601String(),
    'author' => [
        '@type' => 'Person',
        'name' => 'Halil İbrahim Koçoğlu',
    ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
</script>
@endpush

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-3xl">
        <nav class="text-sm text-slate-500 mb-8">
            <a href="{{ lroute('blog.index') }}" class="hover:text-violet-700">{{ __('site.blog.back_to_blog') }}</a>
        </nav>

        @if ($post->image)
            <div class="rounded-3xl overflow-hidden shadow-xl shadow-slate-300/30 border border-white mb-8">
                <img src="{{ \Illuminate\Support\Facades\Storage::url($post->image) }}" alt="{{ $post->title }}" class="w-full h-auto object-cover">
            </div>
        @endif

        <p class="text-slate-400 text-sm mb-3">{{ $post->published_at->translatedFormat('d M Y') }}</p>
        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">{{ $post->title }}</h1>

        <div class="prose prose-slate prose-violet max-w-none">
            {!! $post->content !!}
        </div>
    </div>
</section>
@endsection
