import React, { Component } from "react"
import Loader from 'react-loader-spinner'
import AirportMaterialUI from './AirportMaterialUI'
import axios from 'axios';

class Airport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:null,
            airportData: ''
            // currentLoggedInUser: this.props.loggedInUser,
            // userProfile: this.props.desiredUserProfile
        }

        
    } // c'tor

    // methods:
    // componentDidMount() {
    //     const fetchString = `/airport/${this.props.match.params.airportName}`
    //     console.log(`in Airport coopmonent did mount, gonna fetch ${fetchString}`)
    //     fetch(fetchString, {method: 'GET', credentials: 'include'})
    //     .then(res => res.json())
    //     .then(realObj => {
    //         console.log(realObj)
    //     })
    // } // componentDidMount



    // componentDidMount() {
    //     if(!this.props.desiredUserProfile) {console.log(`I was render without props user ----`);return;}
    //     console.log(`i was renders WITH props`)
    //     // fetch(`http://localhost:3002/airport/getImages?name=${this.props.airportName}`, {method: 'GET', credentials: 'include'})
    //     fetch(`http://localhost:3002/airport/getImages?name=El Arish International Airport`, {method: 'GET', credentials: 'include'})
    //     .then(response => response.json())
    //     .then(images => {console.log(`!!!!!!!!!!!!!!!!!!`); console.log(images); this.setState({images})});
    // } // didMount

   async componentDidMount() {
        try{
            const result = await axios(`https://cors-anywhere.herokuapp.com/en.wikipedia.org/w/api.php?action=opensearch&search=heathrow`);
            console.log("in Airport.js: componentDidMount():  Wikipedia result is:")
            console.log(result)
            console.log("in Airport.js: componentDidMount():  desired airport is:")
            console.log(this.props.desiredAirport);
            console.log(result.data[2]);
            this.setState({airportData: result.data[2]});
            result.data[2].forEach(el => console.log(el));
        } catch(err) {
            console.log("in Airport.js: componentDidMount(): in catch section. Error is:"); 
            console.log(err) ;
        }

        
        
        // const fetchString = `/airport/${this.props.match.params.airportName}`
        // console.log(`in Airport coopmonent did mount, gonna fetch ${fetchString}`)
        // fetch(`https://cors-anywhere.herokuapp.com/en.wikipedia.org/w/api.php?action=opensearch&search=heathrow`, {method: 'GET', credentials: 'include'})
        // .then(res => res.json())
        // .then(realObj => {
        //     console.log("in Airport.js: componentDidMount(): second then. Wikipedia result is:")
        //     console.log(realObj)
        // }).catch(err => { console.log("in Airport.js: componentDidMount(): in catch section. Error is:"); console.log(err) })
    } // componentDidMount
    render() {

        console.log(`in render of Airport`)

        return (
            // !airportInfo ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :
            <>
            <h1>Airport Page</h1>
                {<AirportMaterialUI
                    airportData={this.state.airportData}
                    loggedInUser={this.props.loggedInUser}
                    images={this.state.images}
                />}
            </>
        );
    } // render
} // class

export default Airport

/*
 import React, { Component } from "react"
import Loader from 'react-loader-spinner'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:null,
        }

        this.handleFollow = this.handleFollow.bind(this);

    } // c'tor

    // methods:
    handleFollow() {
        fetch(`/user/follow?
        loggedInUserName=${this.props.loggedInUser}&
        userNameToFollow=${this.props.userName}`, {method:'POST', credentials:"include"})
        .then(res => res.json())
        // .then(newListOfFollowings => this.setState({newListOfFollowings}))


    } // handleFollow


    componentDidMount() {

        console.log(`in componoetDidMount ofProfile, props are userName and loggedInUser:`)
        console.log(this.props.loggedInUser)
        console.log(this.props.userName)


        fetch(`/user/profile/${this.props.userName}`, {method:'GET', credentials:'include'})
        .then(res => res.json())
        .then(user => {
            if(user.errorMsg) throw user.errorMsg;
            this.setState({user})
        })
    } // didMount

    render() {

        const userName = this.props.userName;
        const loggedInUser = this.props.loggedInUser;

        if(!userName) return <div>no userName to show</div>

        return (
            !this.state.user ? <Loader type="TailSpin" color="blue" height={120} width={120} /> :

            <>
                <div>
                    In profile of:
                    first Name - {this.state.user.firstName}
                    <button onClick={this.handleFollow}>follow</button>

                </div>
            </>
        );
    } // render
} // class

export default Profile
 */