import React, { Component } from "react"
import ReactTooltip from 'react-tooltip'
// import pilotLogo from "./img/pilot-logo.jpg"
import Container from './Container';
import ImageForm from './ImageForm';
//import {BrowserRouter, Link,Route} from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
//let Router = BrowserRouter;
//let {BrowserRouter, Link,Route} = ReactRouterDOM;
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userNameToFollow:null,
            allUsers:null,
            showAllUsers:false,
            searchWord:"",
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleFollow = this.handleFollow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.mouseEnterProfile = this.mouseEnterProfile.bind(this)
        this.handleUsersInputClick = this.handleUsersInputClick.bind(this)
        this.renderAllUsersUnderInput = this.renderAllUsersUnderInput.bind(this)
        this.handleUrlChanged = this.handleUrlChanged.bind(this);

    } // c'tor

    renderAllUsersUnderInput(e) {
        console.log("in renderallUser")
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
                {this.state.allUsers.filter(user => user.userName.includes(this.state.searchWord)).map(user => {
                    console.log(user)
                    return (
                        <>
                        <div key={user.userName} style={{maxWidth:"130px", width:"130px",float:"left"}}>
                            <span style={{position: "absolute", left:"0px",fontSize:"0.37em"}}>{user.userName}</span>
                            <span onClick={() => this.handleFollow(user.userName)}style={{cursor:"pointer",fontSize:"0.3em", color:"red", right:"0px", position:"absolute"}}>follow</span>
                        </div>
                        <br />
                        </>
                    );
                })}
            </div>
        );

    } // renderAllUsersUnderInput

    handleUsersInputClick(e) {
        if(!this.state.allUsers) {
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
        } else {
            this.setState(prevState => {
                return {
                    showAllUsers: (!prevState.showAllUsers || this.state.searchWord)
                }
            })
        } // else
    } // handleUsersInputClick

    mouseEnterProfile(e) {
        // this.setState(  )

    } // mouseEnterProfile

    handleChange(e) {
        const {name, value} = e.target;
        const showAllUsersBool = value;
        this.setState({searchWord:value, showAllUsers:showAllUsersBool});
    } // handleChange

    handleFollow(userNameToFollow) {
        // e.preventDefault();
        fetch(`/user/follow?userNameToFollow=${userNameToFollow}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        .then(_ => {alert(`Ok!`);  this.setState({showAllUsers:false}); this.props.handleNewFollow()})
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))
    } // handleFollow

    handleLogout() {
        this.props.handleLogout();
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

    handleUrlChanged() {
        this.props.handleUrlChanged();
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
                  <form>
                      <input name='userNameToFollow' type='textbox' onChange={this.handleChange} onClick={this.handleUsersInputClick} autoComplete="off"/>
                      {this.state.showAllUsers ? this.renderAllUsersUnderInput() : null}
                  </form>
              </li>
              
              {this.props.loggedInUser ? <li><Link to="/home">home</Link></li> :
               <li><Link to="/register">Register</Link></li>}
               {/* <li onClick={this.handleUrlChanged}><Link to="/register">Register</Link></li>} */}
              <li><a href="#forum">Forum</a></li>
              <li><a href="#about">About</a></li>
          </ul>
      </nav>
      {this.props.loggedInUser ?
      <div onMouseEnter={this.mouseEnterProfile} className="profile-logo"><a href="#profile">{this.props.loggedInUser.userName}</a></div> : null}
      {this.props.loggedInUser ?
      <p className="logout" onClick={this.handleLogout}>log out</p> : null}
      {/* <p data-tip="hello world">Tooltip</p>
      <ReactTooltip/> */}
   </header>
        );
    } // render
} // Header Component
export default Header