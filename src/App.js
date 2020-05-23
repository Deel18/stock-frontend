import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './style/App.css';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import Register from "./components/Register.js";
import Index from "./components/Index.js";
import Profile from "./components/Profile.js";
import Stocks from "./components/Stocks.js";

const jwt = require("jsonwebtoken")


const loggedIn = {
  getToken: () => {
    
    if (window.localStorage.getItem("token")) {

      let sec = 1000;
      let date = new Date();
      let time = date.getTime();

      const expiry = jwt.decode(window.localStorage.getItem("token")).exp;

      if (expiry > Math.round(time / sec)) {
        return true
      }
    }
    return false

  }
}





function AppRouter() {
  return (
    <Router>
      <div className="App">
      <Header loggedIn={loggedIn.getToken()} />
      <body className="App-body">
      <Route path="/"  exact component={Index} />
      <Route path="/login" render={() => (loggedIn.getToken() ? (<Redirect to="/logout"/>) : <Route component={Login}/>)} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/register" exact component={Register} />
      <Route path="/profile" render={() => (loggedIn.getToken() ? ( <Route component={Profile} />) : (<Redirect to="/login" />))} />
      <Route path="/stocks" render={() => (loggedIn.getToken() ? ( <Route component={Stocks} />) : (<Redirect to="/login" />))} />
      </body>
      <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
