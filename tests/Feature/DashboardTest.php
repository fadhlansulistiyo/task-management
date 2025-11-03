<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('dashboard page renders successfully for authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->get(route('dashboard'));

    $response->assertStatus(200);
});

test('dashboard page contains required data structure', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('Dashboard')
        ->has('stats')
        ->has('stats.projects')
        ->has('stats.tasks')
        ->has('stats.assigned_tasks')
        ->has('recent_projects')
        ->has('recent_tasks')
        ->has('overdue_tasks')
        ->has('tasks_due_soon')
    );
});

test('dashboard stats show correct project counts', function () {
    $user = User::factory()->create();

    // Create some projects
    $user->projects()->createMany([
        ['name' => 'Project 1', 'status' => 'active', 'description' => 'Test'],
        ['name' => 'Project 2', 'status' => 'completed', 'description' => 'Test'],
        ['name' => 'Project 3', 'status' => 'active', 'description' => 'Test'],
    ]);

    $response = $this->actingAs($user)
        ->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->where('stats.projects.total', 3)
        ->where('stats.projects.active', 2)
        ->where('stats.projects.completed', 1)
    );
});

test('dashboard redirects unauthenticated users to login', function () {
    $response = $this->get(route('dashboard'));

    $response->assertRedirect(route('login'));
});

test('dashboard with projects displays correct data', function () {
    $user = User::factory()->create();

    // Create a project with task
    $project = $user->projects()->create([
        'name' => 'Test Project',
        'status' => 'active',
        'description' => 'Test Description',
    ]);

    $response = $this->actingAs($user)
        ->get(route('dashboard'));

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->has('recent_projects')
        );
});
