const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Report = new Schema(
    {
        Target: String,
        ScanType: String,
        BuildNumber: String,
        Vulnerabilities: [{
            VulnerabilityID: String,
            Description: String,
            Severity: String,
            InstalledVersion: String,
            FixedVersion: String,
        }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('reports', Report);