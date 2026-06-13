<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()->with('images')->where('is_active', true)->orderBy('sort_order');

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        $projects = $query->get();

        return view('pages.projects.index', [
            'projects' => $projects,
            'category' => $category,
        ]);
    }

    public function show(string $slug)
    {
        $project = Project::query()
            ->with('images')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return view('pages.projects.show', [
            'project' => $project,
        ]);
    }
}
