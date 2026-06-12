<?php

namespace App\Models;

use App\Models\Concerns\HasLocaleFields;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasLocaleFields;

    protected $fillable = [
        'company',
        'role_tr',
        'role_en',
        'description_tr',
        'description_en',
        'technologies',
        'start_date',
        'end_date',
        'is_current',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
        ];
    }

    protected function role(): Attribute
    {
        return Attribute::get(fn () => $this->localized('role'));
    }

    protected function description(): Attribute
    {
        return Attribute::get(fn () => $this->localized('description'));
    }
}
