<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\Skill;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProjects = Project::query()
            ->with('images')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->get();

        $skills = Skill::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->groupBy('category');

        $latestPosts = BlogPost::query()
            ->where('is_active', true)
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        return view('pages.home', [
            'featuredProjects' => $featuredProjects,
            'skills' => $skills,
            'latestPosts' => $latestPosts,
        ]);
    }
}
