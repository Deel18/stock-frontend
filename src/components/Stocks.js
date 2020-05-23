import React from "react";
import { Line } from "react-chartjs-2"
import io from "socket.io-client";
import Stockbox from "./Stockbox.js";
import axios from "axios";
const jwt = require("jsonwebtoken");


//TODO: setup an alert message that informs of purchase being made.
//TODO: Update balance after a successful purchase

const server = "http://localhost:8999";

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            data: {
                labels: [],
                datasets: [
                    { 
                        label: "STOCK1",
                        data: [],
                    },
                    { 
                        label: "STOCK2",
                        data: [],
                    },
                    { 
                        label: "STOCK3",
                        data: [],
                    },
                ]
            }
        }
    }



    componentDidMount() {
        this.socket = io.connect(server);

        this.socket.on("connect", () => {
            console.log("connected!")
        })

        this.socket.on("disconnect", () => {
            console.log("disconnected")
        })

        let self = this;
        this.socket.on('stocks', function(values) {
            if (self.state.data) {
                values.forEach((value, index) => {
                    self.state.data.datasets[index].data.push(
                        values[index].price
                    );
                });
                self.state.data.labels.push(
                    new Date().toLocaleTimeString()
                );

                self.setState(self.state);
            }
        });

        this.fetchBalance();
    }

    componentWillUnmount() {
        this.socket.close();
    }


    fetchBalance() {
        let email = jwt.decode(localStorage.getItem("token")).email;
        let token = localStorage.getItem("token");

        let headers = {
            "Content-type": "application/json",
            "x-access-token": token
        }

        axios({
            method: "GET",
            url: "http://localhost:8421/users/" + email,
            headers: headers,

        })
        .then( (res) => {
            console.log(res.data)
            const balance = res.data.data;
            this.setState({ balance })
        })
    }



    setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(133, 255, 144, 0");
        return gradient;
    }

    getChartData = canvas => {
        const data = this.state.data;
        if (data.datasets) {
            let colors = ["rgba(187, 2, 30, 1)", "rgba(2, 94, 187, 1)", "rgba(220, 227, 28, 1)"];
            let borderColors = ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"]
            data.datasets.forEach((set, i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderColor = this.setGradientColor(canvas, borderColors[i]);
                set.borderWidth = 2;
            })
        }

        return data;
    }

    render() {
        let stock1Price = this.state.data.datasets[0].data.slice().pop()
        let stock2Price = this.state.data.datasets[1].data.slice().pop();
        let stock3Price = this.state.data.datasets[2].data.slice().pop();
        console.log(this.state.data.datasets)
       

        let userBalance = this.state.balance;
        
        return (
            <div className="chart">
                <Line
                data={this.getChartData}
                options= {{
                    title: {
                        display: true,
                        text: "STOCKMARKET",
                        fontSize: 20,
                        //maintainAspectRatio: false,
                        responsive: true
                    },
                }}
                />
            <h4 style={{ "text-align": "center" }}>Current Balance: {this.state.balance.balance}</h4>
            <Stockbox  balance={this.state.balance.balance} price={stock1Price} label={"stock1"}/>
            <Stockbox  balance={this.state.balance.balance} price={stock2Price} label={"stock2"}/>
            <Stockbox  balance={this.state.balance.balance} price={stock3Price} label={"stock3"}/>
            </div>
        );
    }

}


