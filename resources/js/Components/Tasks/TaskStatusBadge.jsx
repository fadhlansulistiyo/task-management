import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * TaskStatusBadge Component
 *
 * Displays a task status as a colored badge.
 *
 * @param {Object} status - Status object with value and label
 * @param {string} className - Optional additional CSS classes
 */
export default function TaskStatusBadge({ status, className }) {
    const getStatusStyles = (statusValue) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        };
        return styles[statusValue] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    };

    const getStatusDot = (statusValue) => {
        const colors = {
            pending: 'bg-yellow-500',
            in_progress: 'bg-blue-500',
            completed: 'bg-green-500',
            cancelled: 'bg-red-500'
        };
        return colors[statusValue] || 'bg-gray-500';
    };

    return (
        <Badge
            variant="secondary"
            className={cn(
                getStatusStyles(status.value),
                'border-0',
                className
            )}
        >
            <div className={cn('w-2 h-2 rounded-full mr-1.5', getStatusDot(status.value))} />
            {status.label}
        </Badge>
    );
}
