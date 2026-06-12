@extends('layouts.app')

@php
    $title = __('site.experience.title') . ' — ' . __('site.meta.site_name');
    $description = __('site.experience.subtitle');
    $hreflang = [
        'tr' => route('experience'),
        'en' => route('experience.en'),
        'x-default' => route('experience'),
    ];
@endphp

@section('content')
<section class="py-28 md:py-32 px-1 sm:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-5xl">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.experience.subtitle') }}
            </span>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">{{ __('site.experience.title') }}</h1>

            @if ($cvFile)
                <a href="{{ \Illuminate\Support\Facades\Storage::url($cvFile) }}" download class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03] transition-all duration-300 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {{ __('site.experience.download_cv') }}
                </a>
            @endif
        </div>

        <div class="relative">
            <div class="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-300 via-pink-300 to-transparent hidden sm:block"></div>

            <div class="space-y-8">
                @foreach ($experiences as $exp)
                    <div class="relative sm:pl-20">
                        <div class="absolute left-4 md:left-5 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 border-2 border-white shadow-md shadow-violet-400/30 hidden sm:flex items-center justify-center">
                            <div class="w-2 h-2 rounded-full bg-white"></div>
                        </div>

                        <div class="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 group">
                            <div class="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-5">
                                <div class="flex items-start gap-4">
                                    <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                    </div>
                                    <div>
                                        <h3 class="text-lg md:text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{{ $exp->role }}</h3>
                                        <p class="text-violet-600 font-medium text-sm">{{ $exp->company }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1.5 text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg self-start text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-pink-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    <time class="font-medium whitespace-nowrap">
                                        {{ $exp->start_date->translatedFormat('m/Y') }} – {{ $exp->is_current ? __('site.experience.present') : $exp->end_date?->translatedFormat('m/Y') }}
                                    </time>
                                </div>
                            </div>

                            <p class="text-slate-600 mb-5 leading-relaxed text-sm md:text-base">{{ $exp->description }}</p>

                            <div class="flex flex-wrap gap-2">
                                @foreach ($exp->technologies ?? [] as $tech)
                                    <span class="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium border border-violet-200/60">{{ $tech }}</span>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
@endsection
