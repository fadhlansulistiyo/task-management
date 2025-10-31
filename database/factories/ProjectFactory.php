<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * Factories in Laravel are similar to Prisma's seed data generation.
     * They generate fake data for testing and development.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-6 months', 'now');
        $endDate = fake()->optional(0.7)->dateTimeBetween($startDate, '+6 months');

        return [
            'user_id' => User::factory(),
            'name' => fake()->sentence(3),
            'description' => fake()->optional(0.8)->paragraph(),
            'status' => fake()->randomElement(ProjectStatus::cases())->value,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }

    /**
     * State: Create an active project
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::ACTIVE->value,
        ]);
    }

    /**
     * State: Create a completed project
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::COMPLETED->value,
            'end_date' => fake()->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * State: Create an archived project
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::ARCHIVED->value,
            'end_date' => fake()->dateTimeBetween('-6 months', '-3 months'),
        ]);
    }

    /**
     * State: Create a project for a specific user
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }
}
