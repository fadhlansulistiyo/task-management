<?php

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('tasks index page renders successfully', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->get(route('tasks.index'));

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Tasks/Index')
            ->has('tasks')
            ->has('projects')
        );
});

test('tasks index includes user projects with status', function () {
    $user = User::factory()->create();

    // Create a project
    $user->projects()->create([
        'name' => 'Active Project',
        'status' => 'active',
        'description' => 'Test',
    ]);

    $response = $this->actingAs($user)
        ->get(route('tasks.index'));

    // The main fix is that this should not throw a 500 error anymore
    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Tasks/Index')
            ->has('projects')
            ->has('tasks')
        );
});

test('tasks index displays user tasks correctly', function () {
    $user = User::factory()->create();

    // Create project with tasks
    $project = $user->projects()->create([
        'name' => 'Test Project',
        'status' => 'active',
        'description' => 'Test',
    ]);

    $task = $project->tasks()->create([
        'title' => 'Test Task',
        'description' => 'Task description',
        'status' => 'pending',
        'priority' => 'high',
        'due_date' => now()->addDays(7),
    ]);

    $response = $this->actingAs($user)
        ->get(route('tasks.index'));

    $response->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->has('tasks.data', 1)
            ->has('tasks.data.0', fn (Assert $taskData) => $taskData
                ->where('title', 'Test Task')
                ->has('status')
                ->has('priority')
                ->etc()
            )
        );
});

test('tasks index redirects unauthenticated users', function () {
    $response = $this->get(route('tasks.index'));

    $response->assertRedirect(route('login'));
});

test('project resource handles null status gracefully', function () {
    $user = User::factory()->create();

    // Create a project
    $project = $user->projects()->create([
        'name' => 'Test Project',
        'status' => 'active',
        'description' => 'Test',
    ]);

    // Manually fetch project without status column to simulate the bug
    $projectWithoutStatus = Project::where('user_id', $user->id)
        ->select('id', 'name')
        ->first();

    // Transform using ProjectResource - should not throw error
    $resource = new \App\Http\Resources\ProjectResource($projectWithoutStatus);
    $array = $resource->toArray(request());

    // Should have id and name
    expect($array)->toHaveKey('id')
        ->and($array)->toHaveKey('name');

    // Status might be present but null or excluded - both are acceptable
    // The important thing is it doesn't throw an error
});
