import React from "react";
import axios from "axios";
const jwt = require("jsonwebtoken");



const initialState = {
    buyAmount: 0,
    buyTotal: 0,
    stocks: [],
};



export default class Stockbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    
    componentDidMount() {
        this.fetchStock();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value)
        console.log(this.state.amount)

    };


    setBuyAmount = event => {
        this.setState({ buyAmount: event.target.value })
        this.setState({ buyTotal: event.target.value * this.props.price })
    }
 

    fetchStock() {

        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let headers = {
            "Content-type": "application/json",
            "x-access-token": token
        }

        axios({
            method: "GET",
            url: "http://localhost:8421/stocks/" + email,
            headers: headers,
        })
        .then(res => {
            let stocks = res.data.response.data;
            this.setState({ stocks });
        })

    }



    buyStocks(stockName, balance, amount) {
        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let data = {
            email: email,
            balance: 0,
            stock: stockName,
            amount: amount
        }
        console.log(amount)
        data["balance"] = balance;
        console.log(data)

        let headers = {
            "Content-Type": "application/json",
            "x-access-token": token
        }

        axios({
            method: 'POST',
            url: "http://localhost:8421/stocks/" + email,
            data: data,
            headers: headers, 
        })
        .then( (response) => {
            console.log(response.message)
            this.fetchStock()
        })
    };


    clickToBuy = () => {

        let buyTotal = this.state.buyTotal;
        let buyAmount = this.state.buyAmount
        let balance = this.props.balance;
        let label = this.props.label;

        if (buyTotal > balance) {
            alert("Not enough credits")
        } else if (buyTotal < 0) {
            alert("Can't buy stocks below zero.")
        } else {
            alert("Stocks bought for " + buyTotal)
            
            
            console.log(this.state.stocks)
            let updatedBalance = parseInt(balance) - parseInt(buyTotal)

            let updatedStockAmount = parseInt(this.state.stocks[label]) + parseInt(buyAmount);

            this.buyStocks(label, updatedBalance, updatedStockAmount)
        }
    }

    clickToSell = () => {

        let buyTotal = this.state.buyTotal;
        let buyAmount = this.state.buyAmount
        let balance = this.props.balance;
        let label = this.props.label;

        if (buyTotal > balance) {
            alert("Not enough credits")
        } else if (buyTotal < 0) {
            alert("Can't buy stocks below 0.")
        } else {
            alert("Stocks sold for " + buyTotal)
            
            
            console.log(this.state.stocks)
            let updatedBalance = parseInt(balance) + parseInt(buyTotal)

            let updatedStockAmount = parseInt(this.state.stocks[label]) - parseInt(buyAmount);

            this.buyStocks(label, updatedBalance, updatedStockAmount)


        }
    }

    render() {
        //console.log(this.props.valueFromParent.data.datasets)
        let label = this.props.label;
        let balance = this.props.balance;
        let itemPrice = this.props.price

        console.log(balance)

        return (
            <div className="stockBox">
            <h3>{label}</h3>
            <hr></hr>
            <p> Price: {itemPrice}</p>
            <p>Owned: {this.state.stocks[label]}</p>
            <br></br>
            <input placeholder="Amount" value={this.state.buyAmount} onChange={this.setBuyAmount}/>
            <button className="buyButton" onClick={this.clickToBuy.bind(this)}>BUY</button>
            <button className="sellButton" onClick={this.clickToSell.bind(this)}>SELL</button>

        </div>
        )

    }


}
