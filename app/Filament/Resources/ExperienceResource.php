<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExperienceResource\Pages;
use App\Models\Experience;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ExperienceResource extends Resource
{
    protected static ?string $model = Experience::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Deneyimler';

    protected static ?string $modelLabel = 'Deneyim';

    protected static ?string $pluralModelLabel = 'Deneyimler';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('company')
                            ->label('Şirket')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('role_tr')
                            ->label('Pozisyon (TR)')
                            ->required(),
                        Forms\Components\TextInput::make('role_en')
                            ->label('Pozisyon (EN)'),
                        Forms\Components\Textarea::make('description_tr')
                            ->label('Açıklama (TR)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description_en')
                            ->label('Açıklama (EN)')
                            ->columnSpanFull(),
                        Forms\Components\TagsInput::make('technologies')
                            ->label('Teknolojiler')
                            ->columnSpanFull(),
                        Forms\Components\DatePicker::make('start_date')
                            ->label('Başlangıç Tarihi')
                            ->required(),
                        Forms\Components\DatePicker::make('end_date')
                            ->label('Bitiş Tarihi'),
                        Forms\Components\Toggle::make('is_current')
                            ->label('Devam Ediyor'),
                        Forms\Components\TextInput::make('sort_order')
                            ->label('Sıra')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company')
                    ->label('Şirket')
                    ->searchable(),
                Tables\Columns\TextColumn::make('role_tr')
                    ->label('Pozisyon')
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->label('Başlangıç')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->label('Bitiş')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_current')
                    ->label('Devam Ediyor')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Sıra')
                    ->numeric()
                    ->sortable(),
            ])
            ->defaultSort('start_date', 'desc')
            ->filters([])
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
            'index' => Pages\ListExperiences::route('/'),
            'create' => Pages\CreateExperience::route('/create'),
            'edit' => Pages\EditExperience::route('/{record}/edit'),
        ];
    }
}
