import ProjectForm from '@/Components/Projects/ProjectForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

/**
 * Project Create Page
 *
 * Form page for creating a new project.
 */
export default function Create({ statuses }) {
  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create Project</h2>}
    >
      <Head title="Create Project" />

      <div className="py-8">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <ProjectForm statuses={statuses} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
