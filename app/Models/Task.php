<?php

namespace App\Models;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Task Model
 *
 * Represents a task within a project.
 * Each task belongs to a project and can be assigned to a user.
 */
class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'project_id',
        'assigned_to',
        'title',
        'description',
        'priority',
        'status',
        'due_date',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'priority' => TaskPriority::class,
        'status' => TaskStatus::class,
        'due_date' => 'date',
        'completed_at' => 'datetime',
    ];

    /**
     * Relationship: Task belongs to a Project
     *
     * Similar to Prisma's @relation:
     * project Project @relation(fields: [project_id], references: [id])
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Relationship: Task belongs to a User (assigned to)
     *
     * This is nullable - a task can be unassigned
     */
    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Query Scope: Get only pending tasks
     */
    public function scopePending($query)
    {
        return $query->where('status', TaskStatus::PENDING);
    }

    /**
     * Query Scope: Get only in-progress tasks
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', TaskStatus::IN_PROGRESS);
    }

    /**
     * Query Scope: Get only completed tasks
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', TaskStatus::COMPLETED);
    }

    /**
     * Query Scope: Get high priority tasks
     */
    public function scopeHighPriority($query)
    {
        return $query->where('priority', TaskPriority::HIGH);
    }

    /**
     * Query Scope: Get overdue tasks (past due date and not completed)
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
            ->whereNotIn('status', [TaskStatus::COMPLETED, TaskStatus::CANCELLED]);
    }

    /**
     * Query Scope: Get tasks due soon (within next N days)
     */
    public function scopeDueSoon($query, int $days = 7)
    {
        return $query->whereBetween('due_date', [now(), now()->addDays($days)])
            ->whereNotIn('status', [TaskStatus::COMPLETED, TaskStatus::CANCELLED]);
    }

    /**
     * Accessor: Check if task is overdue
     */
    public function getIsOverdueAttribute(): bool
    {
        if (!$this->due_date) {
            return false;
        }

        return $this->due_date->isPast() &&
            !in_array($this->status, [TaskStatus::COMPLETED, TaskStatus::CANCELLED]);
    }

    /**
     * Accessor: Get days until due date
     */
    public function getDaysUntilDueAttribute(): ?int
    {
        if (!$this->due_date) {
            return null;
        }

        return (int) now()->diffInDays($this->due_date, false);
    }

    /**
     * Mutator: Automatically set completed_at when status changes to completed
     */
    public function setStatusAttribute($value): void
    {
        $this->attributes['status'] = $value;

        // If status is being set to completed and completed_at is not set
        if ($value === TaskStatus::COMPLETED->value && !$this->completed_at) {
            $this->attributes['completed_at'] = now();
        }

        // If status is being changed from completed to something else, clear completed_at
        if ($value !== TaskStatus::COMPLETED->value && $this->completed_at) {
            $this->attributes['completed_at'] = null;
        }
    }
}
