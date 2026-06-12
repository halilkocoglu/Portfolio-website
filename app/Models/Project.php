<?php

namespace App\Models;

use App\Models\Concerns\HasLocaleFields;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasLocaleFields;

    protected $fillable = [
        'title_tr',
        'title_en',
        'slug',
        'description_tr',
        'description_en',
        'tech_stack',
        'category',
        'live_url',
        'github_url',
        'image',
        'mobile_image',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected function title(): Attribute
    {
        return Attribute::get(fn () => $this->localized('title'));
    }

    protected function description(): Attribute
    {
        return Attribute::get(fn () => $this->localized('description'));
    }

    protected static function booted(): void
    {
        static::saving(function (Project $project) {
            if (blank($project->slug) && filled($project->title_tr)) {
                $project->slug = Str::slug($project->title_tr);
            }
        });
    }
}
