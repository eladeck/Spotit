import React, {Component} from "react"

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
           },
           registeredUser: {
            regUserName: "",
            regPassword: "",
           },
           errMsg:"",
           registerErrMsg:"",
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

        if(this.state.newUser.password !== this.state.newUser.password2) {
            this.setState({registerErrMsg:"passwords must match"});
            return;
        }

        for(var propName in this.state.newUser) {
            if(!this.state.newUser[propName]) {
                this.setState({registerErrMsg: propName + " can not be empty"});
                return;
            }
        } // for

        newUser.score = 0;
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
            <div class="sign-in-background-image">
                <img src="/defaultPicturesToBeDisplayed/registrationBackground.jpg"  />
            <div className="login-box">
                <div className="left">
                    <form onSubmit={this.handleRegister}>
                    <h1 className="sign-in-h1">Register</h1>
                    <input type="text" name="firstName"  value={this.state.newUser.firstName}  onChange={this.handleChange}  placeholder="First Name" />
                    <input type="text" name="lastName"  value={this.state.newUser.lastName} onChange={this.handleChange}  placeholder="Last Name"  />
                    <input type="text" name="email"  value={this.state.newUser.email} onChange={this.handleChange}  placeholder="Email"  />
                    <input type="text" name="userName"  value={this.state.newUser.userName} onChange={this.handleChange}  placeholder="Username"  />
                    <input type="password" name="password"  value={this.state.newUser.password} onChange={this.handleChange}  placeholder="Password" />
                    <input type="password" name="password2"  value={this.state.newUser.password2} onChange={this.handleChange}  placeholder="Confirm password" />
                    <div style={{color:"red"}}>{this.state.registerErrMsg}</div>
                    <button type="submit" class="form-submit-button">Register</button>
                    {/*<input type="submit" name="signup_submit"  value="Register" onClick={this.handleRegister} />*/}
                    </form>
                </div>
                <div className="or">OR</div> 
                <div className="right">
                    <h1 className="sign-in-h1">Sign In</h1>
                    <form onSubmit={this.handleLogin}>
                    <input type="text" name="regUserName"  value={this.state.registeredUser.userName} onChange={this.handleChange}  placeholder="Username"  />
                    <input type="password" name="regPassword"  value={this.state.registeredUser.password} onChange={this.handleChange}  placeholder="Password" />
                    <div style={{color:"red"}}>{this.state.errMsg}</div>
                    <button type="submit" class="form-submit-button">Register</button>
                    {/*<input type="submit" name="signup_submit" value="Sign me in" onClick={this.handleLogin} />*/}
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default Register
