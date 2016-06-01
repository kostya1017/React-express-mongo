import React from 'react';
import { Link } from 'react-router';

const NavBar = ({ score }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">Cash Flow Quiz</Link>
      </div>
      {typeof score !== 'undefined' && <p className="navbar-text navbar-right">Points so far: {score}</p>}
    </div>
  </nav>
);

export default NavBar;
