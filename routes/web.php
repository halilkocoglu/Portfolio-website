<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;

Route::get('/locale/{locale}', [LocaleController::class, 'switch'])->name('locale.switch');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Turkish (default, no prefix)
Route::middleware('locale')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/web-sitesi-hizmetleri', [ServiceController::class, 'index'])->name('services');
    Route::get('/projeler', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projeler/{slug}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/deneyim', [ExperienceController::class, 'index'])->name('experience');
    Route::get('/yetenekler', [SkillController::class, 'index'])->name('skills');
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
    Route::get('/iletisim', [ContactController::class, 'index'])->name('contact');
    Route::post('/iletisim', [ContactController::class, 'store'])->name('contact.store')->middleware('throttle:5,1');
});

// English (/en prefix)
Route::prefix('en')->middleware('locale')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home.en');
    Route::get('/website-services', [ServiceController::class, 'index'])->name('services.en');
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index.en');
    Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show.en');
    Route::get('/experience', [ExperienceController::class, 'index'])->name('experience.en');
    Route::get('/skills', [SkillController::class, 'index'])->name('skills.en');
    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index.en');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show.en');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact.en');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store.en')->middleware('throttle:5,1');
});
