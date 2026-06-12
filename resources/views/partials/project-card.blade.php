@php
    $isWebsite = (bool) ($project->live_url || $project->mobile_image);
@endphp

<div class="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300 group hover:shadow-xl hover:shadow-violet-200/40 hover:-translate-y-2 hover:border-violet-200">
    @if ($isWebsite)
        <div class="relative p-4 pb-2 bg-gradient-to-br from-slate-50 to-violet-50/40 border-b border-slate-200/50">
            <div class="rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-white">
                <div class="bg-slate-100 px-3 py-2 flex items-center gap-2 border-b border-slate-200/60">
                    <div class="flex gap-1 flex-shrink-0">
                        <div class="w-2 h-2 rounded-full bg-red-400/80"></div>
                        <div class="w-2 h-2 rounded-full bg-yellow-400/80"></div>
                        <div class="w-2 h-2 rounded-full bg-green-400/80"></div>
                    </div>
                    <div class="flex-1 bg-white rounded-md px-2 py-0.5 text-[9px] text-slate-400 truncate border border-slate-200/70 mr-16">
                        {{ $project->live_url ? preg_replace('#^https?://#', '', $project->live_url) : $project->title }}
                    </div>
                </div>
                <div class="h-36 overflow-hidden">
                    @if ($project->image)
                        <img loading="lazy" decoding="async" src="{{ \Illuminate\Support\Facades\Storage::url($project->image) }}" alt="{{ $project->title }}" class="w-full h-full object-cover object-top">
                    @endif
                </div>
            </div>

            <div class="absolute right-5 bottom-0 translate-y-[40%] z-10 rounded-[20px] overflow-hidden border-[3px] border-slate-300 shadow-xl bg-white" style="width: 72px; height: 130px;">
                <div class="h-[18px] bg-slate-200 flex items-center justify-center">
                    <div class="w-7 h-1.5 bg-slate-400 rounded-full"></div>
                </div>
                <div class="overflow-hidden bg-white" style="height: 96px;">
                    @if ($project->mobile_image || $project->image)
                        <img loading="lazy" decoding="async" src="{{ \Illuminate\Support\Facades\Storage::url($project->mobile_image ?? $project->image) }}" alt="" class="w-full h-full object-cover object-top">
                    @endif
                </div>
                <div class="h-4 bg-slate-200 flex items-center justify-center">
                    <div class="w-6 h-1 bg-slate-400 rounded-full"></div>
                </div>
            </div>
        </div>
    @else
        <div class="relative h-44 overflow-hidden bg-slate-100">
            @if ($project->image)
                <img loading="lazy" decoding="async" src="{{ \Illuminate\Support\Facades\Storage::url($project->image) }}" alt="{{ $project->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            @endif
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
        </div>
    @endif

    <div class="p-6 flex flex-col {{ $isWebsite ? 'pt-12' : '' }}">
        @if ($isWebsite)
            <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-0.5 mb-3 self-start">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {{ __('site.projects.live') }}
            </span>
        @endif

        <h3 class="text-base font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug">
            <a href="{{ lroute('projects.show', ['slug' => $project->slug]) }}" class="hover:underline">{{ $project->title }}</a>
        </h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{{ $project->description }}</p>

        <div class="flex flex-wrap gap-1.5 mb-5 mt-auto">
            @foreach (array_slice($project->tech_stack ?? [], 0, 5) as $tech)
                <span class="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-lg text-[10px] font-semibold border border-violet-200/50">{{ $tech }}</span>
            @endforeach
        </div>

        <div class="flex gap-2.5">
            @if ($project->live_url)
                <a href="{{ $project->live_url }}" target="_blank" rel="noopener noreferrer" class="flex-1">
                    <span class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-700 to-pink-600 text-white text-sm font-semibold shadow-md shadow-violet-500/20 hover:shadow-violet-500/35 hover:brightness-105 transition-all active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        {{ __('site.projects.visit_site') }}
                    </span>
                </a>
            @endif
            @if ($project->github_url)
                <a href="{{ $project->github_url }}" target="_blank" rel="noopener noreferrer" class="{{ $project->live_url ? '' : 'flex-1' }}">
                    <span class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-semibold hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all active:scale-95 {{ $project->live_url ? '' : 'w-full' }}">
                        <x-icons.github class="w-[15px] h-[15px]" />
                        {{ $project->live_url ? 'GitHub' : __('site.projects.view_details') }}
                    </span>
                </a>
            @endif
        </div>
    </div>
</div>
