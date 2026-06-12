<?php

use Illuminate\Support\Facades\App;

if (! function_exists('lroute')) {
    /**
     * Resolve a route name for the active locale.
     *
     * TR routes use the base name (e.g. "projects.index"), EN routes
     * use the same name with an ".en" suffix (e.g. "projects.index.en").
     *
     * @param  array<string, mixed>  $parameters
     */
    function lroute(string $name, array $parameters = [], bool $absolute = true): string
    {
        if (App::getLocale() === 'en') {
            $name .= '.en';
        }

        return route($name, $parameters, $absolute);
    }
}
