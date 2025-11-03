import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { CheckSquare, PlusCircle } from 'lucide-react';
import TaskCard from './TaskCard';

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
      <div className="py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <CheckSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No tasks yet</h3>
        <p className="mx-auto mb-6 max-w-sm text-muted-foreground">Get started by creating your first task.</p>
        <Button asChild>
          <Link href={route('tasks.create')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Task
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} showProject={showProject} />
      ))}
    </div>
  );
}
