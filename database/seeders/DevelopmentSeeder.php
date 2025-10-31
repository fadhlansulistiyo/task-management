<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Development Seeder
 *
 * Seeds the database with sample data for development and testing.
 * This is similar to Prisma's seed scripts.
 *
 * Run with: php artisan db:seed --class=DevelopmentSeeder
 * Or: php artisan migrate:fresh --seed
 */
class DevelopmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Seeding development data...');

        // Create an admin user for testing
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $this->command->info('✓ Created admin user (admin@example.com / password)');

        // Create a regular user for testing
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
        ]);
        $this->command->info('✓ Created regular user (user@example.com / password)');

        // Create 5 additional random users
        $additionalUsers = User::factory(5)->create();
        $this->command->info('✓ Created 5 additional users');

        // Collect all users for task assignment
        $allUsers = collect([$admin, $user])->merge($additionalUsers);

        // Create projects for admin user
        $adminProjects = Project::factory(3)->active()->create([
            'user_id' => $admin->id,
        ]);

        // Create one completed project for admin
        $completedProject = Project::factory()->completed()->create([
            'user_id' => $admin->id,
        ]);

        $this->command->info('✓ Created 4 projects for admin user');

        // Create projects for regular user
        $userProjects = Project::factory(2)->active()->create([
            'user_id' => $user->id,
        ]);

        $this->command->info('✓ Created 2 projects for regular user');

        // Combine all projects
        $allProjects = $adminProjects->merge([$completedProject])->merge($userProjects);

        // Create tasks for each project
        foreach ($allProjects as $project) {
            // Create 3-8 tasks per project
            $taskCount = rand(3, 8);

            for ($i = 0; $i < $taskCount; $i++) {
                // Randomly assign tasks to users
                $assignedTo = $allUsers->random();

                Task::factory()->create([
                    'project_id' => $project->id,
                    'assigned_to' => $assignedTo->id,
                ]);
            }
        }

        $totalTasks = Task::count();
        $this->command->info("✓ Created {$totalTasks} tasks across all projects");

        // Create some specific task scenarios for testing

        // 1. High priority overdue task
        Task::factory()->highPriority()->overdue()->create([
            'project_id' => $adminProjects->first()->id,
            'assigned_to' => $user->id,
            'title' => 'Critical Bug Fix - System Downtime',
        ]);

        // 2. Pending task with no assignee
        Task::factory()->pending()->create([
            'project_id' => $adminProjects->first()->id,
            'assigned_to' => null,
            'title' => 'Review Documentation Updates',
        ]);

        // 3. In progress task
        Task::factory()->inProgress()->create([
            'project_id' => $userProjects->first()->id,
            'assigned_to' => $user->id,
            'title' => 'Implement User Authentication',
        ]);

        $this->command->info('✓ Created special scenario tasks for testing');

        // Display summary
        $this->command->newLine();
        $this->command->info('=== Seeding Complete ===');
        $this->command->table(
            ['Resource', 'Count'],
            [
                ['Users', User::count()],
                ['Projects', Project::count()],
                ['Tasks', Task::count()],
            ]
        );

        $this->command->newLine();
        $this->command->info('Login credentials:');
        $this->command->info('Admin: admin@example.com / password');
        $this->command->info('User:  user@example.com / password');
    }
}
