<?php

namespace App\Models\Concerns;

trait HasLocaleFields
{
    /**
     * Resolve a translated value for a base field name, falling back to the
     * Turkish column when the English column is empty.
     *
     * Example: $this->localized('title') reads title_en / title_tr.
     */
    protected function localized(string $field): ?string
    {
        $locale = app()->getLocale();

        $en = $this->{"{$field}_en"} ?? null;
        $tr = $this->{"{$field}_tr"} ?? null;

        return $locale === 'en' && $en ? $en : $tr;
    }
}
