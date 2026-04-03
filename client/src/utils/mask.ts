export const maskString = (
  value: string | undefined | null,
  visibleStart = 1,
  visibleEnd = 1,
  maskChar = "*"
): string => {
  if (!value) return "";

  const length = value.length;
  if (length <= visibleStart + visibleEnd) {
    return maskChar.repeat(length);
  }

  return (
    value.slice(0, visibleStart) +
    maskChar.repeat(Math.max(0, length - visibleStart - visibleEnd)) +
    value.slice(length - visibleEnd)
  );
};

export const maskEmail = (email: string | undefined | null): string => {
  if (!email) return "";

  const parts = email.split("@");
  if (parts.length !== 2) {
    return maskString(email, 1, 1);
  }

  const [local, domain] = parts;

  const localMasked =
    local.length <= 2
      ? "*".repeat(local.length)
      : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];

  const domainParts = domain.split(".");
  if (domainParts.length === 1) {
    return `${localMasked}@${maskString(domain, 1, 1)}`;
  }

  const tld = domainParts.pop();
  const domainName = domainParts.join(".");

  const domainNameMasked =
    domainName.length <= 2
      ? "*".repeat(domainName.length)
      : domainName[0] + "*".repeat(domainName.length - 2) + domainName.slice(-1);

  return `${localMasked}@${domainNameMasked}.${tld}`;
};

export const maskPhone = (phone: string | undefined | null): string => {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) {
    return "*".repeat(digits.length);
  }

  const start = digits.slice(0, 2);
  const end = digits.slice(-2);
  const maskedMiddle = "*".repeat(Math.max(0, digits.length - 4));

  return `${start}${maskedMiddle}${end}`;
};

export const maskGstin = (gstin: string | undefined | null): string => {
  if (!gstin) return "";

  if (gstin.length <= 4) {
    return "*".repeat(gstin.length);
  }

  return `${gstin.slice(0, 2)}${"*".repeat(Math.max(0, gstin.length - 4))}${gstin.slice(-2)}`;
};

export const maskInvoiceNumber = (
  invoiceNumber: string | undefined | null
): string => {
  if (!invoiceNumber) return "";

  const cleaned = invoiceNumber.trim();
  if (cleaned.length <= 4) {
    return "*".repeat(cleaned.length);
  }

  return `${cleaned.slice(0, 2)}${"*".repeat(Math.max(0, cleaned.length - 4))}${cleaned.slice(-2)}`;
};

export const maskName = (name: string | undefined | null): string => {
  if (!name) return "";

  return name
    .split(" ")
    .map((part) => {
      if (part.length <= 2) return "*".repeat(part.length);
      return `${part[0]}${"*".repeat(part.length - 2)}${part.slice(-1)}`;
    })
    .join(" ");
};
