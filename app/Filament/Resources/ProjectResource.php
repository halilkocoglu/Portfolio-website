<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Projeler';

    protected static ?string $modelLabel = 'Proje';

    protected static ?string $pluralModelLabel = 'Projeler';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('İçerik')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('title_tr')
                            ->label('Başlık (TR)')
                            ->required(),
                        Forms\Components\TextInput::make('title_en')
                            ->label('Başlık (EN)'),
                        Forms\Components\Textarea::make('description_tr')
                            ->label('Açıklama (TR)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description_en')
                            ->label('Açıklama (EN)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Detaylar')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TagsInput::make('tech_stack')
                            ->label('Kullanılan Teknolojiler')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'web' => 'Web',
                                'mobile' => 'Mobil',
                                'api' => 'API',
                                'other' => 'Diğer',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('sort_order')
                            ->label('Sıra')
                            ->required()
                            ->numeric()
                            ->default(0),
                        Forms\Components\TextInput::make('live_url')
                            ->label('Canlı Demo URL')
                            ->url(),
                        Forms\Components\TextInput::make('github_url')
                            ->label('GitHub URL')
                            ->url(),
                    ]),

                Forms\Components\Section::make('Mobil Görsel')
                    ->description('Mobil önizleme için özel olarak hazırlanmış tek görsel.')
                    ->schema([
                        Forms\Components\FileUpload::make('mobile_image')
                            ->label('Mobil Görsel')
                            ->image()
                            ->directory('projects')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                    ]),

                Forms\Components\Section::make('Görseller')
                    ->description('Proje görselleri. Sıralama için ok butonlarını kullanın. Görsellerden birini "Kapak Görseli" olarak işaretleyin — işaretlenen görsel proje kartlarında ve listelerde gösterilir. Her görsele isteğe bağlı bir başlık ve açıklama eklenebilir.')
                    ->schema([
                        Forms\Components\Repeater::make('images')
                            ->relationship()
                            ->label('Görseller')
                            ->orderColumn('sort_order')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->label('Görsel')
                                    ->image()
                                    ->directory('projects/gallery')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->required()
                                    ->columnSpanFull(),
                                Forms\Components\Toggle::make('is_cover')
                                    ->label('Kapak Görseli Olarak Kullan')
                                    ->live()
                                    ->columnSpanFull()
                                    ->afterStateUpdated(function (Forms\Set $set, Forms\Get $get, Forms\Components\Component $component, ?bool $state) {
                                        if (! $state) {
                                            return;
                                        }

                                        $path = explode('.', $component->getStatePath());
                                        $currentKey = $path[count($path) - 2];

                                        $items = $get('../../images') ?? [];
                                        foreach ($items as $key => $item) {
                                            $items[$key]['is_cover'] = $key === $currentKey;
                                        }
                                        $set('../../images', $items);
                                    }),
                                Forms\Components\TextInput::make('title_tr')
                                    ->label('Başlık (TR)'),
                                Forms\Components\TextInput::make('title_en')
                                    ->label('Başlık (EN)'),
                                Forms\Components\TextInput::make('caption_tr')
                                    ->label('Açıklama (TR)'),
                                Forms\Components\TextInput::make('caption_en')
                                    ->label('Açıklama (EN)'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderableWithButtons()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title_tr'] ?? $state['caption_tr'] ?? 'Görsel')
                            ->addActionLabel('Görsel Ekle'),
                    ]),

                Forms\Components\Section::make('Durum')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Öne Çıkan'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->with('images'))
            ->columns([
                Tables\Columns\ImageColumn::make('cover_image')
                    ->label('Görsel')
                    ->state(fn (Project $record): ?string => $record->cover_image),
                Tables\Columns\TextColumn::make('title_tr')
                    ->label('Başlık')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Kategori')
                    ->badge(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Öne Çıkan')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Sıra')
                    ->numeric()
                    ->sortable(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'web' => 'Web',
                        'mobile' => 'Mobil',
                        'api' => 'API',
                        'other' => 'Diğer',
                    ]),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Öne Çıkan'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
