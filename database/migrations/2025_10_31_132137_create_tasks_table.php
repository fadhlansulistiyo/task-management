<?php

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            // Foreign key to projects table (task belongs to project)
            $table->foreignId('project_id')
                ->constrained()
                ->onDelete('cascade');

            // Foreign key to users table (task assigned to user, nullable)
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');

            // Task details
            $table->string('title');
            $table->text('description')->nullable();

            // Task priority with default value
            $table->string('priority')
                ->default(TaskPriority::MEDIUM->value);

            // Task status with default value
            $table->string('status')
                ->default(TaskStatus::PENDING->value);

            // Task timeline
            $table->date('due_date')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();

            // Indexes for better query performance
            $table->index('project_id');
            $table->index('assigned_to');
            $table->index('status');
            $table->index('priority');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
