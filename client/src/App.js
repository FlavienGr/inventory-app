import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <>
        <div className="d-inline-flex flex-column w-25 h-100 navbar-block">
          <h1 className="title">Inventory</h1>
          <nav className="d-flex flex-column w-25 h-100">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to={"/products/"} className="nav-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to={"/inventory"} className="nav-link">
                  Inventory
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
        </div>
        <div className="d-inline-flex flex-column w-75 h-100 min-vh-100 inventory">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
