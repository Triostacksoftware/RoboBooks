// Dynamic import for jsPDF to work in both browser and Node.js
let jsPDF;
let autoTable;

// Initialize jsPDF dynamically
const initPDF = async () => {
  if (typeof window !== "undefined") {
    const jsPDFModule = await import("jspdf");
    const autoTableModule = await import("jspdf-autotable");
    jsPDF = jsPDFModule.default;
    autoTable = autoTableModule.default;
  } else {
    const jsPDFModule = await import("jspdf");
    const autoTableModule = await import("jspdf-autotable");
    jsPDF = jsPDFModule.default.default || jsPDFModule.default;
    autoTable = autoTableModule.default.default || autoTableModule.default;
  }
};

const SELLER_STATE_CODE = "29";

const formatCurrency = (amount) => {
  const value = Number(amount || 0);
  return `Rs ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getStateFromAddress = (address) => {
  if (!address) return "09";
  if (address.includes("Uttar Pradesh")) return "09";
  if (address.includes("West Bengal")) return "19";
  if (address.includes("Maharashtra")) return "27";
  if (address.includes("Tamil Nadu")) return "33";
  if (address.includes("Gujarat")) return "24";
  if (address.includes("Rajasthan")) return "08";
  if (address.includes("Punjab")) return "03";
  if (address.includes("Haryana")) return "06";
  if (address.includes("Delhi")) return "07";
  if (address.includes("Karnataka")) return "29";
  return "09";
};

const getStateLabel = (address) => {
  if (address?.includes("Uttar Pradesh")) return "09-Uttar Pradesh";
  if (address?.includes("West Bengal")) return "19-West Bengal";
  if (address?.includes("Maharashtra")) return "27-Maharashtra";
  if (address?.includes("Tamil Nadu")) return "33-Tamil Nadu";
  if (address?.includes("Gujarat")) return "24-Gujarat";
  if (address?.includes("Rajasthan")) return "08-Rajasthan";
  if (address?.includes("Punjab")) return "03-Punjab";
  if (address?.includes("Haryana")) return "06-Haryana";
  if (address?.includes("Delhi")) return "07-Delhi";
  if (address?.includes("Karnataka")) return "29-Karnataka";
  return "09-Uttar Pradesh";
};

const numberToWords = (num) => {
  if (Number.isNaN(num) || num === null || num === undefined) {
    return "Zero Rupees only";
  }

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  const convertLessThanOneThousand = (value) => {
    if (value === 0) return "";
    if (value < 10) return ones[value];
    if (value < 20) return teens[value - 10];
    if (value < 100) {
      return tens[Math.floor(value / 10)] + (value % 10 !== 0 ? ` ${ones[value % 10]}` : "");
    }
    return (
      ones[Math.floor(value / 100)] +
      " Hundred" +
      (value % 100 !== 0 ? ` ${convertLessThanOneThousand(value % 100)}` : "")
    );
  };

  const convert = (value) => {
    if (value === 0) return "Zero";
    if (value < 1000) return convertLessThanOneThousand(value);
    if (value < 100000) {
      return (
        convertLessThanOneThousand(Math.floor(value / 1000)) +
        " Thousand" +
        (value % 1000 !== 0 ? ` ${convertLessThanOneThousand(value % 1000)}` : "")
      );
    }
    if (value < 10000000) {
      return (
        convertLessThanOneThousand(Math.floor(value / 100000)) +
        " Lakh" +
        (value % 100000 !== 0 ? ` ${convert(value % 100000)}` : "")
      );
    }
    return (
      convertLessThanOneThousand(Math.floor(value / 10000000)) +
      " Crore" +
      (value % 10000000 !== 0 ? ` ${convert(value % 10000000)}` : "")
    );
  };

  const rupees = Math.floor(Number(num));
  const paise = Math.round((Number(num) - rupees) * 100);
  let result = `${convert(rupees)} Rupees`;
  if (paise > 0) {
    result += ` and ${convert(paise)} Paise`;
  }
  return `${result} only`;
};

// Client-side PDF generation
export const generateClientPDF = async (invoice) => {
  if (!jsPDF) {
    await initPDF();
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const rightEdge = pageWidth - margin;
  const leftColumnWidth = 96;
  const summaryWidth = 72;

  const splitLines = (text, width) =>
    text ? doc.splitTextToSize(String(text), width).filter(Boolean) : [];

  const isInterState = () => {
    const buyerState = getStateFromAddress(invoice.buyerAddress || invoice.customerAddress || "");
    return SELLER_STATE_CODE !== buyerState;
  };

  const drawLabelValueRow = (label, value, x, y, valueX) => {
    doc.setFont(undefined, "normal");
    doc.text(label, x, y);
    doc.text(value, valueX, y, { align: "right" });
  };

  let cursorY = 20;
  doc.setTextColor(17, 24, 39);
  doc.setFont(undefined, "bold");
  doc.setFontSize(20);
  doc.text(invoice.sellerName || "ROBOBOOKS SOLUTIONS", centerX, cursorY, {
    align: "center",
  });

  cursorY += 7;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10.5);
  splitLines(
    invoice.sellerAddress || "123 Business Street, Tech Park, Bangalore - 560001",
    120
  ).forEach((line) => {
    doc.text(line, centerX, cursorY, { align: "center" });
    cursorY += 4.8;
  });

  doc.text(
    `${invoice.sellerPhone || "+91 9876543210"} | ${invoice.sellerEmail || "info@robobooks.com"}`,
    centerX,
    cursorY,
    { align: "center" }
  );
  cursorY += 4.8;
  doc.text(
    `GSTIN: ${invoice.sellerGstin || "29ABCDE1234F1Z5"} | Origin of Supply: ${SELLER_STATE_CODE}-Karnataka`,
    centerX,
    cursorY,
    { align: "center" }
  );

  cursorY += 6.5;
  doc.setFontSize(8.5);
  const headerMeta = [
    `Invoice No: ${invoice.invoiceNumber}`,
    `Date: ${formatDate(invoice.invoiceDate)}`,
    `Due Date: ${formatDate(invoice.dueDate)}`,
    invoice.orderNumber ? `Order No: ${invoice.orderNumber}` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  splitLines(headerMeta, 170).forEach((line) => {
    doc.text(line, centerX, cursorY, { align: "center" });
    cursorY += 4;
  });

  cursorY += 1.5;
  doc.setDrawColor(31, 41, 55);
  doc.setLineWidth(0.4);
  doc.line(margin, cursorY, rightEdge, cursorY);

  const sectionTop = cursorY + 10;
  const leftColX = margin;
  const rightColX = margin + contentWidth / 2 + 4;
  const columnWidth = contentWidth / 2 - 6;
  const fieldLineHeight = 4.6;

  const renderBlock = (title, lines, startX, startY) => {
    let blockY = startY;
    doc.setFont(undefined, "bold");
    doc.setFontSize(11);
    doc.text(title, startX, blockY);
    blockY += 6;

    doc.setFontSize(10);
    lines.forEach((line, index) => {
      const wrapped = splitLines(line, columnWidth);
      if (!wrapped.length) return;
      doc.setFont(undefined, index === 0 ? "bold" : "normal");
      wrapped.forEach((wrappedLine) => {
        doc.text(wrappedLine, startX, blockY);
        blockY += fieldLineHeight;
      });
      blockY += 0.6;
    });

    return blockY;
  };

  const billingLines = [
    invoice.buyerName || invoice.customerName,
    invoice.buyerAddress || invoice.customerAddress,
    (invoice.buyerPhone || invoice.customerPhone)
      ? `Phone: ${invoice.buyerPhone || invoice.customerPhone}`
      : null,
    (invoice.buyerEmail || invoice.customerEmail)
      ? `Email: ${invoice.buyerEmail || invoice.customerEmail}`
      : null,
    invoice.buyerGstin ? `GSTIN: ${invoice.buyerGstin}` : null,
    `State: ${getStateLabel(invoice.buyerAddress || invoice.customerAddress || "")}`,
  ].filter(Boolean);

  const shippingLines = [
    invoice.buyerName || invoice.customerName,
    invoice.buyerAddress || invoice.customerAddress,
    `Place of Supply: ${
      invoice.placeOfSupplyState
        ? `${getStateFromAddress(invoice.placeOfSupplyState)}-${invoice.placeOfSupplyState}`
        : `${getStateFromAddress(invoice.buyerAddress || invoice.customerAddress || "")}-Delivery Location`
    }`,
    invoice.terms ? `Terms: ${invoice.terms}` : null,
    invoice.salesperson ? `Salesperson: ${invoice.salesperson}` : null,
  ].filter(Boolean);

  const billingBottom = renderBlock("Billing Address", billingLines, leftColX, sectionTop);
  const shippingBottom = renderBlock("Shipping Address", shippingLines, rightColX, sectionTop);
  const tableStartY = Math.max(billingBottom, shippingBottom) + 6;

  const items = Array.isArray(invoice.items) ? invoice.items : [];
  const defaultTaxRate = Number(invoice.taxRate || items[0]?.taxRate || 18);
  const rows = items.map((item, index) => [
    String(index + 1),
    item.details || item.description || "-",
    item.hsnSac || item.hsn || "8704",
    String(Number(item.quantity || 0)),
    formatCurrency(item.rate || 0),
    `${Number(item.taxRate ?? defaultTaxRate)}%`,
    formatCurrency(item.amount || 0),
  ]);

  rows.push([
    "TOTAL",
    "",
    "",
    String(items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)),
    "",
    formatCurrency(invoice.taxAmount || 0),
    formatCurrency(invoice.total || invoice.subTotal || 0),
  ]);

  autoTable(doc, {
    startY: tableStartY,
    margin: { left: margin, right: margin },
    theme: "grid",
    head: [["SR NO.", "ITEM NAME", "HSN/SAC", "QTY", "RATE", "TAX %", "AMOUNT"]],
    body: rows,
    styles: {
      fontSize: 9,
      cellPadding: 2.4,
      lineColor: [156, 163, 175],
      lineWidth: 0.2,
      textColor: [17, 24, 39],
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [243, 244, 246],
      textColor: [17, 24, 39],
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: {
      0: { cellWidth: 16, halign: "left" },
      1: { cellWidth: 64, halign: "left" },
      2: { cellWidth: 22, halign: "left" },
      3: { cellWidth: 16, halign: "right" },
      4: { cellWidth: 27, halign: "right" },
      5: { cellWidth: 20, halign: "right" },
      6: { cellWidth: 25, halign: "right" },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.row.index === rows.length - 1) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [249, 250, 251];
      }
    },
  });

  const finalY = doc.lastAutoTable.finalY;
  const detailsTopY = finalY + 10;
  const summaryX = rightEdge - summaryWidth;
  const summaryValueX = rightEdge - 2;
  let summaryRowCount = 3;

  if (Number(invoice.discountAmount || 0) > 0) {
    summaryRowCount += 1;
  }

  if (Number(invoice.taxAmount || 0) > 0) {
    summaryRowCount += isInterState() ? 1 : 2;
  }

  if (invoice.additionalTaxAmount !== 0 && invoice.additionalTaxType) {
    summaryRowCount += 1;
  }

  if (Number(invoice.adjustment || 0) !== 0) {
    summaryRowCount += 1;
  }

  const summaryBoxHeight = Math.max(42, summaryRowCount * 6 + 16);

  doc.setFont(undefined, "bold");
  doc.setFontSize(10.5);
  doc.text("Invoice Amount In Words", leftColX, detailsTopY);
  doc.setFont(undefined, "normal");
  doc.setFontSize(9.2);
  const amountWordLines = splitLines(numberToWords(Number(invoice.total || 0)), leftColumnWidth);
  amountWordLines.forEach((line, index) => {
    doc.text(line, leftColX, detailsTopY + 6 + index * 4.4);
  });

  const termsTopY = detailsTopY + 12 + amountWordLines.length * 4.4;
  doc.setFont(undefined, "bold");
  doc.setFontSize(10.5);
  doc.text("Terms And Conditions", leftColX, termsTopY);
  doc.setFont(undefined, "normal");
  doc.setFontSize(9.2);
  const termsLines = splitLines(
    invoice.termsConditions || "Thank you for doing business with us.",
    leftColumnWidth
  );
  termsLines.forEach((line, index) => {
    doc.text(line, leftColX, termsTopY + 6 + index * 4.4);
  });

  let summaryY = detailsTopY;
  doc.setDrawColor(156, 163, 175);
  doc.setLineWidth(0.2);
  doc.rect(summaryX - 4, summaryY - 5, summaryWidth + 6, summaryBoxHeight);

  drawLabelValueRow("Sub Total:", formatCurrency(invoice.subTotal || 0), summaryX, summaryY, summaryValueX);
  summaryY += 6;

  if (Number(invoice.discountAmount || 0) > 0) {
    drawLabelValueRow(
      `Discount${invoice.discountType === "percentage" ? ` (${invoice.discount || 0}%)` : ""}:`,
      `- ${formatCurrency(invoice.discountAmount || 0)}`,
      summaryX,
      summaryY,
      summaryValueX
    );
    summaryY += 6;
  }

  if (Number(invoice.taxAmount || 0) > 0) {
    if (!isInterState()) {
      drawLabelValueRow(
        `CGST @ ${defaultTaxRate / 2}%:`,
        formatCurrency((invoice.taxAmount || 0) / 2),
        summaryX,
        summaryY,
        summaryValueX
      );
      summaryY += 6;
      drawLabelValueRow(
        `SGST @ ${defaultTaxRate / 2}%:`,
        formatCurrency((invoice.taxAmount || 0) / 2),
        summaryX,
        summaryY,
        summaryValueX
      );
      summaryY += 6;
    } else {
      drawLabelValueRow(
        `IGST @ ${defaultTaxRate}%:`,
        formatCurrency(invoice.taxAmount || 0),
        summaryX,
        summaryY,
        summaryValueX
      );
      summaryY += 6;
    }
  }

  if (invoice.additionalTaxAmount !== 0 && invoice.additionalTaxType) {
    drawLabelValueRow(
      `${invoice.additionalTaxType} @ ${invoice.additionalTaxRate || 0}%:`,
      `${invoice.additionalTaxType === "TDS" ? "-" : "+"} ${formatCurrency(Math.abs(invoice.additionalTaxAmount || 0))}`,
      summaryX,
      summaryY,
      summaryValueX
    );
    summaryY += 6;
  }

  if (Number(invoice.adjustment || 0) !== 0) {
    drawLabelValueRow(
      "Adjustment:",
      `${invoice.adjustment > 0 ? "+" : "-"} ${formatCurrency(Math.abs(invoice.adjustment || 0))}`,
      summaryX,
      summaryY,
      summaryValueX
    );
    summaryY += 6;
  }

  doc.line(summaryX, summaryY, summaryValueX, summaryY);
  summaryY += 6;
  doc.setFont(undefined, "bold");
  doc.setFontSize(11.5);
  doc.text("Total:", summaryX, summaryY);
  doc.text(formatCurrency(invoice.total || 0), summaryValueX, summaryY, {
    align: "right",
  });

  summaryY += 8;
  doc.setFontSize(10);
  drawLabelValueRow("Received:", formatCurrency(invoice.amountPaid || 0), summaryX, summaryY, summaryValueX);
  summaryY += 6;
  doc.setFont(undefined, "bold");
  drawLabelValueRow("Balance:", formatCurrency(invoice.balanceDue || 0), summaryX, summaryY, summaryValueX);

  const detailsBottomY = Math.max(termsTopY + 8 + termsLines.length * 4.4, summaryY + 10);
  const signatureY = Math.min(detailsBottomY + 14, pageHeight - 28);

  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`For: ${invoice.sellerName || "ROBOBOOKS SOLUTIONS"}`, leftColX, signatureY);
  doc.line(leftColX, signatureY + 16, leftColX + 48, signatureY + 16);
  doc.text("Authorized Signatory", leftColX, signatureY + 21);
  doc.text("www.robobooks.com", rightEdge, signatureY + 21, { align: "right" });

  doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  return doc;
};

export default { generateClientPDF };
