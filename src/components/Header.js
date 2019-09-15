import React, { Component } from "react"
import ReactTooltip from 'react-tooltip'
// import pilotLogo from "./img/pilot-logo.jpg"
import Container from './Container';
import ImageForm from './ImageForm';
//import {BrowserRouter, Link,Route} from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect, Link, WithRouter} from 'react-router-dom'
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
            searchFor:"users",
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleFollow = this.handleFollow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.mouseEnterProfile = this.mouseEnterProfile.bind(this)
        this.handleUsersInputClick = this.handleUsersInputClick.bind(this)
        this.renderAllUsersUnderInput = this.renderAllUsersUnderInput.bind(this)
        this.handleUrlChanged = this.handleUrlChanged.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

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
                {this.state.allUsers
                .filter(user => user.userName.includes(this.state.searchWord) && user.userName.startsWith(this.state.searchWord))
                .map(user => {
                    console.log(user)
                    return (
                        <>
                        <div key={user.userName} style={{maxWidth:"130px", width:"130px",float:"left"}}>
                        <span style={{position: "absolute", left:"0px",fontSize:"0.37em"}} onClick={() => this.setState({showAllUsers: false})}><Link to={`/profile/${user.userName}`}>{user.userName}</Link></span>
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
            fetch('/user/all', {method:"GET", credentials:"include"})
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

    async handleFollow(userNameToFollow) {
        await this.props.handleFollow(userNameToFollow);
        console.log("in handleFollow, after awaiting props.handleFollow.")
        this.setState({showAllUsers: false})
    } // handleFollow

    handleLogout() {
        this.props.handleLogout();
    }

    renderAllData() {
        const divStyle = {
            width: "160px",
            height: "fit-content",
            maxHeight: "500px",
            overflow: "scroll",
            zIndex: "1",
            position: "absolute",
            backgroundColor: "#ece4e4de",
            fontFamily: "sens-serif",
            borderColor: "black",
            borderStyle: "solid",
        }

        return (
            <div style={divStyle}>
                {this.props.iataCodeData && this.props.iataCodeData[this.state.searchFor]
                .filter(data => data.name.toLowerCase().startsWith(this.state.searchWord))
                .map(data => {
                    console.log(data)
                    return (
                        <>
                        <div key={data.name} style={{maxWidth:"130px", width:"130px",float:"left"}}>
                          <span style={{position: "absolute", left:"0px",fontSize:"0.37em"}} 
                              onClick={() => this.setState({showAllUsers: false})}>
                              <Link to={`/info/${this.state.searchFor}/${data.name}`}>
                               {data.name}
                                </Link>
                            </span>
                        </div>
                        <br />
                        </>
                    );
                })}
            </div>);
    }

    handleSelectChange(e) {
        const searchFor = e.target.value;
        this.setState({searchFor})
    }

    // componentWillUnmount() {
    //     fetch(`/imageFormData`, {method: 'GET', credentials: 'include'})
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(res => {
    //         console.log(`in this.componentDidMount, res is:`);
    //         console.log(res.airlines[0]);
    //         this.setState({formData: res})
    //     })
    //     .catch(errMsg => {console.log(errMsg); this.setState({errMsg})})
    //   } // componentWillUnmount

    handleUrlChanged() {
        this.props.handleUrlChanged();
    }
    render() {
        
        return ( 
                   <header>
      <a href="/" className="logo"><img src={"logo.png"} style={{width:'60px', height: '61px'}} alt="Spotit"/></a>
      {/* <input placeholder="Search..." className="input-style" type="textbox"></input> */}
      <nav>
          <ul>
              <li><a>Search For</a></li>
                <select onChange={this.handleSelectChange}>
                    <option value="users">Users</option>
                    <option value="airports">Airports</option>
                    <option value="aircrafts">Aircrafts</option>
                    <option value="countries">Countries</option>
                    <option value="airlines">Airlines</option>
                </select>
              <li>
                  <form>
                      <input placeholder={this.state.searchFor} name='userNameToFollow' type='textbox' onChange={this.handleChange} onClick={this.handleUsersInputClick} autoComplete="off"/>
                      {this.state.showAllUsers && this.state.searchFor === "users" ? this.renderAllUsersUnderInput() : null}
                      {this.state.showAllUsers && this.state.searchFor !== "users" ? this.renderAllData() : null}
                  </form>
              </li> 
              
              {this.props.loggedInUser ? <li><Link to="/">Home</Link></li> :
               <li><Link to="/register">Login</Link></li>}
               {/* <li onClick={this.handleUrlChanged}><Link to="/register">Register</Link></li>} */}
              <li>
                <a className="tooltip" href="#forum">
                    <div class="tooltip">Forum
                        <span class="tooltiptext">Soon!</span>
                    </div>
                </a>
             </li>
          </ul>
      </nav>
      {this.props.loggedInUser ?
      <div onMouseEnter={this.mouseEnterProfile} className="profile-logo">
          <Link to={`/profile/${this.props.loggedInUser.userName}`}>{this.props.loggedInUser.userName}</Link>
          </div> : null}
      {this.props.loggedInUser ?
      <p className="logout" onClick={this.handleLogout}>log out</p> : null}
      {/* <p data-tip="hello world">Tooltip</p>
      <ReactTooltip/> */}
   </header>
        );
    } // render
} // Header Component
export default Header;
