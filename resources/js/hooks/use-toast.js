import { toast as sonnerToast } from "sonner";

/**
 * useToast Hook
 *
 * Simple wrapper around sonner toast for consistent toast notifications.
 * Compatible with shadcn/ui toast API for easier migration if needed.
 */
export function useToast() {
    const toast = ({ title, description, variant = "default" }) => {
        const isError = variant === "destructive";

        if (isError) {
            sonnerToast.error(title, {
                description,
            });
        } else {
            sonnerToast.success(title, {
                description,
            });
        }
    };

    return { toast };
}
