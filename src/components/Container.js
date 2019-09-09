import React, { Component } from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import Main from "./Main";
import Register from "./Register"
import ImageForm from "./ImageForm"
import PlaneReportForm from "./PlaneReportForm";
import Profile from "./Profile"
import Airport from "./Airport"
import LandingPage from "./LandingPage"

//let Router = BrowserRouter;

class Container extends Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoggedIn: false,
          screenToRender: null,
          loggedInUser:null,
          allFollowingImages:null,
          formData: null,
          flightInfo: null,
          displayUser: false,
          generalImages: null,
          desiredUserProfile: null, // Will contain the user we want to view it's profile.
          desiredAirport: ''
      }

      this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
      // this.handleLogout = this.handleLogout.bind(this);
      this.extractAllImagesOfFollowings = this.extractAllImagesOfFollowings.bind(this);
      this.extratAllFollowing = this.extratAllFollowing.bind(this)
      this.setDesiredUser = this.setDesiredUser.bind(this)
      this.postLogin = this.postLogin.bind(this)
      // this.renderContainer = this.renderContainer.bind(this);
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

    componentWillReceiveProps() {
      console.log(`---- in Contariner componentWillReceiveProps ----`)
    }
    
    componentDidMount() {
      console.log(`---- in Contariner component DID mount ----`)
      fetch('/home', {method: "GET", credentials: "include"})
      .then(response => response.json())
      .then(obj => {
        if(obj.notLoggedInMessage) {
        } else {
          this.handleSuccessfulLogin(obj);
        }
      })
      .catch(err => console.log(err));

      
      fetch(`/data/flights`, {method: 'GET', credentials: 'include'})
      .then(response => {
          return response.json()
      })
      .then(res => {
          console.log(`in Container:this.componentDidMount, res is:`);
          console.log(res);
          this.setState({flightInfo: res})
      })
      .catch(errMsg => {console.log("in Container:this.componentDidMount in catch err is");console.log(errMsg);})

      fetch(`/image/recentImages`, {method: 'GET', credentials: 'include'})
      .then(response => {
          return response.json()
      })
      .then(res => {
          if(res.errMsg) {
              alert("Ohh, something went wrong. Please try refresh the page.")
          } else {
              console.log(`Container.js: componentDidMount: inside second then: res is: `);
              console.log(res);
              this.setState({generalImages: res})
          }
      })
      .catch(errMsg => {console.log(errMsg);})

      this.props.setRefToExtractAllFollowings(this.extratAllFollowing)

    } // componentDidMount

    // handleLogout() {
    //   this.setState({
    //     isLoggedIn: false,
    //     screenToRender: "Register"
    //   });
    //   console.log(`in Container\'s handle Logout!, screenToRender is ${this.state.screenToRender}`)
    // }

    extractAllImagesOfFollowings(allFollowing) { 
      console.log("in extractAllImagesOfFollowings")

      if(allFollowing.length === 0) {
        // loggedInUser does not follow anyone
        this.setState({allFollowingImages:[]})
        return;
      }
    
      let allFollowingImages = []

      let realAmountOfAllImages = 0

      console.log(`allFollowing is`)
      console.log(allFollowing)
      
      allFollowing.forEach(followerObj => {
        console.log(`followerObj is`)
        console.log(followerObj)
        if(followerObj)
          realAmountOfAllImages += followerObj.images.length
      })

      allFollowing.forEach(followerObj => {
        fetch(`/user/getImages?userName=${followerObj.userName}`, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(allImagesOfSpecificUser => {

          // allImagesOfSpecificUser.forEach(img => {img.userName = followerObj.userName}); // so the client will have the userName in order to click on the name and to move to the userName profile page

          allFollowingImages = allFollowingImages.concat(allImagesOfSpecificUser);
          if(allFollowingImages.length === realAmountOfAllImages) {
            this.setState({allFollowingImages})
          } // if
        }); // last then
    });// End of forEach
   } // extractAllImagesOfFollowings

   realLogicOfExtractAllFollowings(loggedInUser) {
    if(!loggedInUser) {
      console.log(`loggedInUser is null`)
    } else {
      console.log(`loggedInUser is`)
      console.log(loggedInUser)
      console.log(loggedInUser.following)

      if(loggedInUser.following.length === 0) {
        this.setState({allFollowingImages:[]})
        return;
      }

      const allFollowing = [];

      loggedInUser.following.forEach(followerUserName => {
        fetch(`/user/getUser?userName=${followerUserName}`, {method:'GET', credentials:'include'})
        .then(response => response.json())
        .then(followerObj => {
          allFollowing.push(followerObj);
          if(allFollowing.length === loggedInUser.following.length) {
            this.extractAllImagesOfFollowings(allFollowing)
          }
        })
      });
    } // else
   } // realLogicOfExtractAllFollowings

    extratAllFollowing(shouldFetchLoggedInUserFromDb) {
      console.log("in extratAllFollowing")

      // alert: loggedInUser might change in .then!
      let loggedInUser = this.state.loggedInUser;

      if(shouldFetchLoggedInUserFromDb) {
        const fetchString = '/user/getUser?userName=' + this.state.loggedInUser.userName;
        console.log("shouldFetchLoggedInUserFromDb is TRUE", "fetch string is " + fetchString)
        fetch('/user/getUser?userName=' + this.state.loggedInUser.userName, {method:"GET", credentials:"include"})
        .then(res => res.json())
        .then(user => {
          loggedInUser = user;
          console.log("the updated user with alegadlly new following is")
          console.log(loggedInUser)
          this.setState({loggedInUser}, this.realLogicOfExtractAllFollowings(loggedInUser))
        })
      } else {
        this.realLogicOfExtractAllFollowings(loggedInUser)
      }
    } // extratAllFollowing
    
  // renderContainer() {
  //   this.setState(prevState=>{prevState});
  // }

  postLogin() {
    if(this.state.loggedInUser.following.length === 0) {
      console.log("this.state.loggedInUser.following.length === 0")
      this.setState({allFollowingImages:"NO IMAGES!"})

    } else {
      this.extratAllFollowing();
    }
  } // postLogin

    handleSuccessfulLogin(userToLogin) {
      this.props.updateLoggedInUser(userToLogin)
      this.setState({
        isLoggedIn: true,
        // screenToRender: "Main",
        loggedInUser: userToLogin,
      }, this.postLogin);

      //browserHistory.push('/main');
    } // handleSuccessfulLogin

     componentWillReceiveProps(nextProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      if (nextProps.userWantsToLogout) {
        console.log(`USER WANTS TO LOGOUT!!`)
        this.setState({ 
          loggedInUser: null,
          isLoggedIn:false,
         });
      } // if
    } // willRecieveProps
      
    setDesiredUser(desiredUser) {

      console.log("Container.js: sedDesiredUser: desired user is: ");
      console.log(desiredUser);

      this.setState({
        desiredUserProfile: desiredUser
      });
    }

      render() {

        // const path = window.location.pathname;
        // const path = window.location.pathname;
        // return dict[path];

        return (


          <>
            {(this.state.isLoggedIn && this.state.loggedInUser.reportPermission) ? <Link to="/reportSpecials"><div className="side-button">Report Special Arrival/Departure</div></Link> : null}
            {this.state.isLoggedIn ? <Link to="/imageForm"><div className="side-button">Add Image</div></Link> : null}
            
            <Route path="/imageForm" component={() => <ImageForm />} />
            <Route path="/reportSpecials" component={() => <PlaneReportForm />} />
            <Route path="/home" component={() => <Main extratAllFollowing={this.extratAllFollowing} loggedInUser={this.state.loggedInUser} allFollowingImages={this.state.allFollowingImages} setDesiredUser={this.setDesiredUser} flightInfo={this.state.flightInfo}/>} />
            <Route path="/main" component={() => <Main extratAllFollowing={this.extratAllFollowing} loggedInUser={this.state.loggedInUser} allFollowingImages={this.state.allFollowingImages} setDesiredUser={this.setDesiredUser}/>} />
            {<Route exact path="/" component={() => <LandingPage flightInfo={this.state.flightInfo} imagesToDisplay={this.state.generalImages}/>} />}
            <Route path="/register" component={() => <Register handleSuccessfulLogin={this.handleSuccessfulLogin} />} />
            <Route path="/profile/:userName" component={(props) => <Profile {...props} handleFollow={this.props.handleFollow} handleUnfollow={this.props.handleUnfollow} loggedInUser={this.state.loggedInUser} desiredUserProfile={this.state.desiredUserProfile} />} />
            <Route path="/info/:fieldName/:fieldValue" component={props => <Airport  {...props} loggedInUser={this.state.loggedInUser} desiredAirport={this.state.desiredAirport} />} />

            {
              this.state.isLoggedIn ?  
                <Redirect push to="/home">
                  <Route path="/home" component={() => <Main extratAllFollowing={this.extratAllFollowing} loggedInUser={this.state.loggedInUser} allFollowingImages={this.state.allFollowingImages}/>} />
                </Redirect>
              : 
                <Redirect push to="/">
                  <Route path="/" component={() => <LandingPage />} />
                </Redirect>
            }
          </>
        );
      } // render
} // component Container

// export default withRouter(Container);
export default Container;