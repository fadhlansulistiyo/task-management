import TaskForm from '@/Components/Tasks/TaskForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

/**
 * Task Create Page
 *
 * Form page for creating a new task.
 */
export default function Create({ projects, users, priorities, statuses }) {
  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create Task</h2>}
    >
      <Head title="Create Task" />

      <div className="py-8">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <TaskForm projects={projects} users={users} priorities={priorities} statuses={statuses} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
