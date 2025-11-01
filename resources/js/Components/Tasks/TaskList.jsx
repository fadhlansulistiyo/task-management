import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusCircle, CheckSquare } from 'lucide-react';

/**
 * TaskList Component
 *
 * Displays a grid of task cards or an empty state.
 *
 * @param {Array} tasks - Array of task objects
 * @param {Function} onDelete - Optional callback for delete action
 * @param {boolean} showProject - Whether to show project name on cards (default: true)
 */
export default function TaskList({ tasks = [], onDelete, showProject = true }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <CheckSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Get started by creating your first task.
                </p>
                <Button asChild>
                    <Link href={route('tasks.create')}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Task
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    showProject={showProject}
                />
            ))}
        </div>
    );
}
