<?php

namespace App\Models;

use App\Models\Concerns\HasLocaleFields;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

class BlogPost extends Model
{
    use HasLocaleFields;

    protected $fillable = [
        'title_tr',
        'title_en',
        'slug',
        'content_tr',
        'content_en',
        'excerpt_tr',
        'excerpt_en',
        'image',
        'published_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    protected function title(): Attribute
    {
        return Attribute::get(fn () => $this->localized('title'));
    }

    protected function content(): Attribute
    {
        return Attribute::get(fn () => $this->localized('content'));
    }

    protected function excerpt(): Attribute
    {
        return Attribute::get(fn () => $this->localized('excerpt'));
    }

    public function setContentTrAttribute(?string $value): void
    {
        $this->attributes['content_tr'] = $this->sanitizeHtml($value);
    }

    public function setContentEnAttribute(?string $value): void
    {
        $this->attributes['content_en'] = $this->sanitizeHtml($value);
    }

    protected function sanitizeHtml(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        return (new HtmlSanitizer(
            (new HtmlSanitizerConfig)
                ->allowSafeElements()
                ->allowAttribute('class', '*')
        ))->sanitize($value);
    }

    protected static function booted(): void
    {
        static::saving(function (BlogPost $post) {
            if (blank($post->slug) && filled($post->title_tr)) {
                $slug = Str::slug($post->title_tr);
                $original = $slug;
                $suffix = 2;

                while (static::where('slug', $slug)->where('id', '!=', $post->id ?? 0)->exists()) {
                    $slug = "{$original}-{$suffix}";
                    $suffix++;
                }

                $post->slug = $slug;
            }
        });
    }
}
