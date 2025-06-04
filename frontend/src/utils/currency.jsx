export const parseCurrency = (value) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    // Remove currency symbols, commas, dots (except last decimal point)
    let cleaned = value.toString().replace(/[₫,\s]/g, '').replace(/\./g, '');

    return parseFloat(cleaned) || 0;
};