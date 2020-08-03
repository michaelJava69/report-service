const express = require('express');

const ReportCtrl = require('../controllers/report-controller');

const router = express.Router()

router.post('/addreport', ReportCtrl.addNewReport);
router.get('/reports', ReportCtrl.getAllReports);
router.get('/reports/:id', ReportCtrl.getReportById);

module.exports = router;