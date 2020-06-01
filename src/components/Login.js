import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const initialState = {
    email: "",
    password: "",
    emailError: "",
    redirect: false
};

const URL = "https://stock-api.deel-ramverk.me/login"


export default class Login extends React.Component {

    state = initialState;


    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value,

        });

    };


    handleSubmit = event => {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
        }

        axios({
            method: 'POST',
            url: URL,
            data: {
                email: this.state.email,
                password: this.state.password,
                headers: headers
            }
        })
        .then( (response) => {
            localStorage.setItem("token", response.data.response.token);
            //console.log(localStorage)
            this.setState({ redirect: true });

        })
        .catch( (error) => {
            this.setState({ emailError: "Invalid E-mail or Password." })
            //console.log(error)
        })

    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            window.location.href="/"
        }
        return (
          <div>
              <h2>Login</h2>
              <br></br>
              <br></br>
              <form onSubmit={this.handleSubmit}>

                  <label className="input-label">
                  E-mail<br></br>
                      <input autoComplete="off" className="input-field" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                  </label>
                  <label className="input-label">
                  Password<br></br>
                      <input autoComplete="off" className="input-field" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </label>

                  <div style={{color: "red", fontSize: 18}}>
                  {this.state.emailError}
                  </div>
                  <br></br>
                  <input type="submit" value="Submit" />
              </form>
          </div>
        )
    }
}
