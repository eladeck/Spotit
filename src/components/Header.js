import React, { Component } from "react"
// import pilotLogo from "./img/pilot-logo.jpg"
import Container from './Container'
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleLogout = this.handleLogout.bind(this)

    } // c'tor

    handleLogout() {
        console.log('in Header handleLogout')
        let cont = new Container();
        cont.handleLogout();
    }


    render() {
        var titleStyle = {
            display:"inline-block",
            top:"3%",
            position:"sticky",
            marginBottom:"8px",
            marginLeft:"25px",
            color:"#f5fff6",
        };
        var inputStyle = {
            display:"inline-block",
             marginLeft:"15px",
             height:"28px",
             borderRadius:"5px",
            };

            var aboutStyle = {
                display:"inline-block",
                top:"3%",
                position:"sticky",
                marginBottom:"8px",
                marginLeft:"1000px",
                color:"#f5fff6",
                textAlign:"right",
                
            }

            var pilotLogoStyle ={
                maxWidth:"71%",
                maxHeight:"90%",
                borderRadius:"50%",
                display:"inline-block",
                marginLeft:"1444px",
                position:"relative",
                top: "-223px",
            }
            var airplaneLogo ={
                maxWidth:"71%",
                maxHeight:"179%",
                borderRadius:"50%",
                display:"inline-block",
                marginLeft:"700px",
                position:"relative",
                top: "-69px",
            }


        
        return (
            <nav>
                <div style={titleStyle}>Spotit</div>
                <input placeholder="Search..." style={inputStyle} type="textbox"></input>
                {/* <Link to="/register"><div style={registerStyle}>Register</div></Link> */}
                <div style={aboutStyle}>About</div>
                <div onClick={this.handleLogout} style={airplaneLogo}>log out</div>
                <img onClick={() => alert("--you won profile--")} style={airplaneLogo} src={"./img/airplane.png"} alt="not working" />
                <img onClick={() => alert("--you won profile--")} style={pilotLogoStyle} src={"./img/pilot-logo.jpg"} alt="not working" />
            </nav>
        );
    }


} // Header Component
export default Header