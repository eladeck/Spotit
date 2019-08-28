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
           imageFormData: null,
           uploadedImage: null,
           uploading: false,
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBrowse = this.handleBrowse.bind(this);
        this.dataFormMap = this.dataFormMap.bind(this);
    }

    handleBrowse(e) {
        console.log(`in handle browse`)
        const image = e.target.files[0];
        this.setState({uploading:true})

        const formData = {
            airline: this.state.airline,
            airplaneModel: this.state.airplaneModel,
            registration: this.state.registration,
            country: this.state.country,
            airport: this.state.airport,
            image,
            likes:0
        };

        console.log('gonna post this:----------------')
        console.log(formData)

        fetch(`/image/upload`, {
            method:"POST",
            body: JSON.stringify(formData),
            credentials:"include"
         })
         .then(res => res.json())
         .then(realResObj => {
             this.setState({
                //  realResObj,
                 uploading:false
             })
         })
    } // handleBrowse

    handleSubmit(event) {
        event.preventDefault();
    } // handleSubmit
    
    handleChange(event) {
        const {name, value, type, checked} = event.target
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

    dataFormMap(collectionArray) {
        return collectionArray.map(el => <option key={el._id}>{el.name}</option>)
    }

    render() {
        console.log(`in imageForm render`)
        window.state = this.state;

        return (
           !this.state.imageFormData ? <div>Loading...</div> : 
           <main>
                <form action="image/upload" method="post" encType="multipart/form-data" /*onSubmit={this.handleSubmit}*/>
                    <select value={this.state.airline} name="airline" onChange={this.handleChange}>
                        <option value="">-Choose Airline-</option>
                        {this.dataFormMap(this.state.imageFormData.airlines)}
                    </select>

                    <select value={this.state.airplaneModel} name="airplaneModel" onChange={this.handleChange}>
                        <option value="">-Choose Airplane Model-</option>
                        {this.dataFormMap(this.state.imageFormData.aircrafts)}
                    </select>
                    
                    <select value={this.state.country} name="country" onChange={this.handleChange}>
                        <option value="">-Country-</option>
                        {this.dataFormMap(this.state.imageFormData.countries)}
                    </select>

                    <select value={this.state.city} name="city" onChange={this.handleChange}>
                        <option value="">-City-</option>
                        {this.dataFormMap(this.state.imageFormData.cities)}
                    </select>

                    <select value={this.state.airport} name="airport" onChange={this.handleChange}>
                        <option value="">-Airport-</option>
                        {this.dataFormMap(this.state.imageFormData.airports)}
                    </select>
                    <input  name="registration"  value={this.state.registration}  onChange={this.handleChange}  placeholder="Registration"  />

                    {/* <button onClick={this.handleBrowse}>Browse</button> */}
                    <input type="file" name="image" /*onChange={this.handleBrowse}*/ />
                    <button type="submit">Upload</button>
                </form>

                <hr />
                <h2>Entered information:</h2>
                <p>Airline: {this.state.airline}</p>
                <p>Airplane Model: {this.state.airplaneModel}</p>
                <p>Country: {this.state.country}</p>
                <p>City: {this.state.city}</p>
                <p>Airport:{this.state.airport}</p>
                <p>registration:{this.state.registration}</p>
            </main>
        ) // End of return
       
    }
}

export default ImageForm
