import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, ListTodo, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * ProjectCard Component
 *
 * Displays a project in card format with status, progress, and actions.
 *
 * @param {Object} project - Project object
 * @param {Function} onDelete - Optional callback for delete action
 */
export default function ProjectCard({ project, onDelete }) {
    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-500',
            completed: 'bg-blue-500',
            archived: 'bg-gray-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">
                                <Link
                                    href={route('projects.show', project.id)}
                                    className="hover:text-primary transition-colors"
                                >
                                    {project.name}
                                </Link>
                            </CardTitle>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                            <div className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(project.status.value)}`} />
                            {project.status.label}
                        </Badge>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={route('projects.show', project.id)}>
                                    View Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={route('projects.edit', project.id)}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => onDelete?.(project)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {project.description && (
                    <CardDescription className="line-clamp-2 mt-2">
                        {project.description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                </div>

                {/* Task Count */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ListTodo className="h-4 w-4" />
                    <span>{project.tasks_count || 0} task{project.tasks_count !== 1 ? 's' : ''}</span>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {project.start_date && (
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Started {formatDate(project.start_date)}</span>
                        </div>
                    )}
                    {project.end_date && (
                        <div className="flex items-center gap-1">
                            <span>Due {formatDate(project.end_date)}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={route('projects.show', project.id)}>
                        View Details
                    </Link>
                </Button>
                <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link href={route('projects.edit', project.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
