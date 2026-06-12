<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title_tr');
            $table->string('title_en')->nullable();
            $table->string('slug')->unique();
            $table->longText('content_tr');
            $table->longText('content_en')->nullable();
            $table->text('excerpt_tr')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->string('image')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
