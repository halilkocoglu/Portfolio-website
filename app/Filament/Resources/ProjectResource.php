<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

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
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        Forms\Components\TextInput::make('title_en')
                            ->label('Başlık (EN)'),
                        Forms\Components\Textarea::make('description_tr')
                            ->label('Açıklama (TR)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description_en')
                            ->label('Açıklama (EN)')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
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

                Forms\Components\Section::make('Görseller')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Kapak Görseli')
                            ->image()
                            ->directory('projects')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                        Forms\Components\FileUpload::make('mobile_image')
                            ->label('Mobil Görsel')
                            ->image()
                            ->directory('projects')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
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
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Görsel'),
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
