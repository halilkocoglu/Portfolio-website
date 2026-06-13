<?php

namespace App\Models;

use App\Models\Concerns\HasLocaleFields;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
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

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order');
    }

    protected function coverImage(): Attribute
    {
        return Attribute::get(fn () => $this->images->firstWhere('is_cover', true)?->image
            ?? $this->images->first()?->image
            ?? $this->image);
    }

    protected static function booted(): void
    {
        static::deleting(function (Project $project) {
            $project->images->each(fn (ProjectImage $image) => $image->delete());

            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            if ($project->mobile_image) {
                Storage::disk('public')->delete($project->mobile_image);
            }
        });

        static::saving(function (Project $project) {
            if (blank($project->slug) && filled($project->title_tr)) {
                $slug = Str::slug($project->title_tr);
                $original = $slug;
                $suffix = 2;

                while (static::where('slug', $slug)->where('id', '!=', $project->id ?? 0)->exists()) {
                    $slug = "{$original}-{$suffix}";
                    $suffix++;
                }

                $project->slug = $slug;
            }
        });
    }
}
