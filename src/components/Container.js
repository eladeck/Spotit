import React, { Component } from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import Main from "./Main";
import Register from "./Register"
import ImageForm from "./ImageForm"
import PlaneReportForm from "./PlaneReportForm";

//let Router = BrowserRouter;

class Container extends Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoggedIn: false,
          screenToRender: null,
          loggedInUser:null,
          allFollowingImages:null,
          formData: null
      }
      this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.switchScreen = this.switchScreen.bind(this);
      this.extractAllImagesOfFollowings = this.extractAllImagesOfFollowings.bind(this);
      this.extratAllFollowing = this.extratAllFollowing.bind(this)
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
    
    componentDidMount() {
      console.log(`---- in Contariner component DID mount ----`)
      fetch('/home', {method: "GET", credentials: "include"})
      .then(response => response.json())
      .then(obj => {
        if(obj.notLoggedInMessage) {
          // this.setState()
          // Render Register.js
          // this.props.router.push('/register')
        } else {
          this.handleSuccessfulLogin(obj);
        }
      })
      .catch(err => console.log(err));
    } // componentDidMount

    handleLogout() {
      this.setState({
        isLoggedIn: false,
        screenToRender: "Register"
      });
      console.log(`in Container\'s handle Logout!, screenToRender is ${this.state.screenToRender}`)
    
    }

   /* extractAllImagesOfFollowings(allFollowing) {

      console.log(`in extract All Images Of following, allFollowing is`)
      console.log(allFollowing)

      const loggedInUser = this.state.loggedInUser
      const allFollowingImages = []

      let realAmountOfAllImages = 0
      allFollowing.forEach(followerObj => realAmountOfAllImages += followerObj.images.length)

      console.log(`real amount of all images is ${realAmountOfAllImages}`)
      

      allFollowing.forEach(followerObj => {

        followerObj.images.forEach(imgId => {

          fetch(`user/getImage?imgId=${imgId}`, {method:'GET', credentials:'include'})
          .then(response => response.json())
          .then(imgObj => {
            allFollowingImages.push(imgObj);
            if(allFollowingImages.length === realAmountOfAllImages) {
              console.log(`allFollowingImages is`)
              console.log(allFollowingImages)
              this.setState({allFollowingImages})
            } // if
          }) // last then
        }); // images forEach
      }); // allFollowing forEach

    } // extractAllImagesOfFollowings
*/

    extractAllImagesOfFollowings(allFollowing) { // MODIFIED "extractAllImagesOfFollowings" method.

      console.log(`in extract All Images Of following, allFollowing is`)
      console.log(allFollowing)

      const loggedInUser = this.state.loggedInUser
      let allFollowingImages = []

      let realAmountOfAllImages = 0
      allFollowing.forEach(followerObj => realAmountOfAllImages += followerObj.images.length)

      console.log(`real amount of all images is ${realAmountOfAllImages}`)
      

      allFollowing.forEach(followerObj => {
        fetch(`user/getImages?userName=${followerObj.userName}`, {method: 'GET', credentials: 'include'})
        .then(response => response.json())
        .then(imgObj => {
          console.log(`imgObj is`);
          console.log(imgObj);
          allFollowingImages = allFollowingImages.concat(imgObj);
          console.log(`allFollowingImages length is ${allFollowingImages.length}.`)
          if(allFollowingImages.length === realAmountOfAllImages) {
            console.log(`allFollowingImages is`)
            console.log(allFollowingImages)
            this.setState({allFollowingImages})
          } // if
        }); // last then
    });// End of forEach
   } // extractAllImagesOfFollowings

    extratAllFollowing() {
      const loggedInUser = this.state.loggedInUser;

      if(!loggedInUser) {
        console.log(`loggedInUser is null`)
      } else {

        const loggedInUser = this.state.loggedInUser;
        console.log(`in extract all following, loggedInUser is:`)
        console.log(loggedInUser)

        const allFollowing = [];

        loggedInUser.following.forEach(followerUserName => {
          fetch(`user/getUser?userName=${followerUserName}`, {method:'GET', credentials:'include'})
          .then(response => response.json())
          .then(followerObj => {
            allFollowing.push(followerObj);
            if(allFollowing.length === loggedInUser.following.length) {
              this.extractAllImagesOfFollowings(allFollowing)
            }
          })
        });
      } // else

    } // extratAllFollowing
    

    handleSuccessfulLogin(userToLogin) {
      this.setState({
        isLoggedIn: true,
        screenToRender: "Main",
        loggedInUser: userToLogin,
      }, this.extratAllFollowing);

      //browserHistory.push('/main');
    } // handleSuccessfulLogin

    switchScreen(nextScreen) {
      this.setState({
        screenToRender: nextScreen
      });
    }
   /* render() {
      return (
        <div>
          <TransitionGroup className="transition-group">
            <CSSTransition
              key={this.props.location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames="fade">
              <section className="route-section">
                <Switch location={this.props.location}>
                    <PropsRoute exact path="/" handleSuccessfulLogin={this.handleSuccessfulLogin} component={this.state.isLoggedIn ? Main : Register} />
                </Switch>
              </section>
            </CSSTransition>
          </TransitionGroup>
        </div>
      );
      }
      */
      

      render() {
        return (
          <Router>
            {
              this.state.isLoggedIn ?  
                <Redirect push to="/main">
                  <Route path="/main" component={() => <Main allFollowingImages={this.state.allFollowingImages}/>} />
                </Redirect>
              : 
                <Redirect push to="/register">
                  <Route path="/register" component={() => <Register handleSuccessfulLogin={this.handleSuccessfulLogin} />} />
                </Redirect>
            }
            {(this.state.isLoggedIn && this.state.loggedInUser.reportPermission) ? <Link to="/ReportSpecials">Report Special Arrival/Departure</Link> : <></>}
            <Link to="/imageForm">Add Picture</Link>
            <Route path="/imageForm" component={() => <ImageForm />} />
            <Route path="/ReportSpecials" component={() => <PlaneReportForm />} />
            <Route path="/main" component={() => <Main allFollowingImages={this.state.allFollowingImages}/>} />
            <Route path="/register" component={() => <Register handleSuccessfulLogin={this.handleSuccessfulLogin} />} />
          </Router>
        );
        // switch(this.state.screenToRender) {
        //   case "Main":
        //     return (
        //       <Main
        //         allFollowingImages={this.state.allFollowingImages}
        //       />
        //     )
        //   case "Register":
        //     return <Register handleSuccessfulLogin={this.handleSuccessfulLogin} />;
        //   case "ImageForm":
        //     return <ImageForm />;
        //   case null:
        //       return  <Loader type="TailSpin" color="green" height={80} width={80} />
        //   default:
        //     return <div>{this.state.screenToRender}  is not a screen in the application.</div>;
        // } // switch-case
      } // render
} // component Container

const Wrapper = styled.div`
    .fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }

    div.transition-group {
      position: relative;
 }
 section.route-section {
   position: absolute;
   width: 100%;
   top: 0;
   left: 0;
 }
`;

// export default withRouter(Container);
export default Container;