import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { ReportList, TrivyReport } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table-6/react-table.css';
import logo from "../logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" target="_blank" href="/#">
              <img src={logo} width="30" height="30" alt="localhost:8000" />
            </a>
            <Link to="/" className="navbar-brand">Pipeline Report Viewer</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">View Reports</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
            <Route path="/" exact component={ReportList} />
            <Route path="/detail/:id" component={TrivyReport} />
        </div>
      </Router>
    );
  }
}

export default App