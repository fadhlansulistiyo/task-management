import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ListTodo, PlusCircle } from 'lucide-react';
import ProjectCard from './ProjectCard';

/**
 * ProjectList Component
 *
 * Displays a grid of project cards or an empty state.
 *
 * @param {Array} projects - Array of project objects
 * @param {Function} onDelete - Optional callback for delete action
 */
export default function ProjectList({ projects = [], onDelete }) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ListTodo className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No projects yet</h3>
        <p className="mx-auto mb-6 max-w-sm text-muted-foreground">
          Get started by creating your first project to organize your tasks.
        </p>
        <Button asChild>
          <Link href={route('projects.create')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={onDelete} />
      ))}
    </div>
  );
}
