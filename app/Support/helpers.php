<?php

use App\Models\Setting;
use Illuminate\Support\Facades\App;

if (! function_exists('whatsapp_url')) {
    /**
     * Build a wa.me link using the configured WhatsApp number and an optional prefilled message.
     */
    function whatsapp_url(?string $message = null): ?string
    {
        $number = preg_replace('/\D/', '', (string) Setting::get('whatsapp_number'));

        if (! $number) {
            return null;
        }

        $url = "https://wa.me/{$number}";

        if ($message) {
            $url .= '?text='.rawurlencode($message);
        }

        return $url;
    }
}

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
