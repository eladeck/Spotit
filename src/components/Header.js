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
            userNameToFollow:null,
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleFollow = this.handleFollow.bind(this)
        this.handleChange = this.handleChange.bind(this)

    } // c'tor

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]:value});
    } // handleChange

    handleFollow(e) {
        e.preventDefault();
        console.log(`in handleFollowm userNameToFollow is ${this.state.userNameToFollow}`);

        fetch(`/user/follow?userNameToFollow=${this.state.userNameToFollow}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))




    } // handleFollow

    handleLogout() {
        console.log('in Header handleLogout')
        let cont = new Container();
        cont.handleLogout();
    }


    render() {
        
        return (
                   <header>
      <div className="logo"><img src={"logo.png"} alt="Spotit"/></div>
      {/* <input placeholder="Search..." className="input-style" type="textbox"></input> */}
      <nav>
          <ul>
              <li><a>follow:</a></li>
              <li>
                  <form onSubmit={this.handleFollow}>
                      <input name='userNameToFollow' type='textbox' onChange={this.handleChange}/>
                      <button type='submit'>go!</button>
                  </form>
              </li>
              <li><a href="#home">home</a></li>
              <li><a href="#forum">forum</a></li>
              <li><a href="#about">about</a></li>
          </ul>
      </nav>
      <div className="profile-logo"><a href="#profile">PROFILE</a></div>
   </header>
        );
    } // render
} // Header Component
export default Header