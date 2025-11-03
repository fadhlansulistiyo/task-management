import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProjectForm from "@/Components/Projects/ProjectForm";

/**
 * Project Edit Page
 *
 * Form page for editing an existing project.
 */
export default function Edit({ project, statuses }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Project: {project.name}
                </h2>
            }
        >
            <Head title={`Edit ${project.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <ProjectForm project={project} statuses={statuses} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
