<?php

use App\Enums\ProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Foreign key to users table (project owner)
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Project details
            $table->string('name');
            $table->text('description')->nullable();

            // Project status with default value
            $table->string('status')
                ->default(ProjectStatus::ACTIVE->value);

            // Project timeline
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->timestamps();

            // Indexes for better query performance
            $table->index('user_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
