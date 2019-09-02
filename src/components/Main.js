import React, { Component } from "react";
import styled from "styled-components";
import TopSpotIts from "./TopSpotIts"
import Feed from "./Feed"
import GoSpotit from "./GoSpotit"
import "./theme.css"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refToSpotitsfetchAllUsers:null,

    }

    this.setRefTofetchAllUsers = this.setRefTofetchAllUsers.bind(this)

  } // c'tor

  // methods...
  setRefTofetchAllUsers(theMethod) {
    this.setState({refToSpotitsfetchAllUsers:theMethod})
  }

  render() {
    console.log("in main render")
    console.log("about to renderTopSpotit, typeof setRefTofetchAllUsers is", typeof this.setRefTofetchAllUsers, this.setRefTofetchAllUsers)


    return (
      <>
        <div className='container'>
            <TopSpotIts 
              setRefTofetchAllUsers={this.setRefTofetchAllUsers}
            />
            <Feed
                loggedInUser={this.props.loggedInUser}
                allFollowingImages={this.props.allFollowingImages}
                setDesiredUser={this.props.setDesiredUser}
                extratAllFollowing={this.props.extratAllFollowing}
                spotitsfetchAllUsers={this.state.refToSpotitsfetchAllUsers}
            />
            <GoSpotit 
              flightInfo={this.props.flightInfo}
            />
        </div>
      </>
    ) // return render
  } // render
} // Main Component

// const Wrapper = styled.div`
//     /* omitted */
// `;

export default Main;