import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';

import Main from "./Main";
import Register from "./Register"
class Container extends Component {

    constructor(props) {
      super(props);

      this.state = {
          isLoggedIn: false,
          screenToRender: "Register",
          loggedInUser:{}
      }

      this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.switchScreen = this.switchScreen.bind(this);
    }

    componentDidMount() {
      console.log(`---- in Contariner component DID mount ----`)
    }
    componentWillUnmount() {
      console.log(`---- in Contariner component WILL UNmount ----`)
    }

    handleLogout() {
      this.setState({
        isLoggedIn: false,
        screenToRender: "Register"
      });
      console.log(`in Container\'s handle Logout!, screenToRender is ${this.state.screenToRender}`)
    }
    

    handleSuccessfulLogin(userToLogin) {

      

      this.setState({
        isLoggedIn: true,
        screenToRender: "Main",
        loggedInUser: userToLogin,
      });

      console.log("in handleSuccessfulLogin!");
    }

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
        console.log(`in Container render. screenToRender is ${this.state.screenToRender}`)

        switch(this.state.screenToRender) {
          case "Main":
            return <Main />; 
          case "Register":
            return <Register handleSuccessfulLogin={this.handleSuccessfulLogin} />;
          default:
            return <div>{this.state.screenToRender}  is not a screen in the application.</div>;
        }
      }
  
}
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