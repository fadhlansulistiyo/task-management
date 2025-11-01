import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusCircle, ListTodo } from 'lucide-react';

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
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <ListTodo className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Get started by creating your first project to organize your tasks.
                </p>
                <Button asChild>
                    <Link href={route('projects.create')}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Project
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
