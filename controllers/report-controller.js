const Report = require('../models/report-model');

addNewReport = (req,res) => {
    const body = req.body
    
    if(!body) {
        return res.status(400).json({
            sucess: false,
            error: 'No Report Added',
        });
    }
    const report = new Report(body[0]);

    report
      .save()
      .then(() => {
          return res.status(201).json({
              success: true,
              id: report._id,
              message: 'Report Added',
          });
      })
      .catch(error => {
          return res.status(400).json({
              error,
              message: 'An error',
          });
      });
}

getAllReports = async (req, res) => {
    await Report.find({}, (err, reports) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!reports.length) {
            return res.status(404).json({ success: false, error: 'Not Found' });
        }
        return res.status(200).json({ success: true, data: reports })
    }).catch(err => console.log(err));
}

getReportById = async (req, res) => {
    await Report.findOne({ _id: req.params.id }, (err, report) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!report) {
            return res.status(404).json({ success: false, error: 'Report Not Found' });
        }
        return res.status(200).json({ success: true, data: report })
    }).catch(err => console.log(err));
}

module.exports = {
    addNewReport,
    getAllReports,
    getReportById,
}
