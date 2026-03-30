"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface SalesOrderItem {
  _id: string;
  itemId: string;
  details: string;
  description?: string;
  quantity: number;
  rate: number;
  taxRate: number;
  taxAmount: number;
  amount: number;
}

interface SalesOrder {
  _id: string;
  salesOrderNumber: string;
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  deliveryDate: string;
  items: SalesOrderItem[];
  subTotal: number;
  taxAmount: number;
  total: number;
  status: string;
  customerNotes?: string;
  termsConditions?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);

const SalesOrderPrintPage = () => {
  const params = useParams();
  const router = useRouter();
  const [salesOrder, setSalesOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales-orders/${params.id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setError("Failed to fetch sales order");
          return;
        }

        const result = await response.json();
        setSalesOrder(result.data || result);
      } catch (fetchError) {
        console.error("Error fetching sales order for print:", fetchError);
        setError("Failed to fetch sales order");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSalesOrder();
    }
  }, [params.id]);

  const handleBack = () => {
    router.push(`/dashboard/sales/sales-orders/${params.id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading sales order...</p>
        </div>
      </div>
    );
  }

  if (error || !salesOrder) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Sales order not found"}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const customerName = salesOrder.customerId
    ? `${salesOrder.customerId.firstName || ""} ${salesOrder.customerId.lastName || ""}`.trim()
    : salesOrder.customerName;

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      <div className="no-print border-b bg-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {"< Back"}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700"
          >
            Print Sales Order
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl p-6 print:p-0">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
          <div className="flex items-start justify-between gap-6 border-b border-gray-200 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                RoboBooks
              </p>
              <h1 className="mt-2 text-3xl font-bold">Sales Order</h1>
              <p className="mt-2 text-sm text-gray-600">
                Order #{salesOrder.salesOrderNumber}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Order Date:</span>{" "}
                {new Date(salesOrder.orderDate).toLocaleDateString()}
              </p>
              <p className="mt-1">
                <span className="font-medium text-gray-900">Delivery Date:</span>{" "}
                {new Date(salesOrder.deliveryDate).toLocaleDateString()}
              </p>
              <p className="mt-1">
                <span className="font-medium text-gray-900">Status:</span>{" "}
                {salesOrder.status}
              </p>
            </div>
          </div>

          <div className="grid gap-6 border-b border-gray-200 py-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                Customer
              </h2>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {customerName || "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {salesOrder.customerId?.email || salesOrder.customerEmail || "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {salesOrder.customerId?.phone || salesOrder.customerPhone || "N/A"}
              </p>
              {salesOrder.customerId?.company && (
                <p className="mt-1 text-sm text-gray-600">
                  {salesOrder.customerId.company}
                </p>
              )}
            </div>

            {salesOrder.customerId?.address && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Shipping Address
                </h2>
                <div className="mt-3 text-sm text-gray-600">
                  <p>{salesOrder.customerId.address.street}</p>
                  <p>
                    {salesOrder.customerId.address.city},{" "}
                    {salesOrder.customerId.address.state}{" "}
                    {salesOrder.customerId.address.zipCode}
                  </p>
                  <p>{salesOrder.customerId.address.country}</p>
                </div>
              </div>
            )}
          </div>

          <div className="py-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Item
                    </th>
                    <th className="py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Qty
                    </th>
                    <th className="py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Rate
                    </th>
                    <th className="py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Tax
                    </th>
                    <th className="py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrder.items.map((item) => (
                    <tr key={item._id} className="border-b border-gray-100">
                      <td className="py-4 pr-4 align-top">
                        <p className="font-medium text-gray-900">{item.details}</p>
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td className="py-4 pr-4 align-top text-sm text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="py-4 pr-4 align-top text-sm text-gray-700">
                        {formatCurrency(item.rate)}
                      </td>
                      <td className="py-4 pr-4 align-top text-sm text-gray-700">
                        {item.taxRate}%
                      </td>
                      <td className="py-4 text-right align-top text-sm font-medium text-gray-900">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 border-t border-gray-200 pt-6 md:grid-cols-[1fr_320px]">
            <div>
              {salesOrder.customerNotes && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Notes
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">{salesOrder.customerNotes}</p>
                </div>
              )}
              {salesOrder.termsConditions && (
                <div className="mt-5">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Terms & Conditions
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {salesOrder.termsConditions}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(salesOrder.subTotal)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>{formatCurrency(salesOrder.taxAmount)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(salesOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderPrintPage;
