import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
const jwt = require("jsonwebtoken");

const URL = "https://stock-api.deel-ramverk.me"

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: "",
            balance: "",
            stocks: [],
            redirect: false
        }
    }

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

        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let headers = {
            "Content-Type": "application/json",
            "x-access-token": token
        }

        axios({
            method: 'POST',
            url: URL + "/balance/" + email,
            data: {
                email: email,
                balance: parseInt(this.state.intro.balance) + parseInt(this.state.balance)
            },
            headers: headers, 
        })
        .then( (response) => {
            this.fetchBalance();

        })

    };


    fetchBalance() {
        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let headers = {
            "Content-type": "application/json",
            "x-access-token": token
        }

        axios({
            method: "GET",
            url: URL + "/users/" + email,
            headers: headers,

        })
        .then(res => {
            //console.log(res.data)
            const intro = res.data.data;
            this.setState({ intro })
        })
    }

    fetchStocks() {
        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let headers = {
            "Content-type": "application/json",
            "x-access-token": token
        }

        axios({
            method: "GET",
            url: URL + "/stocks/" + email,
            headers: headers,
        })
        .then(res => {
            //console.log(res.data)
            let stocks = res.data.response.data;
           
            this.setState({ stocks });
            console.log(this.state.stocks);
        
        
        })
    }
    componentDidMount() {
        this.fetchBalance();
        this.fetchStocks();
    }


    //TODO: ADD A TABLE TO PRESENT ALL THE STOCKS

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/profile"/>;
        }
        
        let stocks = this.state.stocks;

        return (
            <div> 
                <h2>Profile</h2>    
                <p>Balance: {this.state.intro.balance} </p> 
                
                <form onSubmit={this.handleSubmit}>
                  <label className="input-label">
                  Add credits<br></br><br></br>
                      <input autoComplete="off" className="input-field" type="text" name="balance" value={this.state.balance} onChange={this.handleChange} />
                  </label>
                  
                  <br></br>
                  <input type="submit" value="Submit" />
              </form>
              <br></br>
                <tr></tr>
                <hr></hr>
                <br></br>
                <h2>Stocks</h2>
                <br></br>
                <table className="stocks">
                    <tr>
                        <th>Stocks</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>
                            Stock1
                        </td>
                        <td>
                            {this.state.stocks.stock1}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stock2
                        </td>
                        <td>
                            {this.state.stocks.stock2}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stock3
                        </td>
                        <td>
                            {this.state.stocks.stock3}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stock4
                        </td>
                        <td>
                            {this.state.stocks.stock4}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Stock5
                        </td>
                        <td>
                            {this.state.stocks.stock5}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}