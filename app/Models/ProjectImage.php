<?php

namespace App\Models;

use App\Models\Concerns\HasLocaleFields;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProjectImage extends Model
{
    use HasLocaleFields;

    protected $fillable = [
        'project_id',
        'image',
        'title_tr',
        'title_en',
        'caption_tr',
        'caption_en',
        'sort_order',
        'is_cover',
    ];

    protected function casts(): array
    {
        return [
            'is_cover' => 'boolean',
        ];
    }

    protected function title(): Attribute
    {
        return Attribute::get(fn () => $this->localized('title'));
    }

    protected function caption(): Attribute
    {
        return Attribute::get(fn () => $this->localized('caption'));
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    protected static function booted(): void
    {
        static::deleting(function (ProjectImage $image) {
            if ($image->image) {
                Storage::disk('public')->delete($image->image);
            }
        });
    }
}
