<?php

namespace Database\Factories;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(TaskStatus::cases());
        $dueDate = fake()->optional(0.8)->dateTimeBetween('now', '+3 months');

        // If status is completed, set completed_at timestamp
        $completedAt = $status === TaskStatus::COMPLETED
            ? fake()->dateTimeBetween('-1 month', 'now')
            : null;

        return [
            'project_id' => Project::factory(),
            'assigned_to' => fake()->optional(0.7)->randomElement([
                User::factory(),
                null
            ]),
            'title' => fake()->sentence(4),
            'description' => fake()->optional(0.7)->paragraph(),
            'priority' => fake()->randomElement(TaskPriority::cases())->value,
            'status' => $status->value,
            'due_date' => $dueDate,
            'completed_at' => $completedAt,
        ];
    }

    /**
     * State: Create a pending task
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TaskStatus::PENDING->value,
            'completed_at' => null,
        ]);
    }

    /**
     * State: Create an in-progress task
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TaskStatus::IN_PROGRESS->value,
            'completed_at' => null,
        ]);
    }

    /**
     * State: Create a completed task
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TaskStatus::COMPLETED->value,
            'completed_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * State: Create a high priority task
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => TaskPriority::HIGH->value,
        ]);
    }

    /**
     * State: Create a low priority task
     */
    public function lowPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => TaskPriority::LOW->value,
        ]);
    }

    /**
     * State: Create an overdue task
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => TaskStatus::PENDING->value,
            'due_date' => fake()->dateTimeBetween('-1 month', '-1 day'),
            'completed_at' => null,
        ]);
    }

    /**
     * State: Create a task for a specific project
     */
    public function forProject(Project $project): static
    {
        return $this->state(fn (array $attributes) => [
            'project_id' => $project->id,
        ]);
    }

    /**
     * State: Create a task assigned to a specific user
     */
    public function assignedTo(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'assigned_to' => $user->id,
        ]);
    }
}
