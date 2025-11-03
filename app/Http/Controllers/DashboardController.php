<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Services\ProjectService;
use App\Services\TaskService;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Dashboard Controller
 *
 * Displays dashboard with statistics and recent activity.
 * Similar to page components in Next.js but handles data loading server-side.
 */
class DashboardController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private TaskService $taskService
    ) {}

    /**
     * Display the dashboard
     */
    public function index(\Illuminate\Http\Request $request): Response
    {
        $user = $request->user();

        // Get statistics
        $projectStats = [
            'total' => $user->projects()->count(),
            'active' => $user->projects()->active()->count(),
            'completed' => $user->projects()->completed()->count(),
        ];

        $taskStats = $this->taskService->getUserTaskStats($user);
        $assignedTaskStats = $this->taskService->getAssignedTaskStats($user);

        // Get recent data
        // Note: paginate() returns a LengthAwarePaginator, so we need to get items
        $recentProjects = $this->projectService->getUserProjects($user, 5)->items();
        $recentTasks = $this->taskService->getUserTasks($user, 10)->items();
        $overdueTasks = $this->taskService->getOverdueTasks($user);
        $tasksDueSoon = $this->taskService->getTasksDueSoon($user);

        return Inertia::render('Dashboard', [
            'stats' => [
                'projects' => $projectStats,
                'tasks' => $taskStats,
                'assigned_tasks' => $assignedTaskStats,
            ],
            'recent_projects' => ProjectResource::collection($recentProjects)->resolve(),
            'recent_tasks' => TaskResource::collection($recentTasks)->resolve(),
            'overdue_tasks' => TaskResource::collection($overdueTasks)->resolve(),
            'tasks_due_soon' => TaskResource::collection($tasksDueSoon)->resolve(),
        ]);
    }
}
