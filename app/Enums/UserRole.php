<?php

namespace App\Enums;

/**
 * User Role Enum
 *
 * Defines the different roles a user can have in the system.
 * This provides type safety and ensures only valid roles are used.
 *
 * Similar to TypeScript enums or union types in Next.js
 */
enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    /**
     * Get a human-readable label for the role
     */
    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::USER => 'User',
        };
    }

    /**
     * Get all role values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
