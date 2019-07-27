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
                allFollowingImages={this.props.allFollowingImages}
            />
            <GoSpotit />
        </div>
      </>
    ) // return render
  } // render
} // Main Component

// const Wrapper = styled.div`
//     /* omitted */
// `;

export default Main;