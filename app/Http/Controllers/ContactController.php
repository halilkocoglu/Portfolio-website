<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return view('pages.contact', [
            'socialLinks' => [
                'github' => Setting::get('github_url'),
                'linkedin' => Setting::get('linkedin_url'),
                'twitter' => Setting::get('twitter_url'),
                'email' => Setting::get('email'),
                'phone' => Setting::get('phone'),
            ],
            'projectTypes' => $this->projectTypes(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $projectTypeLabels = collect($this->projectTypes())->pluck('label')->all();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'project_type' => ['nullable', 'string', 'in:'.implode(',', $projectTypeLabels)],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Message::create($data);

        return back()->with('status', 'message-sent');
    }

    /**
     * @return list<array{label: string}>
     */
    protected function projectTypes(): array
    {
        $locale = app()->getLocale();
        $types = json_decode((string) Setting::get('contact_project_types'), true) ?? [];

        return array_values(array_filter(array_map(
            fn (array $type) => ['label' => $locale === 'en' && ! empty($type['label_en']) ? $type['label_en'] : ($type['label_tr'] ?? '')],
            $types,
        ), fn (array $type) => $type['label'] !== ''));
    }
}
