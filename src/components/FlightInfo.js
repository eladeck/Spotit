
import React, { Component } from "react"


class FlightInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // Feed state

    } // c'tor


    render() {
        // number={flightInfoObject.number}
        // origin={flightInfoObject.origin}
        // dest={flightInfoObject.dest}
        // ETD={flightInfoObject.ETD}
        // planeModel={flightInfoObject.planeModel}
        return (
        <div>
            <h1>{this.props.origin}-{this.props.dest}</h1>
            <h2 className="flight-info-h2">{this.props.number} {this.props.planeModel}</h2>
            <h2 className="flight-info-h2">ETD {this.props.ETD} (Today)</h2>
            <span style={{fontSize: "55px",color:"turquoise"}}>&#9992; &#9992; &#9992;</span>
        </div>
        ); 
    } // render
} // FlightInfo Component

export default FlightInfo



