@extends('layouts.app')

@php
    $title = __('site.contact.title') . ' — ' . __('site.meta.site_name');
    $description = __('site.contact.subtitle');
    $hreflang = [
        'tr' => route('contact'),
        'en' => route('contact.en'),
        'x-default' => route('contact'),
    ];
@endphp

@section('content')
<section class="py-28 md:py-32 px-0 md:px-4 overflow-hidden">
    <div class="container p-5 mx-auto max-w-7xl">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4 border border-violet-200/60">
                {{ __('site.contact.subtitle') }}
            </span>
            <h1 class="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ __('site.contact.title') }}</h1>
        </div>

        @if (session('status') === 'message-sent')
            <div class="max-w-2xl mx-auto mb-8 px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium text-center">
                {{ __('site.contact.success') }}
            </div>
        @endif

        <div class="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div class="space-y-4">
                @if ($socialLinks['email'])
                    <div data-copy="{{ $socialLinks['email'] }}" class="flex items-center gap-4 p-2 md:p-5 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 border-slate-200/60 hover:border-violet-300 hover:shadow-md cursor-pointer group hover:-translate-y-0.5">
                        <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border bg-violet-100 text-violet-700 border-violet-200/60">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">{{ __('site.contact.email') }}</p>
                            <p class="text-slate-900 font-semibold text-sm md:text-base truncate">{{ $socialLinks['email'] }}</p>
                        </div>
                        <div data-copy-icon class="flex-shrink-0 text-slate-400 group-hover:text-violet-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </div>
                    </div>
                @endif

                @if ($socialLinks['phone'])
                    <div data-copy="{{ $socialLinks['phone'] }}" class="flex items-center gap-4 p-2 md:p-5 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 border-slate-200/60 hover:border-violet-300 hover:shadow-md cursor-pointer group hover:-translate-y-0.5">
                        <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border bg-pink-100 text-pink-700 border-pink-200/60">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">{{ __('site.contact.phone') }}</p>
                            <p class="text-slate-900 font-semibold text-sm md:text-base truncate">{{ $socialLinks['phone'] }}</p>
                        </div>
                        <div data-copy-icon class="flex-shrink-0 text-slate-400 group-hover:text-violet-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </div>
                    </div>
                @endif

                <div class="flex items-center gap-4 p-2 md:p-5 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm border-slate-200/40 cursor-default">
                    <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border bg-emerald-100 text-emerald-700 border-emerald-200/60">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">{{ __('site.contact.location') }}</p>
                        <p class="text-slate-900 font-semibold text-sm md:text-base truncate">{{ __('site.contact.location_value') }}</p>
                    </div>
                </div>

                {{-- Contact form --}}
                <form method="POST" action="{{ lroute('contact.store') }}" class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-5 md:p-6 space-y-4 mt-6">
                    @csrf
                    <div>
                        <label class="block text-slate-700 text-sm font-semibold mb-1.5">{{ __('site.contact.name') }}</label>
                        <input type="text" name="name" value="{{ old('name') }}" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white/70 text-sm">
                        @error('name') <p class="text-pink-600 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-slate-700 text-sm font-semibold mb-1.5">{{ __('site.contact.email') }}</label>
                        <input type="email" name="email" value="{{ old('email') }}" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white/70 text-sm">
                        @error('email') <p class="text-pink-600 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-slate-700 text-sm font-semibold mb-1.5">{{ __('site.contact.phone') }}</label>
                        <input type="text" name="phone" value="{{ old('phone') }}" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white/70 text-sm">
                        @error('phone') <p class="text-pink-600 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-slate-700 text-sm font-semibold mb-1.5">{{ __('site.contact.subject') }}</label>
                        <input type="text" name="subject" value="{{ old('subject') }}" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white/70 text-sm">
                        @error('subject') <p class="text-pink-600 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label class="block text-slate-700 text-sm font-semibold mb-1.5">{{ __('site.contact.message') }}</label>
                        <textarea name="message" rows="5" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white/70 text-sm">{{ old('message') }}</textarea>
                        @error('message') <p class="text-pink-600 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                    <button type="submit" class="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] transition-all duration-300 active:scale-95">
                        {{ __('site.contact.send') }}
                    </button>
                </form>
            </div>

            <div class="relative h-50 md:h-80 lg:h-[380px] rounded-3xl overflow-hidden shadow-xl shadow-slate-300/30 border border-white">
                <img loading="lazy" alt="{{ __('site.contact.title') }}" class="w-full h-full object-cover" src="{{ \Illuminate\Support\Facades\Storage::url('settings/contact.webp') }}">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
            </div>
        </div>
    </div>
</section>
@endsection
