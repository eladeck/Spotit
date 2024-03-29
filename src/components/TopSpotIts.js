import React, { Component } from "react"
import Loader from 'react-loader-spinner'

class TopSpotIts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allUsers:null,
            loading:false,
        }

        this.calcRank = this.calcRank.bind(this)
        this.fetchAllUsers = this.fetchAllUsers.bind(this)

    } // c'tor

    fetchAllUsers() {
        this.setState({loading:true})
        fetch("/user/all", {method:"GET", credentials:"include"})
        .then(res => res.json())
        .then(allUsers => this.setState({allUsers, loading:false}))
    } // fetchAllUsers

    componentDidMount() {
        this.fetchAllUsers();
        this.props.setRefTofetchAllUsers(this.fetchAllUsers)
    } // componentDidMount

    calcRank(score) {
        let ret = '';
        if(score < 2) {
            ret = 'Catcher'
        } else if(score >= 2 && score < 5) {
            ret = 'Spot Hit'
        } else {
            ret = 'Master'
        }

        return ret;
    }


    render() {
        return (
            <div className="top-spotits">
                <h1 className="clickable-title title">Top Spotits</h1>
                 <ul>
                     {(!this.state.allUsers || this.state.loading) ? <Loader type="TailSpin" color="lightblue" height={40} width={40} /> :
                     this.state.allUsers
                     .sort((userA, userB) => (userA.score < userB.score) ? 1 : ((userB.score < userA.score) ? -1 : 0))
                     .map((user, index) => 
                        <li key={index}>
                           <div className='top-spotit-user'>
                             <img style={{maxWidth:"12%", position:"relative", left:"-15px"}} src={'./img/camera-logo.png'}></img>
                             {`(${user.score}) ${user.firstName} ${user.lastName} (${this.calcRank(user.score)})`}
                           </div>
                       </li> 
                     )}
                </ul>  
            </div>
        );
    }


} // TopSpotIts Component

export default TopSpotIts