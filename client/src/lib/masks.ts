// Currency formatting utilities for Indian numbering system

const formatIndianNumber = (num: string): string => {
  // Add commas in Indian numbering system (1,23,456)
  if (num.length <= 3) return num;
  
  const lastThree = num.slice(-3);
  const rest = num.slice(0, -3);
  
  // Recursively add commas every 2 digits before the last 3
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
};

export const formatIndianCurrency = (value: number): string => {
  if (!value || value === 0) return '₹0.00';
  
  const [integerPart, decimalPart] = value.toFixed(2).split('.');
  const formattedInteger = formatIndianNumber(integerPart);
  
  return `₹${formattedInteger}.${decimalPart}`;
};

export const parseCurrencyInput = (value: string): number => {
  // Remove ₹ symbol and commas, keep only numbers and decimal
  const cleaned = value.replace(/[₹,\s]/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatCurrencyInput = (value: string): string => {
  // Remove everything except digits and decimal point
  const numeric = value.replace(/[^\d.]/g, '');
  if (!numeric) return '';
  
  const numValue = parseFloat(numeric);
  if (isNaN(numValue)) return '';
  
  const [integer, decimal] = numValue.toFixed(2).split('.');
  const formattedInteger = formatIndianNumber(integer);
  
  return `₹${formattedInteger}.${decimal}`;
};
