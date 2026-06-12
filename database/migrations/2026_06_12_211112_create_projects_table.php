<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title_tr');
            $table->string('title_en')->nullable();
            $table->string('slug')->unique();
            $table->text('description_tr');
            $table->text('description_en')->nullable();
            $table->json('tech_stack');
            $table->enum('category', ['web', 'mobile', 'api', 'other'])->default('web');
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('image')->nullable();
            $table->string('mobile_image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
