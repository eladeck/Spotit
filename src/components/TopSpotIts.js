import React, { Component } from "react"


class TopSpotIts extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    } // c'tor


    render() {
        return (
            <div className="top-spotits">
                <h1 className="clickable-title title">Top Spotits</h1>
                 <ul>
                    <li>
                        <div className='top-spotit-user'>
                            <img style={{maxWidth:"12%"}} src={'./img/camera-logo.png'}></img>
                            Elad Eckstein (Top-Hit)
                        </div>
                    </li>
                    <li>
                        <div className='top-spotit-user'>
                            <img style={{maxWidth:"12%"}} src={'./img/camera-logo.png'}></img>
                            Dor Ben Lulu (Top-Hit)
                        </div>
                    </li>
                </ul>  
            </div>
        );
    }


} // TopSpotIts Component





export default TopSpotIts