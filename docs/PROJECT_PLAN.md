# Laravel Dashboard Template - Project Plan

## Overview

This project demonstrates a production-ready Laravel dashboard application using modern best practices. It's designed as a learning resource for developers transitioning from Next.js/Prisma to Laravel/Inertia.

**Target Audience**: Web developers experienced with Next.js and Prisma, learning Laravel with Inertia (React.js + Shadcn/UI)

**Goal**: Build a simple yet comprehensive dashboard that showcases Laravel's architecture, development workflow, and industry-standard practices.

---

## Project Scope

We'll build a **Task Management Dashboard** featuring:

- User authentication (Laravel Breeze - already implemented)
- Projects management (CRUD)
- Tasks management (CRUD with relationships)
- Dashboard with statistics and charts
- Role-based access control (Admin/User)
- API endpoints for mobile apps (future-ready)

---

## Architecture & Stack

### Backend
- **Framework**: Laravel 12
- **Database**: SQLite (development), easily migrated to MySQL/PostgreSQL
- **ORM**: Eloquent (Laravel's ORM, similar to Prisma)
- **Authentication**: Laravel Sanctum (via Breeze)
- **API**: RESTful endpoints using Resource Controllers
- **Validation**: Form Request classes
- **Testing**: Pest PHP

### Frontend
- **Framework**: React 18
- **Bridge**: Inertia.js (SSR-like experience without API layer)
- **UI Library**: shadcn/ui (New York style)
- **Styling**: Tailwind CSS
- **Forms**: Inertia form helpers
- **Routing**: Ziggy (Laravel routes in JavaScript)

### Key Concepts Demonstrated

1. **Eloquent ORM** (similar to Prisma)
   - Models and relationships
   - Query builder
   - Scopes and accessors
   - Factory patterns

2. **Service Layer Pattern**
   - Business logic separation
   - Reusable code
   - Testability

3. **Repository Pattern** (optional, for complex queries)
   - Data abstraction
   - Query centralization

4. **Request Validation**
   - Form Request classes
   - Custom validation rules
   - Error handling

5. **Resource Transformers**
   - API resource classes
   - Data serialization
   - Consistent API responses

6. **Event & Listener Pattern**
   - Decoupled actions
   - Observable events

7. **Policy-based Authorization**
   - Gate and Policy classes
   - Role-based access control

8. **Testing Strategy**
   - Feature tests (integration)
   - Unit tests
   - Database factories and seeders

---

## Database Schema

### Users (already exists from Breeze)
```
users
├── id
├── name
├── email
├── email_verified_at
├── password
├── role (enum: 'admin', 'user') - NEW
├── remember_token
├── created_at
└── updated_at
```

### Projects
```
projects
├── id
├── user_id (foreign key)
├── name
├── description (nullable)
├── status (enum: 'active', 'completed', 'archived')
├── start_date (nullable)
├── end_date (nullable)
├── created_at
└── updated_at
```

### Tasks
```
tasks
├── id
├── project_id (foreign key)
├── assigned_to (foreign key to users, nullable)
├── title
├── description (nullable)
├── priority (enum: 'low', 'medium', 'high')
├── status (enum: 'pending', 'in_progress', 'completed', 'cancelled')
├── due_date (nullable)
├── completed_at (nullable)
├── created_at
└── updated_at
```

### Relationships
- User `hasMany` Projects
- Project `belongsTo` User
- Project `hasMany` Tasks
- Task `belongsTo` Project
- Task `belongsTo` User (assigned_to)

---

## Application Structure

### Laravel Backend Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── DashboardController.php      # Dashboard stats
│   │   ├── ProjectController.php        # Project CRUD
│   │   └── TaskController.php           # Task CRUD
│   ├── Requests/
│   │   ├── StoreProjectRequest.php      # Project validation
│   │   ├── UpdateProjectRequest.php
│   │   ├── StoreTaskRequest.php         # Task validation
│   │   └── UpdateTaskRequest.php
│   ├── Resources/
│   │   ├── ProjectResource.php          # API transformation
│   │   └── TaskResource.php
│   └── Middleware/
│       └── EnsureUserIsAdmin.php        # Admin check
├── Models/
│   ├── Project.php                      # Project model
│   └── Task.php                         # Task model
├── Policies/
│   ├── ProjectPolicy.php                # Authorization
│   └── TaskPolicy.php
├── Services/
│   ├── ProjectService.php               # Business logic
│   └── TaskService.php
└── Enums/
    ├── ProjectStatus.php                # Enum types
    ├── TaskStatus.php
    └── TaskPriority.php

database/
├── factories/
│   ├── ProjectFactory.php               # Test data generation
│   └── TaskFactory.php
├── migrations/
│   ├── xxxx_add_role_to_users_table.php
│   ├── xxxx_create_projects_table.php
│   └── xxxx_create_tasks_table.php
└── seeders/
    └── DevelopmentSeeder.php            # Sample data

tests/
├── Feature/
│   ├── ProjectTest.php                  # Integration tests
│   └── TaskTest.php
└── Unit/
    ├── ProjectServiceTest.php           # Unit tests
    └── TaskServiceTest.php
```

### React Frontend Structure

```
resources/js/
├── Pages/
│   ├── Dashboard.jsx                    # Main dashboard (enhanced)
│   ├── Projects/
│   │   ├── Index.jsx                    # Projects list
│   │   ├── Create.jsx                   # Create project
│   │   ├── Edit.jsx                     # Edit project
│   │   └── Show.jsx                     # Project details
│   └── Tasks/
│       ├── Index.jsx                    # Tasks list
│       ├── Create.jsx                   # Create task
│       └── Edit.jsx                     # Edit task
├── Components/
│   ├── ui/                              # shadcn/ui components
│   ├── Dashboard/
│   │   ├── StatCard.jsx                 # Stat display
│   │   ├── RecentProjects.jsx
│   │   ├── RecentTasks.jsx
│   │   └── TasksByStatus.jsx           # Chart component
│   ├── Projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectList.jsx
│   │   └── ProjectForm.jsx
│   └── Tasks/
│       ├── TaskCard.jsx
│       ├── TaskList.jsx
│       ├── TaskForm.jsx
│       └── TaskStatusBadge.jsx
└── Layouts/
    └── AuthenticatedLayout.jsx         # Already exists, may enhance
```

---

## Development Workflow

### Phase 1: Database & Models (Backend Foundation)
1. Create Enums (ProjectStatus, TaskStatus, TaskPriority)
2. Create migrations (add role to users, projects, tasks)
3. Create models (Project, Task) with relationships
4. Create factories for testing data
5. Create seeder for development data

### Phase 2: Backend Logic
1. Create Form Request classes for validation
2. Create Service classes for business logic
3. Create Policy classes for authorization
4. Create Resource classes for API responses
5. Create Controllers (ProjectController, TaskController, DashboardController)
6. Define routes in `routes/web.php`

### Phase 3: Frontend Components
1. Create shadcn/ui components (if needed: card, badge, select, dialog)
2. Create base components (StatCard, ProjectCard, TaskCard, etc.)
3. Create form components (ProjectForm, TaskForm)
4. Create list components (ProjectList, TaskList)

### Phase 4: Frontend Pages
1. Update Dashboard page with stats
2. Create Projects pages (Index, Create, Edit, Show)
3. Create Tasks pages (Index, Create, Edit)
4. Update navigation in AuthenticatedLayout

### Phase 5: Testing
1. Write Feature tests for Projects CRUD
2. Write Feature tests for Tasks CRUD
3. Write Unit tests for Services
4. Write Policy tests

### Phase 6: Documentation & Polish
1. Document all components and their purposes
2. Create progress tracking file
3. Add code comments for learning purposes
4. Create README with setup instructions

---

## Key Laravel Concepts (Comparison with Next.js/Prisma)

| Concept | Laravel | Next.js/Prisma Equivalent |
|---------|---------|---------------------------|
| **ORM** | Eloquent | Prisma Client |
| **Models** | `app/Models/Project.php` | `schema.prisma` model definitions |
| **Migrations** | `database/migrations/` | Prisma migrations |
| **Queries** | `Project::where('status', 'active')->get()` | `prisma.project.findMany({ where: { status: 'active' } })` |
| **Relationships** | Method definitions in model | `@relation` in schema |
| **Routing** | `routes/web.php` | `app/` directory (App Router) |
| **API Routes** | `routes/api.php` | `app/api/` directory |
| **Server Components** | Inertia controllers | React Server Components |
| **Forms** | Inertia form helpers | React Hook Form / Server Actions |
| **Validation** | Form Request classes | Zod / Server-side validation |
| **Middleware** | `app/Http/Middleware/` | `middleware.ts` |
| **Authentication** | Laravel Sanctum/Breeze | NextAuth.js |
| **Environment** | `.env` | `.env.local` |

---

## Best Practices Demonstrated

### 1. **Separation of Concerns**
- Controllers: Handle HTTP requests/responses
- Services: Business logic
- Models: Data structure and relationships
- Policies: Authorization rules
- Form Requests: Validation rules

### 2. **Type Safety (PHP 8+)**
- Type hints for method parameters
- Return type declarations
- Enum classes for constants

### 3. **Security**
- CSRF protection (automatic with Inertia)
- SQL injection prevention (Eloquent ORM)
- Mass assignment protection (Model `$fillable`)
- Authorization (Policies)
- Input validation (Form Requests)

### 4. **Code Reusability**
- Service classes
- Resource classes
- Eloquent scopes
- Component composition (React)

### 5. **Testing**
- Database factories for test data
- Feature tests for user flows
- Unit tests for business logic
- Mocking and assertions

### 6. **Performance**
- Eager loading (N+1 query prevention)
- Query optimization
- Pagination
- Caching strategies (optional, advanced)

### 7. **Developer Experience**
- Clear naming conventions
- Consistent file structure
- Comprehensive comments
- Type hinting
- Error handling

---

## Learning Outcomes

After completing this project, you will understand:

1. **Laravel's MVC Architecture**
   - How Models, Controllers, and Views (Inertia pages) work together
   - The role of routing and middleware

2. **Eloquent ORM**
   - Defining models and relationships
   - Querying data efficiently
   - Using factories and seeders

3. **Inertia.js Pattern**
   - Server-side rendering without API layer
   - Passing data from controllers to React components
   - Form handling and validation

4. **Service Layer Pattern**
   - Extracting business logic from controllers
   - Making code testable and reusable

5. **Authorization**
   - Policies for model-level permissions
   - Gates for simple checks
   - Role-based access control

6. **Testing in Laravel**
   - Writing feature tests
   - Writing unit tests
   - Using factories for test data

7. **Modern PHP**
   - Type declarations
   - Enums
   - Attributes
   - Arrow functions

---

## Next Steps

This plan will be executed phase by phase. Each completed component will be documented in the progress tracking file with:
- File name and location
- Purpose and responsibility
- Key methods/functions
- Related files
- Learning notes

Let's start building! 🚀
