import Bill from '../models/Bill.js';

export const createBill    = (data) => Bill.create(data);
export const getBillById   = (id)   => Bill.findById(id);

// Get all bills with pagination and filtering
export const getBills = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, search, status, vendorId } = filters;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { billNumber: { $regex: search, $options: "i" } },
        { vendorName: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    if (vendorId) {
      query.vendorId = vendorId;
    }

    const bills = await Bill.find(query)
      .populate('vendorId', 'name companyName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Bill.countDocuments(query);

    return {
      bills,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
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
    const { startDate, endDate, vendorId, status } = filters;
    const pendingStatuses = ['draft', 'sent', 'received'];
    
    // Build filter object
    const filter = {};
    if (startDate || endDate) {
      filter.billDate = {};
      if (startDate) filter.billDate.$gte = new Date(startDate);
      if (endDate) filter.billDate.$lte = new Date(endDate);
    }
    if (vendorId) filter.vendorId = vendorId;
    if (status) filter.status = status;

    // Get basic counts
    const [
      totalBills,
      paidBills,
      pendingBills,
      overdueBills
    ] = await Promise.all([
      Bill.countDocuments(filter),
      Bill.countDocuments({ ...filter, status: "paid" }),
      Bill.countDocuments({ ...filter, status: { $in: pendingStatuses } }),
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
              $cond: [{ $in: ["$status", pendingStatuses] }, "$totalAmount", 0]
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


