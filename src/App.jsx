import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Restaurantlista } from "./componentes/RestaurantList";
import { RestaurantDall } from "./componentes/RestaurantDetail";
import { AgrearRes } from "./componentes/RestaurantCreate";
export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Restaurant Reviews
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Restaurant</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Restaurantlista />} />
        <Route path="/create" element={<AgrearRes />} />
      </Routes> 
    </Router>
  );
};
