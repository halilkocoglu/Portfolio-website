@php
    $socials = [
        ['icon' => 'github', 'label' => 'GitHub', 'href' => \App\Models\Setting::get('github_url')],
        ['icon' => 'linkedin', 'label' => 'LinkedIn', 'href' => \App\Models\Setting::get('linkedin_url')],
        ['icon' => 'mail', 'label' => 'Email', 'href' => 'https://mail.google.com/mail/?view=cm&fs=1&to=' . \App\Models\Setting::get('email')],
    ];
@endphp

<footer class="relative z-[100] w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/60 py-10 px-1 sm:px-4">
    <div class="container mx-auto max-w-7xl">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="text-center md:text-left">
                <p class="text-slate-700 text-sm font-medium">
                    &copy; {{ now()->year }}
                    <span class="bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent font-bold">Halil.dev</span>
                    &mdash; {{ __('site.footer.rights') }}
                </p>
                <p class="text-slate-400 text-xs mt-1">{{ __('site.footer.tagline') }}</p>
                <div class="text-slate-400 text-xs mt-2 flex items-center justify-center md:justify-start gap-1">
                    @if (app()->getLocale() === 'en')
                        <span>{{ __('site.footer.made_with') }} <svg class="inline w-3 h-3 text-pink-500 fill-pink-500" viewBox="0 0 24 24"><path d="M12 21s-6.7-4.35-9.3-8.05C1.1 10.7 1.7 7.6 4.2 6.2 6.2 5 8.6 5.7 10 7.3l2 2.2 2-2.2c1.4-1.6 3.8-2.3 5.8-1.1 2.5 1.4 3.1 4.5 1.5 6.75C18.7 16.65 12 21 12 21z"/></svg> Halil İbrahim Koçoğlu</span>
                    @else
                        <span>Halil İbrahim Koçoğlu <svg class="inline w-3 h-3 text-pink-500 fill-pink-500" viewBox="0 0 24 24"><path d="M12 21s-6.7-4.35-9.3-8.05C1.1 10.7 1.7 7.6 4.2 6.2 6.2 5 8.6 5.7 10 7.3l2 2.2 2-2.2c1.4-1.6 3.8-2.3 5.8-1.1 2.5 1.4 3.1 4.5 1.5 6.75C18.7 16.65 12 21 12 21z"/></svg> {{ __('site.footer.made_with') }}</span>
                    @endif
                </div>
            </div>

            <div class="flex items-center gap-3">
                @foreach ($socials as $social)
                    @if ($social['href'])
                        <a href="{{ $social['href'] }}" target="_blank" rel="noopener noreferrer" aria-label="{{ $social['label'] }}"
                           class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-violet-700 hover:text-white hover:border-violet-700 hover:-translate-y-1 transition-all duration-200 shadow-sm">
                            @if ($social['icon'] === 'github')
                                <x-icons.github class="w-[17px] h-[17px]" />
                            @elseif ($social['icon'] === 'linkedin')
                                <x-icons.linkedin class="w-[17px] h-[17px]" />
                            @else
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            @endif
                        </a>
                    @endif
                @endforeach
            </div>
        </div>
    </div>
</footer>
