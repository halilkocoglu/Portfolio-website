<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SkillResource\Pages;
use App\Models\Skill;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SkillResource extends Resource
{
    protected static ?string $model = Skill::class;

    protected static ?string $navigationIcon = 'heroicon-o-bolt';

    protected static ?string $navigationLabel = 'Yetenekler';

    protected static ?string $modelLabel = 'Yetenek';

    protected static ?string $pluralModelLabel = 'Yetenekler';

    protected static ?int $navigationSort = 3;

    public const CATEGORIES = [
        'frontend' => 'Frontend',
        'backend' => 'Backend',
        'devops' => 'DevOps',
        'database' => 'Veritabanı',
        'design' => 'Tasarım',
        'tool' => 'Araç',
        'other' => 'Diğer',
    ];

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Ad')
                    ->required(),
                Forms\Components\Select::make('category')
                    ->label('Kategori')
                    ->options(self::CATEGORIES)
                    ->required(),
                Forms\Components\FileUpload::make('icon')
                    ->label('İkon')
                    ->image()
                    ->directory('skills')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                Forms\Components\TextInput::make('level')
                    ->label('Seviye (1-5)')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5),
                Forms\Components\TextInput::make('sort_order')
                    ->label('Sıra')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->label('Aktif')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Ad')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Kategori')
                    ->formatStateUsing(fn (string $state) => self::CATEGORIES[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('level')
                    ->label('Seviye')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Sıra')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Kategori')
                    ->options(self::CATEGORIES),
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
            'index' => Pages\ListSkills::route('/'),
            'create' => Pages\CreateSkill::route('/create'),
            'edit' => Pages\EditSkill::route('/{record}/edit'),
        ];
    }
}
