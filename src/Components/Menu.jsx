import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {

  return (
    <>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand navbar-right"
            to="/"
            style={{ marginLeft: "1%", marginRight: "-1%" }}
          >
            דף הבית
          </Link>
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/about">אודות</Link>
              </li>
              <li>
                <Link to="/Contact" onClick={e => e.preventDefault()}>יצירת קשר</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
