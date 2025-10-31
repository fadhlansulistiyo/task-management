# Laravel Dashboard Template - Development Progress

## Phase 1: Database & Models (Backend Foundation) ✅

**Status**: COMPLETED
**Date**: October 31, 2025

---

## Overview

Phase 1 focused on building the foundational database structure and ORM models for the Task Management Dashboard. This phase demonstrates Laravel's Eloquent ORM, migrations, factories, and seeding system.

---

## Created Files

### 1. Enums (Type-Safe Constants)

Enums in Laravel provide type safety similar to TypeScript enums or union types in Next.js.

#### `app/Enums/UserRole.php`
- **Purpose**: Define user roles in the system
- **Values**: `admin`, `user`
- **Key Methods**:
  - `label()`: Get human-readable label
  - `values()`: Get all role values as array
- **Learning Note**: PHP 8.1+ backed enums provide type safety and prevent invalid values

#### `app/Enums/ProjectStatus.php`
- **Purpose**: Define project lifecycle states
- **Values**: `active`, `completed`, `archived`
- **Key Methods**:
  - `label()`: Get human-readable label
  - `color()`: Get Tailwind color class for UI
  - `values()`: Get all status values
- **Learning Note**: Helper methods in enums make them more useful than simple constants

#### `app/Enums/TaskStatus.php`
- **Purpose**: Define task workflow states
- **Values**: `pending`, `in_progress`, `completed`, `cancelled`
- **Key Methods**:
  - `label()`: Get human-readable label
  - `color()`: Get Tailwind color class for UI
  - `isFinal()`: Check if status is terminal state
  - `values()`: Get all status values
- **Learning Note**: Business logic methods in enums help encapsulate domain knowledge

#### `app/Enums/TaskPriority.php`
- **Purpose**: Define task priority levels
- **Values**: `low`, `medium`, `high`
- **Key Methods**:
  - `label()`: Get human-readable label
  - `color()`: Get Tailwind color class for UI
  - `weight()`: Get numeric weight for sorting
  - `values()`: Get all priority values

---

### 2. Migrations (Database Schema)

Migrations are Laravel's version control for your database, similar to Prisma migrations.

#### `database/migrations/2025_10_31_132034_add_role_to_users_table.php`
- **Purpose**: Add role column to existing users table
- **Changes**:
  - Added `role` column (string, default: 'user')
  - Positioned after email column
- **Rollback**: Drops role column
- **Learning Note**: Table migrations allow you to modify existing tables without data loss

#### `database/migrations/2025_10_31_132101_create_projects_table.php`
- **Purpose**: Create projects table
- **Schema**:
  - `id`: Primary key (bigint, auto-increment)
  - `user_id`: Foreign key to users (cascade on delete)
  - `name`: Project name (string, required)
  - `description`: Project description (text, nullable)
  - `status`: Project status (string, default: 'active')
  - `start_date`: Project start date (date, nullable)
  - `end_date`: Project end date (date, nullable)
  - `created_at`, `updated_at`: Timestamps
- **Indexes**: user_id, status (for query performance)
- **Learning Note**: Foreign keys ensure referential integrity; indexes improve query speed

#### `database/migrations/2025_10_31_132137_create_tasks_table.php`
- **Purpose**: Create tasks table
- **Schema**:
  - `id`: Primary key
  - `project_id`: Foreign key to projects (cascade on delete)
  - `assigned_to`: Foreign key to users (set null on delete, nullable)
  - `title`: Task title (string, required)
  - `description`: Task description (text, nullable)
  - `priority`: Task priority (string, default: 'medium')
  - `status`: Task status (string, default: 'pending')
  - `due_date`: Task deadline (date, nullable)
  - `completed_at`: Completion timestamp (timestamp, nullable)
  - `created_at`, `updated_at`: Timestamps
- **Indexes**: project_id, assigned_to, status, priority, due_date
- **Learning Note**: Multiple indexes on frequently queried columns drastically improve performance

---

### 3. Models (Eloquent ORM)

Models define the structure, relationships, and behavior of your data entities.

#### `app/Models/User.php` (Updated)
- **Purpose**: Represent users in the system (extends Laravel Breeze's User model)
- **Fillable**: name, email, password, role
- **Casts**: role → UserRole enum
- **Relationships**:
  - `projects()`: hasMany Project
  - `assignedTasks()`: hasMany Task (via assigned_to)
- **Helper Methods**:
  - `isAdmin()`: Check if user has admin role
  - `isUser()`: Check if user has regular user role
- **Learning Note**: The `fillable` property protects against mass assignment vulnerabilities

#### `app/Models/Project.php`
- **Purpose**: Represent projects in the task management system
- **Fillable**: user_id, name, description, status, start_date, end_date
- **Casts**:
  - status → ProjectStatus enum
  - start_date, end_date → date
- **Relationships**:
  - `user()`: belongsTo User (project owner)
  - `tasks()`: hasMany Task
- **Query Scopes**:
  - `active()`: Get only active projects
  - `completed()`: Get only completed projects
- **Accessors**:
  - `progress`: Calculated property returning completion percentage (0-100)
- **Learning Note**: Scopes are reusable query filters; accessors are computed properties

#### `app/Models/Task.php`
- **Purpose**: Represent tasks within projects
- **Fillable**: project_id, assigned_to, title, description, priority, status, due_date, completed_at
- **Casts**:
  - priority → TaskPriority enum
  - status → TaskStatus enum
  - due_date → date
  - completed_at → datetime
- **Relationships**:
  - `project()`: belongsTo Project
  - `assignedUser()`: belongsTo User (via assigned_to)
- **Query Scopes**:
  - `pending()`: Get pending tasks
  - `inProgress()`: Get in-progress tasks
  - `completed()`: Get completed tasks
  - `highPriority()`: Get high priority tasks
  - `overdue()`: Get overdue incomplete tasks
  - `dueSoon()`: Get tasks due within 7 days
- **Accessors**:
  - `is_overdue`: Boolean indicating if task is past due
  - `days_until_due`: Integer days until/past due date
- **Mutators**:
  - `setStatusAttribute()`: Auto-set completed_at when status changes to completed
- **Learning Note**: Mutators allow you to intercept attribute changes and add side effects

---

### 4. Factories (Test Data Generation)

Factories generate fake data for testing and development, similar to Prisma's seed data generation.

#### `database/factories/UserFactory.php` (Updated)
- **Purpose**: Generate fake user data
- **Default State**: Creates regular user with random name/email
- **States**:
  - `admin()`: Create user with admin role
  - `unverified()`: Create user with unverified email
- **Learning Note**: Factory states allow you to create variations of the base factory

#### `database/factories/ProjectFactory.php`
- **Purpose**: Generate fake project data
- **Default State**: Creates project with random data and random status
- **States**:
  - `active()`: Create active project
  - `completed()`: Create completed project with past end date
  - `archived()`: Create archived project
  - `forUser(User $user)`: Create project for specific user
- **Learning Note**: Fluent factory API allows chaining states for complex scenarios

#### `database/factories/TaskFactory.php`
- **Purpose**: Generate fake task data
- **Default State**: Creates task with random priority, status, and optional assignment
- **States**:
  - `pending()`: Create pending task
  - `inProgress()`: Create in-progress task
  - `completed()`: Create completed task with completed_at timestamp
  - `highPriority()`: Create high priority task
  - `lowPriority()`: Create low priority task
  - `overdue()`: Create overdue task (past due, not completed)
  - `forProject(Project $project)`: Create task for specific project
  - `assignedTo(User $user)`: Create task assigned to specific user
- **Learning Note**: Factory states can be combined (e.g., `->highPriority()->overdue()`)

---

### 5. Seeders (Database Population)

#### `database/seeders/DevelopmentSeeder.php`
- **Purpose**: Populate database with realistic sample data for development
- **What It Creates**:
  - 1 admin user (admin@example.com / password)
  - 1 regular user (user@example.com / password)
  - 5 additional random users
  - 4 projects for admin (3 active, 1 completed)
  - 2 active projects for regular user
  - 27+ tasks distributed across projects
  - 3 special scenario tasks (overdue, unassigned, in-progress)
- **How to Run**:
  ```bash
  php artisan migrate:fresh --seed --seeder=DevelopmentSeeder
  ```
- **Learning Note**: Seeders are great for quickly setting up development environments with realistic data

---

## Database State

### Current Database Statistics
- **Users**: 7 (1 admin, 1 regular, 5 random)
- **Projects**: 6 (5 active, 1 completed)
- **Tasks**: 30 (various statuses and priorities)

### Database Relationships
```
User (1) ─────────────> (Many) Projects
  │
  └─────────────────────> (Many) Tasks (assigned_to)

Project (1) ───────────> (Many) Tasks
```

### Test Credentials
- **Admin**: admin@example.com / password
- **User**: user@example.com / password

---

## Key Laravel Concepts Demonstrated

### 1. Eloquent ORM vs Prisma

| Feature | Laravel Eloquent | Prisma |
|---------|-----------------|--------|
| Schema Definition | Migrations (PHP) | schema.prisma |
| Model Definition | PHP classes | Generated types |
| Relationships | Method definitions | @relation directive |
| Queries | Fluent builder | Type-safe client |
| Seeding | Factories + Seeders | seed.ts script |

### 2. Relationships

**One-to-Many**:
- User has many Projects: `$user->projects`
- Project has many Tasks: `$project->tasks`

**Inverse**:
- Project belongs to User: `$project->user`
- Task belongs to Project: `$task->project`

**Nullable Foreign Key**:
- Task assigned to User (optional): `$task->assignedUser`

### 3. Query Scopes

Reusable query filters defined on models:
```php
// Instead of: Project::where('status', 'active')->get()
// Use scope: Project::active()->get()
```

### 4. Accessors & Mutators

**Accessors** (getters): Compute derived properties
```php
$project->progress // Returns 0-100 percentage
```

**Mutators** (setters): Transform data on save
```php
$task->status = TaskStatus::COMPLETED; // Auto-sets completed_at
```

### 5. Type Safety with Enums

PHP 8.1+ enums provide type safety:
```php
// Type-safe: Only valid enum values allowed
$project->status = ProjectStatus::ACTIVE;

// Type error: Invalid value rejected
$project->status = 'invalid'; // Error!
```

---

## What's Next: Phase 2

Phase 2 will focus on **Backend Logic**:
1. Form Request classes for validation
2. Service classes for business logic
3. Policy classes for authorization
4. Resource classes for API responses
5. Controllers (ProjectController, TaskController, DashboardController)
6. Define routes in `routes/web.php`

---

## Commands Reference

### Run Migrations
```bash
php artisan migrate              # Run pending migrations
php artisan migrate:fresh        # Drop all tables and re-migrate
php artisan migrate:rollback     # Rollback last migration batch
```

### Run Seeders
```bash
php artisan db:seed                                      # Run DatabaseSeeder
php artisan db:seed --class=DevelopmentSeeder          # Run specific seeder
php artisan migrate:fresh --seed --seeder=DevelopmentSeeder # Reset and seed
```

### Generate Files
```bash
php artisan make:model Project          # Create model
php artisan make:migration create_projects_table  # Create migration
php artisan make:factory ProjectFactory # Create factory
php artisan make:seeder DevelopmentSeeder # Create seeder
```

### Database Inspection
```bash
php artisan db:show              # Show database info
php artisan db:table projects    # Show table structure
php artisan tinker               # Laravel REPL for testing
```

---

## Comparison with Next.js/Prisma Workflow

### Prisma Workflow
```bash
# Define schema
# Edit schema.prisma

# Generate migration
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database
npx prisma db seed
```

### Laravel Workflow
```bash
# Create model, migration, factory together
php artisan make:model Project -mf

# Edit migration file
# Edit app/Models/Project.php

# Run migration
php artisan migrate

# Create seeder
php artisan make:seeder DevelopmentSeeder

# Run seeder
php artisan db:seed --class=DevelopmentSeeder
```

---

## Tips for Learning

1. **Use Tinker**: Laravel's REPL is great for experimenting
   ```bash
   php artisan tinker
   >>> User::first()
   >>> Project::with('tasks')->get()
   ```

2. **Check Query Logs**: Enable query logging to see SQL
   ```php
   DB::enableQueryLog();
   Project::active()->get();
   dd(DB::getQueryLog());
   ```

3. **Use Factory States**: Combine states for complex scenarios
   ```php
   Task::factory()
       ->highPriority()
       ->overdue()
       ->assignedTo($user)
       ->create();
   ```

4. **Leverage Relationships**: Eager load to prevent N+1 queries
   ```php
   // Bad: N+1 queries
   $projects = Project::all();
   foreach ($projects as $project) {
       echo $project->user->name; // Query per iteration
   }

   // Good: Eager loading
   $projects = Project::with('user')->get();
   foreach ($projects as $project) {
       echo $project->user->name; // No extra queries
   }
   ```

---

**Phase 1 Complete!** 🎉

All database foundations are in place. The system is now ready for Phase 2: Backend Logic implementation.
