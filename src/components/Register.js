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
            console.log(newUser);
            
            this.props.handleSuccessfulLogin(newUser)
        })
        .catch(err => {
            alert('something is missing in adding new user')
            console.log("in catch:" + err);
        });
        return false;
    }

    handleLogin() {
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
        
        // let years = [], days = [], months  = [] ;

        // for ( let i = 1920 ; i <= 2019 ; i++) {
        //     years.push(i);
        // }

        // for ( let i = 1 ; i <= 12 ; i++) {
        //     months.push(i);
        // }

        // for ( let i = 1 ; i <= 31 ; i++) {
        //     days.push(i);
        // }

        return (
            <main>
                <form action="users/register" onSubmit={this.handleRegister}>
                    <input  name="firstName"  value={this.state.newUser.firstName}  onChange={this.handleChange}  placeholder="First Name"  />
                    <br />
                    
                    <input  name="lastName"  value={this.state.newUser.lastName} onChange={this.handleChange}  placeholder="Last Name"  />
                    <br />

                    <input  name="email"  value={this.state.newUser.email} onChange={this.handleChange}  placeholder="Email"  />
                    <br />

                    <input  name="userName"  value={this.state.newUser.userName} onChange={this.handleChange}  placeholder="Username"  />
                    <br />
                    
                    <input type="password" name="password"  value={this.state.newUser.password} onChange={this.handleChange}  placeholder="Password" />
                    <br />

                    <input type="password" name="password2"  value={this.state.newUser.password2} onChange={this.handleChange}  placeholder="Confirm password" />
                    <br />
                    
                    <label>
                        <input type="radio" name="gender"value="male"checked={this.state.gender === "male"}onChange={this.handleChange}/> Male
                    </label>
                    
                    <br />
                    
                    <label>
                        <input type="radio" name="gender" value="female" checked={this.state.gender === "female"} onChange={this.handleChange} /> Female
                    </label>
                    
                    <br />
                    
                    {/* <select value={this.state.newUser.yearOfBirth} name="yearOfBirth" onChange={this.handleChange}>
                        <option value="">-- Year --</option>
                        
                        {years.map(el => {
                            return ( 
                                <option key={el} value={el}>{el}</option>
                            );
                        })}
                    </select>
                    <select value={this.state.newUser.monthOfBirth} name="monthOfBirth" onChange={this.handleChange}>
                        <option value="">-- Month --</option>
                        {months.map(el => {
                            return ( 
                                <option key={el} value={el}>{el}</option>
                            );
                        })}
                    </select>
                    <select value={this.state.newUser.dayOfBirth} name="dayOfBirth" onChange={this.handleChange}>
                        <option value="">-- Day --</option>
                        {days.map(el => {
                            return ( 
                                <option key={el} value={el}>{el}</option>
                            );
                        })}

                    </select> */}
                    
                    <br />
                    
                    <button type="button" onClick={this.handleRegister}>Register</button>
                </form>
                <hr />

                <form>
                    <input  name="regUserName"  value={this.state.registeredUser.userName} onChange={this.handleChange}  placeholder="Username"  />
                    <br />
                    <input type="password" name="regPassword"  value={this.state.registeredUser.password} onChange={this.handleChange}  placeholder="Password" />
                    <br />
                    <div style={{color:"red"}}>{this.state.errMsg}</div>
                    <button type="button" onClick={this.handleLogin}>Log In</button>
                </form>
                <hr />
                <h2>Entered information:</h2>
                <p>Your name: {this.state.newUser.firstName} {this.state.newUser.lastName}</p>
                <p>Your User Name: {this.state.newUser.userName}</p>
                <p>Your age: {this.state.newUser.age}</p>
                <p>Your gender: {this.state.newUser.gender}</p>
                <p>Your destination:{this.state.newUser.dayOfBirth}.{this.state.newUser.monthOfBirth}.{this.state.newUser.yearOfBirth}</p>
                <hr />
                <p>registeredUser name: {this.state.registeredUser.regUserName}</p>
                <p>registeredUser password: {this.state.registeredUser.regPassword}</p>
                

            </main>
        )
    }
}

export default Register
