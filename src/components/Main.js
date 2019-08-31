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

    }

  } // c'tor

  // methods...

  render() {

    return (
      <>
        <div className='container'>
            <TopSpotIts />    
            <Feed
                loggedInUser={this.props.loggedInUser}
                allFollowingImages={this.props.allFollowingImages}
                setDesiredUser={this.props.setDesiredUser}
                extratAllFollowing={this.props.extratAllFollowing}
            />
            <GoSpotit flightInfo={this.props.flightInfo}/>
        </div>
      </>
    ) // return render
  } // render
} // Main Component

// const Wrapper = styled.div`
//     /* omitted */
// `;

export default Main;