import React, {Component} from "react"

class ImageForm extends Component {
    constructor() {
        super()
        this.state = {
           airline: "",
           airplaneModel: "",
           registration: "",
           country: "",
           airport: "",
           date: "",
           imageFormData: null
        }

        
        this.handleChange = this.handleChange.bind(this);
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

    componentWillMount() {
        fetch(`/imageFormData`, {method: 'GET', credentials: 'include'})
        .then(response => {
            return response.json()
        })
        .then(res => {
            console.log(`in this.componentDidMount, res is:`);
            console.log(res.airlines[0]);
            this.setState({imageFormData: res})
        })
        .catch(errMsg => {console.log(errMsg); this.setState({errMsg})})
    }

    render() {
        window.state = this.state;

        return (
           !this.state.imageFormData ? <div>Loading...</div> : 
           <main>
                <form action="users/register" onSubmit={this.handleSubmit}>

                    <select value={this.state.airline} name="airline" onChange={this.handleChange}>
                        <option value="">-Choose Airline-</option>
                        {this.state.imageFormData.airlines.map(el => el.name)}
                    </select>

                    <select value={this.state.airplaneModel} name="airplaneModel" onChange={this.handleChange}>
                        <option value="">-Choose Airplane Model-</option>
                        {this.state.imageFormData.aircrafts.map(el => el.name)}
                    </select>
                    
                    <select value={this.state.country} name="country" onChange={this.handleChange}>
                        <option value="">-Country-</option>
                        {this.state.imageFormData.countries.map(el => el.name)}
                    </select>

                    <select value={this.state.city} name="city" onChange={this.handleChange}>
                        <option value="">-City-</option>
                        {this.state.imageFormData.cities.map(el => {console.log(el.name); return el.name})}
                    </select>

                    <select value={this.state.airport} name="airport" onChange={this.handleChange}>
                        <option value="">-Airport-</option>
                        {this.state.imageFormData.airports.map(el => el.name)}
                    </select>
                    <input  name="registration"  value={this.state.registration}  onChange={this.handleChange}  placeholder="Registration"  />

                    <button type="button" onClick={this.handleSubmit}>Upload</button>
                </form>

                <hr />
                <h2>Entered information:</h2>
                <p>Airline: {this.state.airline}</p>
                <p>Airplane Model: {this.state.airplaneModel}</p>
                <p>Country: {this.state.country}</p>
                <p>City: {this.state.city}</p>
                <p>Airport:{this.state.airport}</p>
            </main>
        ) // End of return
       
    }
}

export default ImageForm
