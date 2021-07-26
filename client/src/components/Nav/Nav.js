import React, { useEffect } from "react";
import axios from "axios";

function Nav() {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("api/user/logout")

      .then((response) => {
        window.location.replace("/login");
      });
  };

  useEffect(() => {
    var elem = document.querySelector(".sidenav");
    var instance = window.M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250,
    });
  }, []);

  return (
    <nav>
      <div className="#69f0ae green accent-2 nav-wrapper">
        <a href="/login" className="brand-logo">
          ADULTING
        </a>
        <a href="/Home" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="/AllActivities">Activity Log</a>
          </li>
          <li>
            <a href="/" onClick={handleSubmit}>Log Out</a>
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
