<?php

namespace App;

trait HasCurrencyFormat
{
    /**
     * Format numbers into currency format (e.g., 1,000,000 ₫)
     */
    protected function formatCurrency($value): string
    {
        if (!is_numeric($value)) {
            return '0 ₫';
        }
        return number_format($value, 0, ',', '.') . ' ₫';
    }

    /**
     * Convert a currency string or number into an integer to store in the database
     */
    protected function parseCurrency($value): float
    {
        // If it's already a number, return the float value
        if (is_numeric($value)) {
            return (float) $value;
        }

        // Remove all characters except digits, dots, or commas
        $cleanString = preg_replace('/[^\d.,]/', '', $value);

        // Replace commas with dots if present (to standardize decimal format)
        $cleanString = str_replace(',', '.', $cleanString);

        // Convert to float
        $number = floatval($cleanString);

        return $number;
    }
}
