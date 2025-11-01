import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, AlertCircle } from 'lucide-react';

/**
 * RecentTasks Component
 *
 * Displays a list of recent tasks with their details.
 *
 * @param {Array} tasks - Array of task objects
 */
export default function RecentTasks({ tasks = [] }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500',
            in_progress: 'bg-blue-500',
            completed: 'bg-green-500',
            cancelled: 'bg-red-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950',
            medium: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950',
            high: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
        };
        return colors[priority] || '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Tasks</CardTitle>
                        <CardDescription>
                            Your latest task updates
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('tasks.index')}>
                            View all
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {tasks.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground mb-4">
                            No tasks yet. Create your first task!
                        </p>
                        <Button asChild>
                            <Link href={route('tasks.create')}>
                                Create Task
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <Link
                                key={task.id}
                                href={route('tasks.show', task.id)}
                                className="block group"
                            >
                                <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        {/* Status Indicator */}
                                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getStatusColor(task.status.value)}`} />

                                        {/* Task Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                                                    {task.title}
                                                </h4>
                                                <Badge
                                                    variant="secondary"
                                                    className={`flex-shrink-0 text-xs ${getPriorityColor(task.priority.value)}`}
                                                >
                                                    {task.priority.label}
                                                </Badge>
                                            </div>

                                            {/* Project Name */}
                                            {task.project && (
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    {task.project.name}
                                                </p>
                                            )}

                                            {/* Footer: Status, Due Date, Assignee */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {task.status.label}
                                                    </Badge>
                                                    {task.is_overdue && (
                                                        <Badge variant="destructive" className="text-xs">
                                                            <AlertCircle className="h-3 w-3 mr-1" />
                                                            Overdue
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {task.due_date && (
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{formatDate(task.due_date)}</span>
                                                        </div>
                                                    )}
                                                    {task.assigned_user && (
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarFallback className="text-xs">
                                                                {getInitials(task.assigned_user.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
