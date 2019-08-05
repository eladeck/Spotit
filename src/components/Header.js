import React, { Component } from "react"
// import pilotLogo from "./img/pilot-logo.jpg"
import Container from './Container';
import ImageForm from './ImageForm';
import {BrowserRouter, Link,Route} from "react-router-dom";
let Router = BrowserRouter;
//let {BrowserRouter, Link,Route} = ReactRouterDOM;
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

    componentWillUnmount() {
        fetch(`/imageFormData`, {method: 'GET', credentials: 'include'})
        .then(response => {
            return response.json()
        })
        .then(res => {
            console.log(`in this.componentDidMount, res is:`);
            console.log(res.airlines[0]);
            this.setState({formData: res})
        })
        .catch(errMsg => {console.log(errMsg); this.setState({errMsg})})
      } // componentWillUnmount

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

            
            <Router>
                <nav>
                    <div style={titleStyle}>Spotit</div>
                    <input placeholder="Search..." style={inputStyle} type="textbox"></input>
                    {/* <Link to="/register"><div style={registerStyle}>Register</div></Link> */}
                    <div style={aboutStyle}>About</div>
                    <div onClick={this.handleLogout} style={airplaneLogo}>log out</div>
                    <img style={airplaneLogo} src={"./img/airplane.png"} alt="not working" />
                    <img onClick={() => alert("--your won profile--")} style={pilotLogoStyle} src={"./img/pilot-logo.jpg"} alt="not working" />

                    {/* <Route path="/imageForm" component={() => <ImageForm />} /> */}
                </nav>
            </Router>
        );
    }


} // Header Component
export default Header