import Bill from '../models/Bill.js';
import mongoose from 'mongoose';
import Bill from '../models/Bill.js';

const PENDING_BILL_STATUSES = ['draft', 'sent', 'received'];

const toObjectId = (value) => {
  if (!value) {
    return value;
  }

  if (value instanceof mongoose.Types.ObjectId) {
    return value;
  }

  return mongoose.Types.ObjectId.isValid(value)
    ? new mongoose.Types.ObjectId(value)
    : value;
};

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const buildBillMatch = (filters = {}) => {
  const { startDate, endDate, organizationId, vendorId, status } = filters;
  const match = {};

  if (organizationId) {
    match.organizationId = toObjectId(organizationId);
  }

  if (vendorId) {
    match.vendorId = toObjectId(vendorId);
  }

  if (status) {
    match.status = status;
  }

  if (startDate || endDate) {
    match.createdAt = {};

    if (startDate) {
      match.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      match.createdAt.$lte = new Date(endDate);
    }
  }

  return match;
};

export const createBill    = (data) => Bill.create(data);
export const getBillById   = (id)   => Bill.findById(id);

// Get all bills with pagination and filtering
export const getBills = async (filters = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      organizationId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      vendorId,
      vendor_id
    } = filters;
    const pageNumber = toPositiveInt(page, 1);
    const limitNumber = toPositiveInt(limit, 10);
    const query = buildBillMatch({
      organizationId,
      status,
      vendorId: vendorId || vendor_id
    });

    if (search) {
      query.$or = [
        { billNumber: { $regex: search, $options: "i" } },
        { vendorName: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } }
      ];
    }

    const sortOptions = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1
    };

    const bills = await Bill.find(query)
      .populate('vendorId', 'name companyName email')
      .sort(sortOptions)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    const total = await Bill.countDocuments(query);

    return {
      bills,
      pagination: {
        current: pageNumber,
        pages: Math.ceil(total / limitNumber),
        total
      }
    };
  } catch (error) {
    throw new Error(`Failed to fetch bills: ${error.message}`);
  }
};

// Get bill statistics
export const getBillStats = async (filters = {}) => {
  try {
    const filter = buildBillMatch(filters);

    // Get basic counts
    const [
      totalBills,
      paidBills,
      pendingBills,
      overdueBills
    ] = await Promise.all([
      Bill.countDocuments(filter),
      Bill.countDocuments({ ...filter, status: "paid" }),
      Bill.countDocuments({ ...filter, status: { $in: PENDING_BILL_STATUSES } }),
      Bill.countDocuments({ ...filter, status: "overdue" })
    ]);

    // Get expense statistics
    const expenseStats = await Bill.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$totalAmount" },
          paidExpenses: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$totalAmount", 0] } },
          pendingExpenses: {
            $sum: {
              $cond: [
                { $in: ["$status", PENDING_BILL_STATUSES] },
                "$totalAmount",
                0
              ]
            }
          },
          overdueExpenses: { $sum: { $cond: [{ $eq: ["$status", "overdue"] }, "$totalAmount", 0] } }
        }
      }
    ]);

    const stats = expenseStats[0] || {
      totalExpenses: 0,
      paidExpenses: 0,
      pendingExpenses: 0,
      overdueExpenses: 0
    };

    return {
      totalBills,
      paidBills,
      pendingBills,
      overdueBills,
      totalExpenses: stats.totalExpenses,
      paidExpenses: stats.paidExpenses,
      pendingExpenses: stats.pendingExpenses,
      overdueExpenses: stats.overdueExpenses
    };
  } catch (error) {
    throw new Error(`Failed to get bill statistics: ${error.message}`);
  }
};

