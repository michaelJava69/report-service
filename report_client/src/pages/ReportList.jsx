import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Summary = props => {
    return <div className='container' style={{ padding: '0px' }}>
        <div style={{ color: '#7a1010' }}>Critical: {props.severity[0]}</div>
        <div style={{ color: '#da4343' }}>High: {props.severity[1]} </div>
        <div style={{ color: '#206400' }}>Medium: {props.severity[2]}</div>
        <div style={{ color: '#206400' }}>Low: {props.severity[3]}</div>
    </div>
}

const Report = props => (
    <tr>
        <td>{props.report.Target}</td>
        <td>{props.report.BuildNumber}</td>
        <td>{props.report.ScanType}</td>
        <td>{new Date(props.report.createdAt).toLocaleString()}</td>
        <td>{props.report.Vulnerabilities == null ? "No Vulnerabilites Found!" : <Link to={"/detail/" + props.report._id}>Details</Link>}</td>
        <td>{props.report.Vulnerabilities == null ? "" : <Summary severity={props.severity} />}</td>
    </tr>
)

class ReportsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            columns: [],
            isLoading: false
        };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await axios.get('http://localhost:3000/api/reports/')
            .then(response => {
                this.setState({
                    reports: response.data.data,
                    isLoading: false
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    reportsList() {
        return this.state.reports.map(function (currentReport, i) {
            var severity = (currentReport.Vulnerabilities);
            var crit = 0;
            var high = 0;
            var med = 0
            var low = 0
            if (severity !== null) {
                severity.forEach(function (item, index) {
                    switch (item.Severity) {
                        case 'CRITICAL': crit++; break;
                        case 'HIGH': high++; break;
                        case 'MEDIUM': med++; break;
                        case 'LOW': low++; break;
                        default: break;
                    }
                });
            }
            var sevlist = [crit, high, med, low];
            return <Report report={currentReport} key={i} severity={sevlist} />;
        });
    }

    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Artifact</th>
                            <th>Build Number</th>
                            <th>Scan Type</th>
                            <th>Created</th>
                            <th>Reports</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportsList()}
                    </tbody>
                </table>
            </div>
        )
    }

    dontrender() {

        const { reports, isLoading } = this.state

        const columns = [{
            Header: 'Artifact',
            accessor: 'name'
        }, {
            Header: 'Age',
            accessor: 'age'
        }]

        return (  
            <div>  
               <ReactTable  
                   data={reports}  
                   columns={columns}  
                   defaultPageSize = {2}  
                   pageSizeOptions = {[2,4, 6]}  
                />  
            </div>        
       )  
    }
}

export default ReportsList