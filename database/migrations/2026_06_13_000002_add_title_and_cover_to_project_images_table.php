<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_images', function (Blueprint $table) {
            $table->string('title_tr')->nullable()->after('image');
            $table->string('title_en')->nullable()->after('title_tr');
            $table->boolean('is_cover')->default(false)->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('project_images', function (Blueprint $table) {
            $table->dropColumn(['title_tr', 'title_en', 'is_cover']);
        });
    }
};
