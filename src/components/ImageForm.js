import React, {Component} from "react"

class Register extends Component {
    constructor() {
        super()
        this.state = {
           airline: "",
           airplaneModel: "",
           registration: "",
           country: "",
           airport: "",
           date: ""
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


    render() {
        window.state = this.state


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

                <form onSubmit={this.handleLogin}>
                    <input  name="regUserName"  value={this.state.registeredUser.userName} onChange={this.handleChange}  placeholder="Username"  />
                    <br />
                    <input type="password" name="regPassword"  value={this.state.registeredUser.password} onChange={this.handleChange}  placeholder="Password" />
                    <br />
                    <div style={{color:"red"}}>{this.state.errMsg}</div>
                    <button type="submit">Log In</button>
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
