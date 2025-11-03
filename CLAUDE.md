# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Laravel 12 application using Inertia.js with React as the frontend framework. The stack includes:

- **Laravel 12** with Inertia.js adapter
- **React 18** for frontend UI
- **Laravel Breeze** for authentication scaffolding
- **Tailwind CSS** for styling
- **shadcn/ui** for pre-built React components (New York style)
- **Pest** for testing
- **Laravel Pint** for PHP code style
- **Ziggy** for Laravel route access in JavaScript

## Development Commands

### Running the Application

```bash
# Start all development services (server, queue, logs, vite)
composer dev

# Alternatively, run services individually:
php artisan serve              # Development server
php artisan queue:listen       # Queue worker
php artisan pail               # Log viewer
npm run dev                    # Vite dev server for frontend assets
```

### Testing

```bash
# Run all tests
composer test

# Run tests with Pest directly
php artisan test

# Run specific test file
php artisan test tests/Feature/ExampleTest.php

# Run specific test by name
php artisan test --filter test_name
```

### Frontend Build

```bash
# Development
npm run dev

# Production build
npm run build
```

### Code Quality

```bash
# Laravel Pint (PHP code style fixer)
./vendor/bin/pint

# Run Pint on specific file/directory
./vendor/bin/pint app/Http/Controllers
```

## Architecture

### Backend (Laravel)

- **Routes**: Defined in `routes/web.php` (web routes) and `routes/auth.php` (authentication routes)
- **Controllers**: Located in `app/Http/Controllers/`
  - `Auth/` - Authentication controllers provided by Breeze
  - `ProfileController.php` - User profile management
  - `DashboardController.php` - Dashboard logic
  - `ProjectController.php` - Project CRUD operations
  - `TaskController.php` - Task CRUD operations
- **Models**: Located in `app/Models/`
  - `User.php` - User model with roles
  - `Project.php` - Project model with status tracking and relationships
  - `Task.php` - Task model with priority/status and relationships
- **Enums**: Located in `app/Enums/`
  - `UserRole.php` - User role enumeration
  - `ProjectStatus.php` - Project status enumeration (ACTIVE, COMPLETED, etc.)
  - `TaskStatus.php` - Task status enumeration (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
  - `TaskPriority.php` - Task priority enumeration
- **Services**: Located in `app/Services/`
  - `ProjectService.php` - Business logic for project management
  - `TaskService.php` - Business logic for task management
- **API Resources**: Located in `app/Http/Resources/`
  - `UserResource.php` - Transforms User model for API responses
  - `ProjectResource.php` - Transforms Project model for API responses
  - `TaskResource.php` - Transforms Task model for API responses
- **Form Requests**: Located in `app/Http/Requests/`
  - `StoreProjectRequest.php`, `UpdateProjectRequest.php` - Project validation
  - `StoreTaskRequest.php`, `UpdateTaskRequest.php` - Task validation
- **Policies**: Located in `app/Policies/`
  - `ProjectPolicy.php` - Authorization logic for projects
  - `TaskPolicy.php` - Authorization logic for tasks
- **Middleware**: Located in `app/Http/Middleware/`
- **Database**: Uses SQLite (`database/database.sqlite`)
  - Migrations in `database/migrations/`
  - Factories in `database/factories/`
  - Seeders in `database/seeders/`

### Frontend (React + Inertia.js)

- **Entry Point**: `resources/js/app.jsx` - Configures Inertia.js app
- **Pages**: `resources/js/Pages/` - Inertia page components (one per route)
  - `Auth/` - Authentication pages (Login, Register, etc.)
  - `Profile/` - Profile management pages
  - `Dashboard.jsx` - Main dashboard
  - `Projects/` - Project CRUD pages (Index, Create, Edit, Show)
  - `Tasks/` - Task CRUD pages (Index, Create, Edit, Show)
  - `Welcome.jsx` - Public landing page
- **Layouts**: `resources/js/Layouts/` - Shared layout components
  - `AuthenticatedLayout.jsx` - Layout for authenticated users
  - `GuestLayout.jsx` - Layout for guest users
- **Components**: `resources/js/Components/` - Reusable React components
  - `ui/` - shadcn/ui components (button, card, dialog, etc.)
  - `Dashboard/` - Dashboard-specific components (StatCard, TasksByStatus, etc.)
  - `Projects/` - Project-specific components (ProjectCard, ProjectList, ProjectForm)
  - `Tasks/` - Task-specific components (TaskCard, TaskList, TaskForm, TaskStatusBadge)
  - Breeze components (TextInput, InputLabel, PrimaryButton, etc.)
- **Hooks**: `resources/js/hooks/` - Custom React hooks
  - `use-toast.js` - Toast notification hook
  - `use-mobile.jsx` - Mobile detection hook
- **Utilities**: `resources/js/lib/` - Utility functions (including `cn()` for className merging)
- **Styles**: `resources/css/app.css` - Tailwind CSS entry point

**Path Aliases** (configured in `jsconfig.json` and `components.json`):
- `@/*` → `resources/js/*`
- `@/components` → `resources/js/Components`
- `@/components/ui` → `resources/js/Components/ui`
- `@/lib` → `resources/js/lib`
- `@/hooks` → `resources/js/hooks`

### Inertia.js Pattern

This app uses Inertia.js to connect Laravel backend with React frontend:

- Controllers return `Inertia::render('PageName', $data)` instead of views
- Pages are React components in `resources/js/Pages/`
- Data flows from controller to React component as props
- Forms use Inertia's form helpers for seamless POST/PATCH/DELETE requests
- Page components are auto-loaded based on route via `resolvePageComponent()`

### Ziggy Routes

This app uses Tightenco Ziggy for accessing Laravel routes in JavaScript:

- Use `route('route.name')` in React components to generate URLs
- Route definitions from `routes/web.php` are available on the frontend

### shadcn/ui Components

This project uses shadcn/ui (New York style) for pre-built, customizable React components:

- Components are located in `resources/js/Components/ui/`
- Configuration is in `components.json`
- Uses Radix UI primitives under the hood
- Styling with Tailwind CSS and CSS variables
- Use the `cn()` utility from `@/lib/utils` for className merging

To add new shadcn/ui components, you would typically use:
```bash
npx shadcn@latest add [component-name]
```

## Data Model Relationships

The application has a task management system with the following key relationships:

1. **User → Projects** (one-to-many): A user can own multiple projects
2. **User → Tasks** (one-to-many): A user can be assigned to multiple tasks
3. **Project → Tasks** (one-to-many): A project can have multiple tasks
4. **Project → User** (belongs-to): Each project belongs to a user (owner)
5. **Task → Project** (belongs-to): Each task belongs to a project
6. **Task → User** (belongs-to): Each task can be assigned to a user (nullable)

### Eloquent Query Scopes

Models include reusable query scopes for common filters:

**Project scopes:**
- `Project::active()` - Get active projects
- `Project::completed()` - Get completed projects

**Task scopes:**
- `Task::pending()` - Get pending tasks
- `Task::inProgress()` - Get in-progress tasks
- `Task::completed()` - Get completed tasks
- `Task::highPriority()` - Get high priority tasks
- `Task::overdue()` - Get overdue tasks
- `Task::dueSoon()` - Get tasks due within 7 days

### Model Computed Attributes

**Project:**
- `$project->progress` - Returns completion percentage based on tasks (0-100)

**Task:**
- `$task->is_overdue` - Returns boolean if task is overdue
- `$task->days_until_due` - Returns integer days until due date

### Service Layer Pattern

The application uses a service layer to encapsulate business logic:

**ProjectService** (`app/Services/ProjectService.php`):
- `getUserProjects()` - Get paginated projects for a user
- `getActiveProjects()` - Get all active projects
- `createProject()` - Create a new project
- `updateProject()` - Update an existing project
- `deleteProject()` - Delete a project and all its tasks
- `getProjectDetails()` - Get project with full details including tasks and stats
- `getProjectStats()` - Get project statistics
- `searchProjects()` - Search projects by name or description
- `archiveProject()` - Archive a project
- `completeProject()` - Mark project as completed

**TaskService** (`app/Services/TaskService.php`):
- Similar methods for task management

### API Resources

The application uses API Resources to transform models into consistent JSON responses:

- `UserResource` - Transforms User model, hides sensitive fields
- `ProjectResource` - Transforms Project model with relationships
- `TaskResource` - Transforms Task model with relationships

These are used in controllers to format data sent to Inertia.js pages.

## Key Configuration Files

- `vite.config.js` - Vite bundler configuration with Laravel plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `phpunit.xml` - PHPUnit/Pest test configuration
- `composer.json` - PHP dependencies and scripts
- `package.json` - Node.js dependencies and scripts
- `jsconfig.json` - JavaScript path aliases configuration
- `components.json` - shadcn/ui configuration

## Database

The application uses SQLite by default. The database file is at `database/database.sqlite`.

To reset and reseed the database:

```bash
php artisan migrate:fresh --seed
```

## Authentication

Authentication is handled by Laravel Breeze with Inertia.js stack:

- Authentication routes are in `routes/auth.php`
- Auth controllers are in `app/Http/Controllers/Auth/`
- Auth pages (React) are in `resources/js/Pages/Auth/`
- Uses Laravel Sanctum for API authentication

## Route Patterns

The application uses Laravel's resource routing for CRUD operations:

```php
Route::resource('projects', ProjectController::class);
Route::resource('tasks', TaskController::class);
```

Resource routes automatically generate:
- `index` - GET /projects (list all)
- `create` - GET /projects/create (show form)
- `store` - POST /projects (create new)
- `show` - GET /projects/{id} (view one)
- `edit` - GET /projects/{id}/edit (show edit form)
- `update` - PATCH/PUT /projects/{id} (update)
- `destroy` - DELETE /projects/{id} (delete)
