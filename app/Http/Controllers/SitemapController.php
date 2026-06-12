<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = [];

        $staticRoutes = [
            ['tr' => 'home', 'en' => 'home.en'],
            ['tr' => 'projects.index', 'en' => 'projects.index.en'],
            ['tr' => 'experience', 'en' => 'experience.en'],
            ['tr' => 'skills', 'en' => 'skills.en'],
            ['tr' => 'blog.index', 'en' => 'blog.index.en'],
            ['tr' => 'contact', 'en' => 'contact.en'],
        ];

        foreach ($staticRoutes as $route) {
            $urls[] = ['loc' => route($route['tr']), 'alt' => route($route['en'])];
            $urls[] = ['loc' => route($route['en']), 'alt' => route($route['tr'])];
        }

        foreach (Project::where('is_active', true)->get() as $project) {
            $urls[] = ['loc' => route('projects.show', ['slug' => $project->slug]), 'alt' => route('projects.show.en', ['slug' => $project->slug])];
            $urls[] = ['loc' => route('projects.show.en', ['slug' => $project->slug]), 'alt' => route('projects.show', ['slug' => $project->slug])];
        }

        foreach (BlogPost::where('is_active', true)->whereNotNull('published_at')->get() as $post) {
            $urls[] = ['loc' => route('blog.show', ['slug' => $post->slug]), 'alt' => route('blog.show.en', ['slug' => $post->slug])];
            $urls[] = ['loc' => route('blog.show.en', ['slug' => $post->slug]), 'alt' => route('blog.show', ['slug' => $post->slug])];
        }

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
