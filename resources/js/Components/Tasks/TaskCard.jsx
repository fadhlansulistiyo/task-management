import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { AlertCircle, Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import TaskStatusBadge from './TaskStatusBadge';

/**
 * TaskCard Component
 *
 * Displays a task in card format with status, priority, assignee, and actions.
 *
 * @param {Object} task - Task object
 * @param {Function} onDelete - Optional callback for delete action
 * @param {boolean} showProject - Whether to show project name (default: true)
 */
export default function TaskCard({ task, onDelete, showProject = true }) {
  // Handle nested resource wrapping
  // Laravel API Resources wrap nested resources in a 'data' property
  const project = task.project?.data || task.project;
  const assignedUser = task.assigned_user?.data || task.assigned_user;

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950',
      medium: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950',
      high: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
    };
    return colors[priority] || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-start gap-2">
              <CardTitle className="flex-1 text-lg">
                <Link href={route('tasks.show', task.id)} className="transition-colors hover:text-primary">
                  {task.title}
                </Link>
              </CardTitle>
              {task.is_overdue && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Overdue
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <TaskStatusBadge status={task.status} />
              <Badge className={getPriorityColor(task.priority.value)}>{task.priority.label}</Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={route('tasks.show', task.id)}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={route('tasks.edit', task.id)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete?.(task)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {task.description && <CardDescription className="mt-2 line-clamp-2">{task.description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Project Name */}
        {showProject && project && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Project:</span>
            <Link
              href={route('projects.show', project.id)}
              className="font-medium transition-colors hover:text-primary"
            >
              {project.name}
            </Link>
          </div>
        )}

        {/* Due Date */}
        {task.due_date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due {formatDate(task.due_date)}</span>
            {task.days_until_due !== null && (
              <span className={task.days_until_due < 0 ? 'text-destructive' : ''}>
                ({Math.abs(task.days_until_due)} day{Math.abs(task.days_until_due) !== 1 ? 's' : ''}{' '}
                {task.days_until_due < 0 ? 'overdue' : 'remaining'})
              </span>
            )}
          </div>
        )}

        {/* Assigned User */}
        {assignedUser && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Assigned to:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{getInitials(assignedUser.name)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{assignedUser.name}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={route('tasks.show', task.id)}>View Details</Link>
        </Button>
        <Button variant="default" size="sm" className="flex-1" asChild>
          <Link href={route('tasks.edit', task.id)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
