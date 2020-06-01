import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";



export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: ""
        }
    }

    componentDidMount() {
        axios.get("https://stock-api.deel-ramverk.me")
        .then(res => {
            console.log(res.data.data.message)
            const intro = res.data.data.message;
            this.setState({ intro })
        })
    }

    render() {
        return (
            <div>
                 <p>{this.state.intro}</p>
            </div>
        )
    }
}
