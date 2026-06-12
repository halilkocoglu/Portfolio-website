<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ServicesSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Hizmetler Sayfası';

    protected static ?string $title = 'Hizmetler Sayfası';

    protected static ?int $navigationSort = 7;

    protected static string $view = 'filament.pages.services-settings';

    /**
     * @var array<string, mixed>
     */
    public array $data = [];

    /**
     * Setting key'leri JSON olarak saklanan repeater alanları.
     *
     * @var list<string>
     */
    protected array $jsonKeys = [
        'services_packages_tr', 'services_packages_en',
        'services_why_items_tr', 'services_why_items_en',
        'services_faq_items_tr', 'services_faq_items_en',
    ];

    public function mount(): void
    {
        $keys = [
            'services_title_tr', 'services_title_en',
            'services_subtitle_tr', 'services_subtitle_en',
            'services_intro_tr', 'services_intro_en',
            'services_packages_title_tr', 'services_packages_title_en',
            'services_packages_tr', 'services_packages_en',
            'services_why_title_tr', 'services_why_title_en',
            'services_why_items_tr', 'services_why_items_en',
            'services_faq_title_tr', 'services_faq_title_en',
            'services_faq_items_tr', 'services_faq_items_en',
            'services_cta_title_tr', 'services_cta_title_en',
            'services_cta_subtitle_tr', 'services_cta_subtitle_en',
            'services_cta_button_tr', 'services_cta_button_en',
        ];

        foreach ($keys as $key) {
            $value = Setting::get($key);

            $this->data[$key] = in_array($key, $this->jsonKeys, true)
                ? (json_decode((string) $value, true) ?? [])
                : $value;
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
                        Forms\Components\TextInput::make('services_title_tr')
                            ->label('Sayfa Başlığı (TR)'),
                        Forms\Components\TextInput::make('services_title_en')
                            ->label('Sayfa Başlığı (EN)'),
                        Forms\Components\TextInput::make('services_subtitle_tr')
                            ->label('Alt Başlık (TR)'),
                        Forms\Components\TextInput::make('services_subtitle_en')
                            ->label('Alt Başlık (EN)'),
                        Forms\Components\Textarea::make('services_intro_tr')
                            ->label('Giriş Metni (TR)')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('services_intro_en')
                            ->label('Giriş Metni (EN)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Hizmet Paketleri')
                    ->schema([
                        Forms\Components\TextInput::make('services_packages_title_tr')
                            ->label('Bölüm Başlığı (TR)'),
                        Forms\Components\TextInput::make('services_packages_title_en')
                            ->label('Bölüm Başlığı (EN)'),
                        Forms\Components\Repeater::make('services_packages_tr')
                            ->label('Paketler (TR)')
                            ->schema([
                                Forms\Components\TextInput::make('title')->label('Paket Adı')->required(),
                                Forms\Components\Textarea::make('desc')->label('Açıklama')->required(),
                                Forms\Components\Repeater::make('features')
                                    ->label('Özellikler')
                                    ->simple(
                                        Forms\Components\TextInput::make('feature')->required(),
                                    ),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->collapsible(),
                        Forms\Components\Repeater::make('services_packages_en')
                            ->label('Paketler (EN)')
                            ->schema([
                                Forms\Components\TextInput::make('title')->label('Package Name')->required(),
                                Forms\Components\Textarea::make('desc')->label('Description')->required(),
                                Forms\Components\Repeater::make('features')
                                    ->label('Features')
                                    ->simple(
                                        Forms\Components\TextInput::make('feature')->required(),
                                    ),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->collapsible(),
                    ]),

                Forms\Components\Section::make('Neden Beni Seçmelisiniz')
                    ->schema([
                        Forms\Components\TextInput::make('services_why_title_tr')
                            ->label('Bölüm Başlığı (TR)'),
                        Forms\Components\TextInput::make('services_why_title_en')
                            ->label('Bölüm Başlığı (EN)'),
                        Forms\Components\Repeater::make('services_why_items_tr')
                            ->label('Maddeler (TR)')
                            ->schema([
                                Forms\Components\TextInput::make('title')->label('Başlık')->required(),
                                Forms\Components\Textarea::make('desc')->label('Açıklama')->required(),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->collapsible(),
                        Forms\Components\Repeater::make('services_why_items_en')
                            ->label('Maddeler (EN)')
                            ->schema([
                                Forms\Components\TextInput::make('title')->label('Title')->required(),
                                Forms\Components\Textarea::make('desc')->label('Description')->required(),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->collapsible(),
                    ]),

                Forms\Components\Section::make('Sıkça Sorulan Sorular')
                    ->schema([
                        Forms\Components\TextInput::make('services_faq_title_tr')
                            ->label('Bölüm Başlığı (TR)'),
                        Forms\Components\TextInput::make('services_faq_title_en')
                            ->label('Bölüm Başlığı (EN)'),
                        Forms\Components\Repeater::make('services_faq_items_tr')
                            ->label('Sorular (TR)')
                            ->schema([
                                Forms\Components\TextInput::make('q')->label('Soru')->required(),
                                Forms\Components\Textarea::make('a')->label('Cevap')->required(),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['q'] ?? null)
                            ->collapsible(),
                        Forms\Components\Repeater::make('services_faq_items_en')
                            ->label('Sorular (EN)')
                            ->schema([
                                Forms\Components\TextInput::make('q')->label('Question')->required(),
                                Forms\Components\Textarea::make('a')->label('Answer')->required(),
                            ])
                            ->itemLabel(fn (array $state): ?string => $state['q'] ?? null)
                            ->collapsible(),
                    ]),

                Forms\Components\Section::make('Çağrı (CTA)')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('services_cta_title_tr')
                            ->label('CTA Başlığı (TR)'),
                        Forms\Components\TextInput::make('services_cta_title_en')
                            ->label('CTA Başlığı (EN)'),
                        Forms\Components\Textarea::make('services_cta_subtitle_tr')
                            ->label('CTA Açıklaması (TR)'),
                        Forms\Components\Textarea::make('services_cta_subtitle_en')
                            ->label('CTA Açıklaması (EN)'),
                        Forms\Components\TextInput::make('services_cta_button_tr')
                            ->label('CTA Buton Metni (TR)'),
                        Forms\Components\TextInput::make('services_cta_button_en')
                            ->label('CTA Buton Metni (EN)'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();

        foreach ($state as $key => $value) {
            if (in_array($key, $this->jsonKeys, true)) {
                $value = json_encode(
                    array_map(
                        fn (array $item) => isset($item['features'])
                            ? [...$item, 'features' => array_values($item['features'])]
                            : $item,
                        $value,
                    ),
                    JSON_UNESCAPED_UNICODE,
                );
            }

            Setting::set($key, $value);
        }

        Notification::make()
            ->title('Hizmetler sayfası kaydedildi')
            ->success()
            ->send();
    }
}
