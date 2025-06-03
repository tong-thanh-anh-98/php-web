// src/utils/currency.jsx
export function parseCurrency(value) {
    return value ? parseFloat(value.replace(/[^\d]/g, '')) : null;
}