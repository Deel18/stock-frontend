import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const initialState = {
    email: "",
    password: "",
    balance: 10,
    emailError: "",
    passwordError: "",
    redirect: false,
    registered: "",
};




export default class Register extends React.Component {

    state = initialState;


    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value,

        });

    };

    validate = () => {
        let emailError: "";
        let passwordError: "";

        const passwordRegex = /(?=.*[0-9])/


        if (!this.state.email.includes('@')) {
            emailError = "Invalid email!";
        }

        if (!this.state.password) {
            passwordError = "Password cannot be blank!";
        } else if (this.state.password.length < 8) {
            passwordError = "Password cannot be less than 8 characters!"
        } else if (!passwordRegex.test(this.state.password)) {
            passwordError = "Password must contain one number!"
        }


        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }
        return true;
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            this.setState(initialState);

            axios({
                method: 'POST',
                url: "http://localhost:8421/register",
                data: {
                    email: this.state.email,
                    password: this.state.password,
                    balance: this.state.balance,
                }
            })
            .then( (response) => {
                console.log(response);
                this.setState({ redirect: true })
            })
            .catch( (error) => {
                console.log(error)
                this.setState({
                    registered: "Email is already registered."
                })
            })
        }
    };

    render() {

        return (
          <div>
              <h2>Register</h2>
              <br></br>
              <br></br>
              <form onSubmit={this.handleSubmit}>
                  <label className="input-label">
                  E-mail*<br></br>
                      <input autoComplete="off" className="input-field" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                      <div style={{color: "red", fontSize: 18}}>
                      {this.state.emailError}
                      </div>
                  </label>
                  <label className="input-label">
                  Password*<br></br>
                  <b style={{color: "#61DAFB"}}>Minimum 8 characters and 1 number</b>
                  <br></br>
                      <input autoComplete="off" className="input-field" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                      <div style={{color: "red", fontSize: 18}}>
                      {this.state.passwordError}
                      </div>
                  </label>
                  <input type="submit" value="Submit" />
              </form>
          </div>
        )
    }
}