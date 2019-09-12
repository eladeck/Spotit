import React, {Component} from "react"

class PlaneReportForm extends Component {
    constructor() {
        super()
        this.state = {
            sourceAirport: "",
            destinationAirport: "",
            airline: "",
            aircraft: "",
            estimatedTimeArriaval: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(`in handle submit`)

        const specialArrivalReport = {
            sourceAirport: this.state.sourceAirport,
            destinationAirport: this.state.destinationAirport,
            airline: this.state.airline,
            aircraft: this.state.aircraft,
            estimatedTimeArriaval: this.state.estimatedTimeArriaval
        };

        console.log('gonna post this:----------------')
        console.log(specialArrivalReport)

        fetch(`/user/specialReport`, {
            method:"POST",
            body: JSON.stringify(specialArrivalReport),
            credentials:"include"
         })
         .then(res => {window.location.href="/"; res.json()})
         .then(uploadedImage => {
            console.log("In PlaneReportForm:: handleSubmit:: inside second then. The response is:");
            console.log(uploadedImage);
         }).catch(error => {
            console.log("In PlaneReportForm:: handleSubmit:: inside catch. The error is:");
            console.log(error);
         })

    } // handleSubmit
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value});
    } // handleChange

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

    // This method is a general map method.
    // It recieves the array of information amd returns and array of option tags.
    dataFormMap(collectionArray) {
        return collectionArray.map(el => <option key={el._id}>{el.name}</option>)
    }
    render() {
        console.log(`in imageForm render`)
        window.state = this.state;
        const date = new Date();
        return (
           !this.state.imageFormData ? <div>Loading...</div> : 
           <main>
                <form action="user/specialReport" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <select value={this.state.sourceAirport} name="sourceAirport" onChange={this.handleChange}>
                        <option value="">-Choose Source Airport-</option>
                        {this.dataFormMap(this.state.imageFormData.airports)}
                    </select>

                    <select value={this.state.destinationAirport} name="destinationAirport" onChange={this.handleChange}>
                        <option value="">-Choose Destination Airport-</option>
                        {this.dataFormMap(this.state.imageFormData.airports)}
                    </select>

                    <select value={this.state.airline} name="airline" onChange={this.handleChange}>
                        <option value="">-Choose Airline-</option>
                        {this.dataFormMap(this.state.imageFormData.airlines)}
                    </select>

                    <select value={this.state.aircraft} name="aircraft" onChange={this.handleChange}>
                        <option value="">-Choose Airplane Model-</option>
                        {this.dataFormMap(this.state.imageFormData.aircrafts)}
                    </select>
                    
                    <input type="datetime-local" value={this.state.estimatedTimeArriaval} name="estimatedTimeArriaval" onChange={this.handleChange} />
                    <button type="submit">Report</button>
                </form>
                <hr />
                <h2>Entered information:</h2>
                <p>Source Airport: {this.state.sourceAirport}</p>
                <p>Destination Airport: {this.state.destinationAirport}</p>
                <p>Airline: {this.state.airline}</p>
                <p>Airplane Model: {this.state.aircraft}</p>
                <p>Date:{this.state.estimatedTimeArriaval}</p>
            </main>
        ) // End of return
       
    }
}

export default PlaneReportForm
