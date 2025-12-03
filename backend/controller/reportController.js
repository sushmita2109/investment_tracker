import { Investors, Invesment, Payout } from "../models/index.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";

/* ======================================================
   1. OVERALL SUMMARY REPORT
====================================================== */

export const getOverallSummary = async (req, res) => {
  try {
    const totalInvestors = await Investors.count();
    const investments = await Invesment.findAll();
    const payouts = await Payout.findAll();

    const totalInvestedAmount = investments.reduce(
      (sum, i) => sum + Number(i.amount || 0),
      0
    );

    const totalPayout = payouts.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );

    const currentPortfolioValue = totalInvestedAmount - totalPayout;

    const totalReturns = totalPayout; // correct formula

    const summary = {
      totalInvestors,
      totalInvestedAmount,
      currentPortfolioValue,
      totalReturns,
    };

    return res.json({ success: true, summary });
  } catch (err) {
    console.error("Error Summary:", err);
    res.status(500).json({ success: false });
  }
};
// ------------------ DOWNLOAD CSV ------------------ //

export const downloadOverallSummaryExcel = async (req, res) => {
  try {
    const totalInvestors = await Investors.count();
    const investments = await Invesment.findAll();
    const payouts = await Payout.findAll();

    const totalInvestedAmount = investments.reduce(
      (sum, i) => sum + Number(i.amount || 0),
      0
    );

    const totalPayout = payouts.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );

    const currentPortfolioValue = totalInvestedAmount - totalPayout;

    const totalReturns = totalPayout;

    const summary = [
      {
        totalInvestors,
        totalInvestedAmount,
        currentPortfolioValue,
        totalReturns,
      },
    ];

    // --------------------
    //  Create Excel File
    // --------------------
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Overall Summary");

    // Add header row
    worksheet.addRow([
      "Total Investors",
      "Total Invested Amount",
      "Current Portfolio Value",
      "Total Returns",
    ]);

    // Add summary row
    summary.forEach((item) => {
      worksheet.addRow([
        item.totalInvestors,
        item.totalInvestedAmount,
        item.currentPortfolioValue,
        item.totalReturns,
      ]);
    });

    // Auto column width
    worksheet.columns.forEach((col) => {
      col.width = 25;
    });

    // File name
    const fileName = "overall_summary.xlsx";
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel Error:", err);
    res.status(500).json({ success: false, error: "Failed to generate Excel" });
  }
};

/* ======================================================
   2. INVESTOR-WISE CSV DOWNLOAD
====================================================== */

export const getInvestorReport = async (req, res) => {
  try {
    const { investorid } = req.params;

    // 1. Get investor
    const investor = await Investors.findOne({ where: { userid: investorid } });

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor not found",
      });
    }

    // 2. Get Investments
    const investmentRows = await Invesment.findAll({
      where: { investorid },
    });

    // Add monthlyReturn calculation for each investment
    const investments = investmentRows.map((i) => {
      const amount = Number(i.amount || 0);
      const rate = Number(i.expectedReturnRate || 0); // % per month
      const {
        createdAt,
        updatedAt,
        maturityDate,
        investorid,
        id,
        ...cleanData
      } = i.dataValues;
      const monthlyReturn = amount * (rate / 100);

      const startDate = new Date(cleanData.invesmentDate);
      // console.log("startDate:", startDate);
      const today = new Date();

      let monthsPassed =
        (today.getFullYear() - startDate.getFullYear()) * 12 +
        (today.getMonth() - startDate.getMonth());
      // console.log("monthsPassed:", monthsPassed);

      if (monthsPassed < 0) monthsPassed = 0;

      const totalReturnTillDate = monthlyReturn * monthsPassed;

      const tds = totalReturnTillDate * 0.1;

      const actualPayment = totalReturnTillDate - tds;

      return {
        firstname: investor.firstname,
        lastname: investor.lastname,
        id: cleanData.id,
        invesmentType: cleanData.invesmentType,
        targetAccountDetails: cleanData.targetAccountDetails,
        amount: cleanData.amount,
        invementDate: cleanData.invesmentDate,
        expectedReturnRate: cleanData.expectedReturnRate,
        monthlyReturn,
        totalReturnTillDate,
        tds,
        actualPayment,
      };
    });

    return res.json({
      success: true,
      investments,
    });
  } catch (err) {
    console.log("getInvestorReport Error:", err);
    res.status(500).json({ success: false, err });
  }
};

export const downloadInvestorReportExcel = async (req, res) => {
  try {
    const { investorid } = req.params;

    // Fetch investments for this investor
    const investmentRows = await Invesment.findAll({
      where: { investorid },
    });

    // Prepare investment data
    const investments = investmentRows.map((i) => {
      const amount = Number(i.amount || 0);
      const rate = Number(i.expectedReturnRate || 0);
      const monthlyReturn = amount * (rate / 100);

      return {
        type: i.invesmentType,
        date: i.invementDate,
        amount: amount,
        rate: rate,
        monthlyReturn: monthlyReturn,
        note: i.note,
      };
    });

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Investor Report");

    // Excel Headers
    worksheet.columns = [
      { header: "Investment Type", key: "type", width: 20 },
      { header: "Date", key: "date", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Rate (%)", key: "rate", width: 12 },
      { header: "Monthly Return", key: "monthlyReturn", width: 18 },
      { header: "Note", key: "note", width: 25 },
    ];

    // Add rows
    investments.forEach((inv) => worksheet.addRow(inv));

    // Style first row (header)
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
    });

    // Prepare response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=investor_${investorid}_report.xlsx`
    );

    // Write Excel data to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel Download Error:", err);
    return res.status(500).json({ error: "Failed to generate Excel file" });
  }
};
/* ======================================================
   3. INTEREST REPORT WITH ACTIVE AMOUNT
====================================================== */

export const getInterestReport = async (req, res) => {
  try {
    const investors = await Investors.findAll();

    if (!investors || investors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No investors found",
      });
    }

    let finalReport = [];

    for (const investor of investors) {
      const investorid = investor.userid;

      const investmentRows = await Invesment.findAll({
        where: { investorid },
      });

      if (!investmentRows.length) continue;

      const investmentData = investmentRows.map((i) => {
        const amount = Number(i.amount || 0);
        const rate = Number(i.expectedReturnRate || 0);

        const {
          createdAt,
          updatedAt,
          maturityDate,
          investorid,
          id,
          ...cleanData
        } = i.dataValues;

        const monthlyReturn = amount * (rate / 100);

        // FIXED: correct field name
        const startDate = new Date(cleanData.invesmentDate);
        // console.log("startDate:", startDate);
        const today = new Date();

        let monthsPassed =
          (today.getFullYear() - startDate.getFullYear()) * 12 +
          (today.getMonth() - startDate.getMonth());
        // console.log("monthsPassed:", monthsPassed);

        if (monthsPassed < 0 || isNaN(monthsPassed)) monthsPassed = 0;

        const totalReturnTillDate = monthlyReturn * monthsPassed;

        const tds = totalReturnTillDate * 0.1;
        const actualPayment = totalReturnTillDate - tds;

        return {
          firstname: investor.firstname,
          lastname: investor.lastname,
          investorid: investor.userid,
          investmentId: id,
          invesmentType: cleanData.invesmentType,
          targetAccountDetails: cleanData.targetAccountDetails,
          amount: cleanData.amount,
          invesmentDate: cleanData.invesmentDate, // FIX HERE ALSO
          expectedReturnRate: cleanData.expectedReturnRate,
          monthlyReturn,
          monthsPassed,
          totalReturnTillDate,
          tds,
          actualPayment,
        };
      });

      finalReport.push({
        investorId: investor.userid,
        firstname: investor.firstname,
        lastname: investor.lastname,
        totalInvestments: investmentData.length,
        investments: investmentData,
      });
    }

    return res.json({
      success: true,
      report: finalReport,
    });
  } catch (err) {
    console.log("getInterestReport Error:", err);
    res.status(500).json({ success: false, err });
  }
};
export const downloadInterestReportExcel = async (req, res) => {
  try {
    const report = await getInterestReport();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Interest Report");

    sheet.columns = [
      { header: "Investor ID", key: "investorId", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Investment Type", key: "invesmentType", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Investment Date", key: "invesmentDate", width: 20 }, // FIXED
      { header: "Rate (%)", key: "expectedReturnRate", width: 10 },
      { header: "Monthly Return", key: "monthlyReturn", width: 20 },
      {
        header: "Total Return Till Date",
        key: "totalReturnTillDate",
        width: 25,
      },
      { header: "TDS", key: "tds", width: 15 },
      { header: "Actual Payment", key: "actualPayment", width: 20 },
    ];

    report.forEach((inv) => {
      inv.investments.forEach((i) => {
        sheet.addRow({
          investorId: inv.investorId,
          name: `${inv.firstname} ${inv.lastname}`,
          invesmentType: i.invesmentType,
          amount: i.amount,
          invesmentDate: i.invesmentDate, // FIXED KEY
          expectedReturnRate: i.expectedReturnRate,
          monthlyReturn: i.monthlyReturn ?? 0,
          totalReturnTillDate: i.totalReturnTillDate ?? 0,
          tds: i.tds ?? 0,
          actualPayment: i.actualPayment ?? 0,
        });
      });
    });

    // Set headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=interest_report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel error:", err);
    res.status(500).json({ error: "Failed to create Excel" });
  }
};
/* ======================================================
   4. PAYOUT REPORT
====================================================== */

export const getPayoutReport = async (req, res) => {
  try {
    const investors = await Investors.findAll({
      include: [{ model: Invesment }],
    });

    if (!investors.length) {
      return res.json({ success: false, message: "No data found" });
    }

    const report = [];

    investors.forEach((inv) => {
      inv.Invesments.forEach((i) => {
        const amount = Number(i.amount || 0);
        const tds = (amount * 10) / 100; // 10%
        const actualAmount = amount - tds;

        report.push({
          userid: inv.userid,
          investmentType: i.invesmentType,
          placeholder_name: `${inv.firstname} ${inv.lastname}`,
          amount: amount,
          tds: tds,
          actualAmount: actualAmount,
        });
      });
    });

    return res.json({ success: true, report });
  } catch (err) {
    console.error("Payout Report Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
export const downloadPayoutReportCSV = async (req, res) => {
  try {
    const { payouts } = req.body;

    const fields = ["investorid", "name", "amount", "date"];

    const formatted = payouts.map((p) => ({
      investorid: p.investorid,
      name: `${p.Investor.firstname} ${p.Investor.lastname}`,
      amount: p.amount,
      date: p.createdAt,
    }));

    const parser = new Parser({ fields });
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("payout_report.csv");
    return res.send(csv);
  } catch (err) {
    console.error(err);
  }
};
