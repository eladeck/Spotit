import React, { Component } from "react"
import ReactTooltip from 'react-tooltip'
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
            allUsers:null,
            showAllUsers:false,
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleFollow = this.handleFollow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.mouseEnterProfile = this.mouseEnterProfile.bind(this)
        this.handleUsersInputClick = this.handleUsersInputClick.bind(this)
        this.renderAllUsersUnderInput = this.renderAllUsersUnderInput.bind(this)

    } // c'tor

    renderAllUsersUnderInput(e) {
        const divStyle = {
            width: "fit-content",
            height: "fit-content",
            zIndex: "1",
            position: "absolute",
            backgroundColor: "#886c6cde",
            fontFamily: "none",
            borderColor: "goldenrod",
            borderStyle: "solid",
        }

        return (
            <div style={divStyle}>
                {this.state.allUsers.map(user => {
                    console.log(user)
                    return (
                        <>
                        <div key={user.userName} style={{float:"left"}}>
                            <span style={{fontSize:"0.37em"}}>{user.userName}</span>
                            <span onClick={() => this.handleFollow(user.userName)}style={{cursor:"pointer",fontSize:"0.3em", color:"red"}}>follow</span>
                        </div>
                        <br />
                        </>
                    );
                })}
            </div>
        );

    } // renderAllUsersUnderInput

    handleUsersInputClick(e) {
        fetch('user/all', {method:"GET", credentials:"include"})
        .then(res => res.json())
        .then(users => {
            // TODO: error handling
            this.setState(prevState => {
                return {
                    allUsers:users,
                    showAllUsers: !prevState.showAllUsers
                }
            }) //setState
        })// .then
    } // handleUsersInputClick

    mouseEnterProfile(e) {
        // this.setState(  )

    } // mouseEnterProfile

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]:value});
    } // handleChange

    handleFollow(userNameToFollow) {
        this.setState({showAllUsers:false})
        // e.preventDefault();
        fetch(`/user/follow?userNameToFollow=${userNameToFollow}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        .then(_ => alert(`Ok!`))
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))

    } // handleFollow

    handleLogout() {
        this.props.handleLogout();
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
                      <input name='userNameToFollow' type='textbox' onChange={this.handleChange} onClick={this.handleUsersInputClick} autoComplete="off"/>
                      {this.state.showAllUsers ? this.renderAllUsersUnderInput() : null}
                      <button type='submit'>go!</button>
                  </form>
              </li>
              <li><a href="#home">home</a></li>
              <li><a href="#forum">forum</a></li>
              <li><a href="#about">about</a></li>
          </ul>
      </nav>
      {this.props.loggedInUser ?
      <div onMouseEnter={this.mouseEnterProfile} className="profile-logo"><a href="#profile">{this.props.loggedInUser.userName}</a></div> :
      null}
      <p style={{cursor:"pointer",fontSize:"0.35em"}} onClick={this.handleLogout}>log out</p>
      {/* <p data-tip="hello world">Tooltip</p>
      <ReactTooltip/> */}
   </header>
        );
    } // render
} // Header Component
export default Header