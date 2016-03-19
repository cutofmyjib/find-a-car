import React, {Component} from 'react';
import { Link } from 'react-router'
export default class Header extends Component {
  render() {
    return (
      <header className="customheader">
        <Link to='/'>
          <span className="flex-row">
            <span className="header-icon">
            </span>
            <h1>finda car</h1>
          </span>
        </Link>
      </header>
    );
  }
}