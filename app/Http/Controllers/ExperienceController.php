<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Setting;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::query()
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->get();

        return view('pages.experience', [
            'experiences' => $experiences,
            'cvFile' => app()->getLocale() === 'en'
                ? (Setting::get('cv_file_en') ?? Setting::get('cv_file_tr'))
                : (Setting::get('cv_file_tr') ?? Setting::get('cv_file_en')),
        ]);
    }
}
