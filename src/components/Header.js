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


    render() {
        
        return (
                   <header>
      <div class="logo"><img src={"logo.png"} alt="Spotit"/></div>
      {/* <input placeholder="Search..." className="input-style" type="textbox"></input> */}
      <nav>
          <ul>
              <li><a href="#home">home</a></li>
              <li><a href="#forum">forum</a></li>
              <li><a href="#about">about</a></li>
          </ul>
      </nav>
      <div class="profile-logo"><a href="#profile">PROFILE</a></div>
   </header>
        );
    } // render
} // Header Component
export default Header