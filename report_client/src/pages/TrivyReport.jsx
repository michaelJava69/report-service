import React, { Component } from 'react';
import axios from 'axios';
import './index.css'
import ReactTable from 'react-table-6';
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 20px 20px 20px;
`

const Detail = props => (
    <tr className={props.detail.Severity==='HIGH' ? 'high' : props.detail.Severity==='CRITICAL' ? 'critical' : ' '}>
        <td>{props.detail.VulnerabilityID}</td>
        <td>{props.detail.Description}</td>
        <td>{props.detail.Severity}</td>
        <td>{props.detail.InstalledVersion}</td>
        <td>{props.detail.FixedVersion}</td>
    </tr>
)

class TrivyReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vulnerabilities: [],
            isLoading: false };
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true })
        await axios.get('http://localhost:3000/api/reports/' + this.props.match.params.id)
            .then(response => {
                this.setState({ target: response.data.data.Target });
                this.setState({ vulnerabilities: response.data.data.Vulnerabilities });
                this.setState({ createdAt: response.data.data.createdAt });
                this.setState({isLoading: false})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    vulnerabilityList() {
        return this.state.vulnerabilities.map(function(current, i) {
            return <Detail detail={current} key={i} />;
        });
    }

    reportName() {
        var date = new Date(this.state.createdAt).toLocaleString();
        return this.state.target + ' ' + date;
    }

    ooldrender() {
        return (
            <div>
                <h3 style={{ paddingLeft: 10 }}>{this.reportName()}</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th width="10%">Vulnerability ID</th>
                            <th width="60%">Description</th>
                            <th width="10%">Severity</th>
                            <th width="5%">Installed</th>
                            <th width="5%">Fix?</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.vulnerabilityList() }
                    </tbody>
                </table>
            </div>
        )
    }


    getTrProps(state, rowInfo, column) {
        if(rowInfo) {
            return {
                className: (rowInfo.row.Severity==='HIGH') ? 'high' : (rowInfo.row.Severity==='CRITICAL') ? 'critical' : ''}
        }
    }

    render() {
            const { vulnerabilities, isLoading } = this.state
        
            console.log(vulnerabilities);
            const columns = [
                {
                    Header: 'ID',
                    accessor: 'VulnerabilityID',
                    width: 180
                },
                {
                    Header: 'Severity',
                    accessor: 'Severity',
                    width: 120
                },
                {
                    Header: 'Description',
                    accessor: 'Description',
                    width: 1700
                },
 
                {
                    Header: 'Installed',
                    accessor: 'InstalledVersion',
                    width: 100
                },
                {
                    Header: 'Fix In',
                    accessor: 'FixedVersion',
                    width: 100
                }
            ]

            let showTable = true;
            if (!vulnerabilities.length) {
                showTable = false
            }

            return (
                <Wrapper>
                    {showTable && (
                        <ReactTable
                            data={vulnerabilities}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={50}
                            minRows={0}
                            getTrProps={this.getTrProps}
                        />
                    )}
                </Wrapper>
            )
    }
}

export default TrivyReport