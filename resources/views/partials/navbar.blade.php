@php
    $navLinks = [
        'home' => __('site.nav.home'),
        'services' => __('site.nav.services'),
        'experience' => __('site.nav.experience'),
        'projects.index' => __('site.nav.projects'),
        'skills' => __('site.nav.skills'),
        'blog.index' => __('site.nav.blog'),
        'contact' => __('site.nav.contact'),
    ];
    $otherLocale = app()->getLocale() === 'en' ? 'tr' : 'en';
@endphp

<header id="site-header" class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-transparent py-5">
    <nav class="container mx-auto px-1 sm:px-4">
        <div class="flex items-center justify-between">
            <a href="{{ lroute('home') }}" class="text-xl font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition-opacity">
                Halil.dev
            </a>

            <div class="hidden md:flex items-center gap-7">
                @foreach ($navLinks as $route => $label)
                    <a href="{{ lroute($route) }}"
                       class="text-slate-600 text-sm font-medium hover:text-violet-700 transition-colors duration-200 relative group {{ request()->routeIs($route) || request()->routeIs($route . '.en') ? 'text-violet-700' : '' }}">
                        {{ $label }}
                        <span class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-600 to-pink-500 group-hover:w-full transition-all duration-300 {{ request()->routeIs($route) || request()->routeIs($route . '.en') ? 'w-full' : 'w-0' }}"></span>
                    </a>
                @endforeach

                <a href="{{ route('locale.switch', $otherLocale) }}"
                   class="flex items-center px-3 py-1.5 border border-violet-300/70 rounded-lg text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-all duration-200 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    {{ strtoupper($otherLocale) }}
                </a>
            </div>

            <div class="md:hidden flex items-center gap-3">
                <a href="{{ route('locale.switch', $otherLocale) }}"
                   class="flex items-center justify-center h-9 px-3 border border-violet-300/60 rounded-lg text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    {{ strtoupper($otherLocale) }}
                </a>

                <button id="mobile-menu-toggle" aria-label="Menu" class="flex items-center justify-center h-9 w-9 bg-violet-700 text-white rounded-lg shadow-md shadow-violet-500/30 active:scale-90 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="md:hidden overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0">
            <div class="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/60 shadow-xl shadow-slate-200/40 space-y-1">
                @foreach ($navLinks as $route => $label)
                    <a href="{{ lroute($route) }}" class="block w-full text-left text-slate-700 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium text-sm">
                        {{ $label }}
                    </a>
                @endforeach
            </div>
        </div>
    </nav>
</header>
