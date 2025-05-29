export const formatPrice = (value) => {
    if (isNaN(value)) return '0₫';

    return Number(value)
        .toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        .replace('₫', '') + '₫';
};