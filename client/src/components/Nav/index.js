import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/login";
import AllActivities from "../../pages/AllActivities";

function Nav() {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("api/user/logout")

      .then((response) => {
        window.location.replace("/login");
      });
  };

  return (
    <nav>
      <div className="#69f0ae green accent-2 nav-wrapper">
        <a href="/Home" className="brand-logo">
          ADULTING
        </a>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="/AllActivities">Activity Log</a>
          </li>
          <li>
            <a onClick={handleSubmit}>Log Out</a>
          </li>
        </ul>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="/AllActivities">Activity Log</a>
        </li>
        <li>
          <a href="/login">Log Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
