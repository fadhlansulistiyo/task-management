import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TaskForm from "@/Components/Tasks/TaskForm";

/**
 * Task Edit Page
 *
 * Form page for editing an existing task.
 */
export default function Edit({ task, projects, users, priorities, statuses }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Task: {task.title}
                </h2>
            }
        >
            <Head title={`Edit ${task.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <TaskForm
                        task={task}
                        projects={projects}
                        users={users}
                        priorities={priorities}
                        statuses={statuses}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
