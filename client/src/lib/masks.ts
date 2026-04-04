<<<<<<< HEAD
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
=======
type NumberMaskOptions = {
  decimals?: number;
  allowNegative?: boolean;
  max?: number;
  min?: number;
};

const clamp = (value: number, min?: number, max?: number) => {
  if (typeof min === "number" && value < min) return min;
  if (typeof max === "number" && value > max) return max;
  return value;
};

const normalizeNumericString = (value: string, options: NumberMaskOptions) => {
  const { decimals = 2, allowNegative = false } = options;
  let cleaned = value.replace(/[^\d.-]/g, "");

  if (!allowNegative) {
    cleaned = cleaned.replace(/-/g, "");
  } else {
    // Keep only a single leading minus sign.
    cleaned = cleaned.replace(/(?!^)-/g, "");
  }

  const parts = cleaned.split(".");
  const integerPart = parts[0] || "";
  const decimalPart =
    decimals > 0 ? (parts[1] || "").slice(0, decimals) : "";

  return decimals > 0 && decimalPart.length > 0
    ? `${integerPart}.${decimalPart}`
    : integerPart;
};

const toNumber = (value: string) => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const numberMask = (value: string, options: NumberMaskOptions = {}) => {
  return normalizeNumericString(value, options);
};

export const integerMask = (value: string, allowNegative = false) => {
  return normalizeNumericString(value, { decimals: 0, allowNegative });
};

export const currencyMask = (value: string, decimals = 2) => {
  return normalizeNumericString(value, { decimals, allowNegative: false });
};

export const amountMask = currencyMask;

export const percentageMask = (value: string, decimals = 2) => {
  const masked = normalizeNumericString(value, {
    decimals,
    allowNegative: false,
  });
  const numeric = clamp(toNumber(masked), 0, 100);
  return numeric === 0 && masked === "" ? "" : String(numeric);
};

export const rateMask = percentageMask;

export const numericValue = (value: string, options: NumberMaskOptions = {}) => {
  const masked = normalizeNumericString(value, options);
  return clamp(toNumber(masked), options.min, options.max);
};

export default {
  numberMask,
  integerMask,
  currencyMask,
  amountMask,
  percentageMask,
  rateMask,
  numericValue,
>>>>>>> 6ef4782 (update in code)
};
