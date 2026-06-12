<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'Site Ayarları';

    protected static ?string $title = 'Site Ayarları';

    protected static ?int $navigationSort = 6;

    protected static string $view = 'filament.pages.site-settings';

    /**
     * @var array<string, mixed>
     */
    public array $data = [];

    public function mount(): void
    {
        $keys = [
            'site_title', 'site_description_tr', 'site_description_en',
            'profile_photo', 'about_text_tr', 'about_text_en',
            'cv_file_tr', 'cv_file_en',
            'email', 'phone', 'github_url', 'linkedin_url', 'twitter_url',
            'og_image', 'hero_title_tr', 'hero_title_en',
            'hero_subtitle_tr', 'hero_subtitle_en',
        ];

        foreach ($keys as $key) {
            $this->data[$key] = Setting::get($key);
        }

        $this->form->fill($this->data);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Genel')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('site_title')
                            ->label('Site Başlığı')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('site_description_tr')
                            ->label('Meta Açıklama (TR)'),
                        Forms\Components\Textarea::make('site_description_en')
                            ->label('Meta Açıklama (EN)'),
                        Forms\Components\FileUpload::make('og_image')
                            ->label('Varsayılan OG Görseli')
                            ->image()
                            ->directory('settings')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                    ]),

                Forms\Components\Section::make('Hero')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('hero_title_tr')
                            ->label('Hero Başlık (TR)'),
                        Forms\Components\TextInput::make('hero_title_en')
                            ->label('Hero Başlık (EN)'),
                        Forms\Components\Textarea::make('hero_subtitle_tr')
                            ->label('Hero Alt Başlık (TR)'),
                        Forms\Components\Textarea::make('hero_subtitle_en')
                            ->label('Hero Alt Başlık (EN)'),
                    ]),

                Forms\Components\Section::make('Hakkımda')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('profile_photo')
                            ->label('Profil Fotoğrafı')
                            ->image()
                            ->directory('settings')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('about_text_tr')
                            ->label('Hakkımda Metni (TR)')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('about_text_en')
                            ->label('Hakkımda Metni (EN)')
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('cv_file_tr')
                            ->label('CV (PDF, TR)')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('settings'),
                        Forms\Components\FileUpload::make('cv_file_en')
                            ->label('CV (PDF, EN)')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('settings'),
                    ]),

                Forms\Components\Section::make('İletişim & Sosyal Medya')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('email')
                            ->label('E-posta')
                            ->email(),
                        Forms\Components\TextInput::make('phone')
                            ->label('Telefon'),
                        Forms\Components\TextInput::make('github_url')
                            ->label('GitHub URL')
                            ->url(),
                        Forms\Components\TextInput::make('linkedin_url')
                            ->label('LinkedIn URL')
                            ->url(),
                        Forms\Components\TextInput::make('twitter_url')
                            ->label('Twitter/X URL')
                            ->url(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();

        foreach ($state as $key => $value) {
            Setting::set($key, $value);
        }

        Notification::make()
            ->title('Ayarlar kaydedildi')
            ->success()
            ->send();
    }
}
