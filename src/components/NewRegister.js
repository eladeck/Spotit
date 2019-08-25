import React, {Component} from "react"
import SignUp from './SignUp'
import SignIn from './SignIn'

class Register extends Component {
    constructor() {
        super()
        this.state = {
           newUser: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            password2: "",
            gender: "",
            // yearOfBirth: "",
            // monthOfBirth: "",
            // dayOfBirth: ""
           },
           registeredUser: {
            regUserName: "",
            regPassword: "",
           },
           errMsg:"",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
         
        this.setState(prevState => {
            
            if(name[0] === 'r' && name[1] === 'e' && name[2] === 'g') {
                return {
    
                    registeredUser: {
                    ...prevState.registeredUser,
                    [name]: value,
                    },
                }
            } else {
                return {
    
                    newUser: {
                    ...prevState.newUser,
                    [name]: value,
                    },
                }
            } // else
        })
    }

    handleRegister() {
        console.log("in handleRegister of Register.js, going in to handleSuccessfulLogin");
        console.log("the user is " + this.state.newUser.firstName);
        // this.props.handleSuccessfulLogin();
        let newUser = this.state.newUser
        let newUserJSON = JSON.stringify(newUser)

        fetch('/user/addNewUser', {method: 'POST', body: newUserJSON, credentials: 'include'})
        .then(response => {            
            if (!response.ok) {                
                throw response;
            } else {
                return response.json()
            }
        })
        .then(newUser => {
            console.log(`server just sent as with:`);


            
            this.props.handleSuccessfulLogin(newUser)
        })
        .catch(err => {
            alert('something is missing in adding new user')
            console.log("in catch:" + err);
        });
        return false;
    }

    handleLogin(e) {
        e.preventDefault(); //  to stop the page trying to load the action url. (and 'refresh' the page)
        
        console.log(this.state.registeredUser.regUserName)
        console.log(this.state.registeredUser.regPassword)

        fetch(`/user/login?userName=${this.state.registeredUser.regUserName}&password=${this.state.registeredUser.regPassword}`, {method: 'GET', credentials: 'include'})
        .then(response => {
            return response.json()
        })
        .then(res => {
            if(res.errMsg) {
                throw res.errMsg
            } else {
                console.log(`all is ok:`);
                console.log(res);
                this.props.handleSuccessfulLogin(res);
            }
        })
        .catch(errMsg => {console.log(errMsg); this.setState({errMsg})})
    } // handleLogin

    render() {
        window.state = this.state

        return (
            <main>
                <SignUp />
                <hr />

                <SignIn />
            </main>
        )
    }
}

export default Register
