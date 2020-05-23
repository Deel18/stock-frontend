import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from "react-router-dom";
import brand from "./img/brand.png"
const jwt = require("jsonwebtoken");




export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let login;
        let loginMessage;
        let stocks;

        if (this.props.loggedIn) {
            login = (
                <React.Fragment>
                <li> 
                    <NavLink exact to="/stocks"> Stocks</NavLink>
                </li>
                <li>
                     <NavLink exact to="/profile"> Profile</NavLink>
                </li>
                <li>
                     <NavLink exact to="/logout"> Logout</NavLink>
                </li>
                </React.Fragment>
            );
        } else {
            login = (
                <React.Fragment>
                <li> <NavLink exact to="/login"> Login </NavLink></li>
                <li> <NavLink exact to="/register"> Register</NavLink></li>
                </React.Fragment>
            )
        }

        return (
            <nav className="App-header">
                <ul>
                    <li><img className="brand" src={brand} alt="brand" /></li>
                

                    <li>
                        <NavLink exact to="/"> Home </NavLink>
                    </li>
                    
                    {login}
                    
                </ul>
            </nav>
        )
    }
}
