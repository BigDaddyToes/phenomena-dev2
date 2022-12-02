// Build an apiRouter using express Router
const { json } = require("express");
const express = require("express");
const { getOpenReports, createReport, closeReport } = require("../db");
const router = express.Router();

// Import the database adapter functions from the db

/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */
router.get("/reports", async (req, res, next) => {
  try {
    const reports = await getOpenReports();
    res.send(reports);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */

router.post("/reports", async (req, res, next) => {
  const reports = req.body;
  try {
    const newReport = await createReport(reports);
    if (newReport) {
      res.send({
        title: newReport.title,
        location: newReport.location,
        description: newReport.description,
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */
router.delete("/reports/:reportID", async (req, res, next) => {
  let closedReport = req.params.reportID;
  let getPassword = req.body.password;
  try {
    reportToClose = await closeReport(reportId, password);
    res.send(reportToClose);
  } catch (error) {
    next(error);
  }
});

/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

// Export the apiRouter
