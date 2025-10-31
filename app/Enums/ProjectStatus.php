<?php

namespace App\Enums;

/**
 * Project Status Enum
 *
 * Defines the lifecycle states of a project.
 * This ensures data consistency and prevents invalid status values.
 */
enum ProjectStatus: string
{
    case ACTIVE = 'active';
    case COMPLETED = 'completed';
    case ARCHIVED = 'archived';

    /**
     * Get a human-readable label for the status
     */
    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::COMPLETED => 'Completed',
            self::ARCHIVED => 'Archived',
        };
    }

    /**
     * Get a color class for UI display (Tailwind CSS)
     */
    public function color(): string
    {
        return match ($this) {
            self::ACTIVE => 'green',
            self::COMPLETED => 'blue',
            self::ARCHIVED => 'gray',
        };
    }

    /**
     * Get all status values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
