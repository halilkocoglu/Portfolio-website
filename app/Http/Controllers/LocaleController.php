<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LocaleController extends Controller
{
    /**
     * Map of named routes from one locale to the other, since TR and EN
     * use different URL slugs for the same pages.
     */
    private const ROUTE_MAP = [
        'home' => ['tr' => 'home', 'en' => 'home.en'],
        'projects.index' => ['tr' => 'projects.index', 'en' => 'projects.index.en'],
        'projects.show' => ['tr' => 'projects.show', 'en' => 'projects.show.en'],
        'experience' => ['tr' => 'experience', 'en' => 'experience.en'],
        'skills' => ['tr' => 'skills', 'en' => 'skills.en'],
        'blog.index' => ['tr' => 'blog.index', 'en' => 'blog.index.en'],
        'blog.show' => ['tr' => 'blog.show', 'en' => 'blog.show.en'],
        'contact' => ['tr' => 'contact', 'en' => 'contact.en'],
    ];

    public function switch(Request $request, string $locale): RedirectResponse
    {
        $locale = $locale === 'en' ? 'en' : 'tr';

        $currentRouteName = $request->route()?->getName();
        $params = $request->route()?->parameters() ?? [];

        foreach (self::ROUTE_MAP as $names) {
            if (in_array($currentRouteName, $names, true)) {
                return redirect()->route($names[$locale], $params);
            }
        }

        return redirect()->route($locale === 'en' ? 'home.en' : 'home');
    }
}
