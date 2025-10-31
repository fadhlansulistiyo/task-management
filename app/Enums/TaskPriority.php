<?php

namespace App\Enums;

/**
 * Task Priority Enum
 *
 * Defines the priority levels for tasks.
 * Helps in task organization and workflow management.
 */
enum TaskPriority: string
{
    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';

    /**
     * Get a human-readable label for the priority
     */
    public function label(): string
    {
        return match ($this) {
            self::LOW => 'Low',
            self::MEDIUM => 'Medium',
            self::HIGH => 'High',
        };
    }

    /**
     * Get a color class for UI display (Tailwind CSS)
     */
    public function color(): string
    {
        return match ($this) {
            self::LOW => 'gray',
            self::MEDIUM => 'yellow',
            self::HIGH => 'red',
        };
    }

    /**
     * Get all priority values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get numeric weight for sorting (higher = more important)
     */
    public function weight(): int
    {
        return match ($this) {
            self::LOW => 1,
            self::MEDIUM => 2,
            self::HIGH => 3,
        };
    }
}
