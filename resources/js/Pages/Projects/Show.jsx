import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import TaskList from "@/Components/Tasks/TaskList";
import {
    Calendar,
    ListTodo,
    Pencil,
    Trash2,
    PlusCircle,
    CheckCircle2,
    Clock,
    AlertCircle,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * Project Show Page
 *
 * Displays detailed information about a project including its tasks.
 */
export default function Show({ project, stats }) {
    const { toast } = useToast();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-500',
            completed: 'bg-blue-500',
            archived: 'bg-gray-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDeleteProject = () => {
        router.delete(route('projects.destroy', project.id), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Project deleted successfully.",
                });
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: "Failed to delete project.",
                    variant: "destructive",
                });
            },
        });
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            router.delete(route('tasks.destroy', taskToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Task deleted successfully.",
                    });
                    setTaskToDelete(null);
                },
                onError: () => {
                    toast({
                        title: "Error",
                        description: "Failed to delete task.",
                        variant: "destructive",
                    });
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            {project.name}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('projects.edit', project.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title={project.name} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Project Details */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                                    {project.description && (
                                        <CardDescription className="mt-2 text-base">
                                            {project.description}
                                        </CardDescription>
                                    )}
                                </div>
                                <Badge variant="secondary">
                                    <div className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(project.status.value)}`} />
                                    {project.status.label}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Overall Progress</span>
                                    <span className="text-2xl font-bold">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-3" />
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-4 border rounded-lg">
                                    <ListTodo className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Total Tasks</p>
                                        <p className="text-2xl font-bold">{stats.total_tasks}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 border rounded-lg">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Start Date</p>
                                        <p className="text-sm">{formatDate(project.start_date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 border rounded-lg">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm">{formatDate(project.end_date)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Task Statistics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 border rounded-lg">
                                    <Clock className="h-5 w-5 mx-auto mb-2 text-yellow-600" />
                                    <p className="text-2xl font-bold">{stats.pending_tasks}</p>
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <AlertCircle className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                                    <p className="text-2xl font-bold">{stats.in_progress_tasks}</p>
                                    <p className="text-sm text-muted-foreground">In Progress</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-600" />
                                    <p className="text-2xl font-bold">{stats.completed_tasks}</p>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <AlertCircle className="h-5 w-5 mx-auto mb-2 text-red-600" />
                                    <p className="text-2xl font-bold">{stats.overdue_tasks}</p>
                                    <p className="text-sm text-muted-foreground">Overdue</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tasks Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">Tasks</h3>
                            <Button asChild>
                                <Link href={route('tasks.create', { project_id: project.id })}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Task
                                </Link>
                            </Button>
                        </div>
                        <TaskList tasks={project.tasks || []} onDelete={handleDeleteTask} showProject={false} />
                    </div>
                </div>
            </div>

            {/* Delete Project Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the project "{project.name}" and all its tasks.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteProject} className="bg-destructive hover:bg-destructive/90">
                            Delete Project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Task Confirmation Dialog */}
            <AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the task "{taskToDelete?.title}".
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteTask} className="bg-destructive hover:bg-destructive/90">
                            Delete Task
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
