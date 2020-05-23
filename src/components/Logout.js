import React from "react";



export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        localStorage.clear()
        window.location.href="/"
    }


    render() {
        return (
            <div>
                <p> You've been logged out. </p>
            </div>
        )
    }



}