import React, {Component} from "react"

class Register extends Login {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            password2: "",
            gender: "",
            destination: "",
            isVegan: false,
            isKosher: false,
            isLactoseFree: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? 
            this.setState({
                [name]: checked
            })
        :
        this.setState({
            [name]: value
        }) 
    }
    
    render() {
        
        let years = [];

        for ( let i = 1920 ; i < 2019 ; i++) {
            years.push(i);
        }

        return (
            <main>
                <form action="users/register">
                    <input  name="firstName"  value={this.state.firstName}  onChange={this.handleChange}  placeholder="First Name"  />
                    <br />
                    
                    <input  name="lastName"  value={this.state.lastName} onChange={this.handleChange}  placeholder="Last Name"  />
                    <br />
                    
                    <input type="password" name="password"  value={this.state.password} onChange={this.handleChange}  placeholder="Password" />
                    <br />

                    <input type="password" name="password2"  value={this.state.password2} onChange={this.handleChange}  placeholder="Confirm password" />
                    <br />
                    
                    <label>
                        <input type="radio" name="gender"value="male"checked={this.state.gender === "male"}onChange={this.handleChange}/> Male
                    </label>
                    
                    <br />
                    
                    <label>
                        <input type="radio" name="gender" value="female" checked={this.state.gender === "female"} onChange={this.handleChange} /> Female
                    </label>
                    
                    <br />
                    
                    <select value={this.state.destination} name="destination" onChange={this.handleChange}>
                        <option value="">-- Year --</option>
                        
                        {years.map(el => {
                            return ( 
                                <option value={el}>{el}</option>
                            );
                        })}

                    </select>
                    
                    <br />
                    
                    <label>
                        <input type="checkbox" name="isVegan" onChange={this.handleChange} checked={this.state.isVegan}/> Vegan?
                    </label>
                    <br />
                    
                    <label>
                        <input type="checkbox" name="isKosher" onChange={this.handleChange} checked={this.state.isKosher}/> Kosher?
                    </label>
                    <br />
                    
                    <label>
                        <input type="checkbox" name="isLactoseFree" onChange={this.handleChange} checked={this.state.isLactoseFree}/> Lactose Free?
                    </label>
                    <br />
                    
                    <button>Submit</button>
                </form>
                <hr />
                <h2>Entered information:</h2>
                <p>Your name: {this.state.firstName} {this.state.lastName}</p>
                <p>Your age: {this.state.age}</p>
                <p>Your gender: {this.state.gender}</p>
                <p>Your destination: {this.state.destination}</p>

                
            </main>
        )
    }
}

export default Login
