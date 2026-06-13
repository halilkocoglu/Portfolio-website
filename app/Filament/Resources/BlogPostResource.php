<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Blog';

    protected static ?string $modelLabel = 'Blog Yazısı';

    protected static ?string $pluralModelLabel = 'Blog Yazıları';

    protected static ?int $navigationSort = 4;

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
                        Forms\Components\Textarea::make('excerpt_tr')
                            ->label('Özet (TR)')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('excerpt_en')
                            ->label('Özet (EN)')
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('content_tr')
                            ->label('İçerik (TR)')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('content_en')
                            ->label('İçerik (EN)')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Yayın')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Kapak Görseli')
                            ->image()
                            ->directory('blog')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Yayın Tarihi')
                            ->timezone('Europe/Istanbul'),
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
                    ->searchable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Yayın Tarihi')
                    ->dateTime('d.m.Y H:i')
                    ->timezone('Europe/Istanbul')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->defaultSort('published_at', 'desc')
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
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
