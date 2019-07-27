import React from "react";
import styled from "styled-components";
import TopSpotIts from "./TopSpotIts"
import Feed from "./Feed"
import GoSpotit from "./GoSpotit"
import "./theme.css"
function Main() {
  return (
    <Wrapper>
        <div className='container'>
            <TopSpotIts />    
            <Feed />
            <GoSpotit />
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    /* omitted */
`;

export default Main;