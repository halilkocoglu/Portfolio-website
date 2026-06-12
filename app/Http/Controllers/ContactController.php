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
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Message::create($data);

        return back()->with('status', 'message-sent');
    }
}
