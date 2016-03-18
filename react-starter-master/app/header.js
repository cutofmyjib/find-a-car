import React, {Component} from 'react';
import { Link } from 'react-router'
export default class Header extends Component {
  render() {
    return (
      <header className="customheader">
        <Link to='/'><h1>FINDA CAR</h1></Link>
      </header>
    );
  }
}