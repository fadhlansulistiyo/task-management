<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Project Model
 *
 * Represents a project in the task management system.
 * Each project belongs to a user (owner) and can have multiple tasks.
 *
 * Similar to Prisma models, Eloquent models define:
 * - Table structure (via fillable/casts)
 * - Relationships (via methods)
 * - Business logic (via methods and scopes)
 */
class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * This is similar to Prisma's field definitions but provides
     * protection against mass assignment vulnerabilities.
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'status',
        'start_date',
        'end_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * This automatically converts database values to PHP types.
     * Similar to Prisma's type system but happens at runtime.
     */
    protected $casts = [
        'status' => ProjectStatus::class,
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Relationship: Project belongs to a User (owner)
     *
     * Similar to Prisma's @relation:
     * user User @relation(fields: [user_id], references: [id])
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: Project has many Tasks
     *
     * Similar to Prisma's:
     * tasks Task[]
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Query Scope: Get only active projects
     *
     * Usage: Project::active()->get()
     * This is a reusable query filter, similar to creating
     * reusable where clauses in Prisma.
     */
    public function scopeActive($query)
    {
        return $query->where('status', ProjectStatus::ACTIVE);
    }

    /**
     * Query Scope: Get only completed projects
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', ProjectStatus::COMPLETED);
    }

    /**
     * Accessor: Get the progress percentage of the project
     *
     * This is a computed property based on task completion.
     * Similar to Prisma's virtual fields or getters.
     */
    public function getProgressAttribute(): int
    {
        $totalTasks = $this->tasks()->count();

        if ($totalTasks === 0) {
            return 0;
        }

        $completedTasks = $this->tasks()
            ->where('status', \App\Enums\TaskStatus::COMPLETED)
            ->count();

        return (int) round(($completedTasks / $totalTasks) * 100);
    }
}
