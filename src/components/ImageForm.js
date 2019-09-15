import React, {Component} from "react"
import Loader from 'react-loader-spinner'
import {Redirect, Route} from 'react-router-dom'

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
           description: "",
           imageFormData: null,
           uploadedImage: null,
           uploading: false,
           completed:false,
           redirect:false,
        }

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBrowse = this.handleBrowse.bind(this);
        this.dataFormMap = this.dataFormMap.bind(this);
        this.redirectMethod = this.redirectMethod.bind(this);
    }

    redirectMethod() {
        this.setState({redirect:true})
    }

    handleBrowse(e) {
        console.log(e.target)
        console.log(e.target.files)
        const image = e.target.files[0];
        this.setState({uploading:true})

        const formData = {
            airline: this.state.airline,
            airplaneModel: this.state.airplaneModel,
            registration: this.state.registration,
            country: this.state.country,
            airport: this.state.airport,
            image,
            likes:[]
        };

        fetch(`/image/upload`, {
            method:"POST",
            body: JSON.stringify(formData),
            credentials:"include"
         })
         .then(res => {console.log("here");return res.json()})
         .then(realResObj => {
             console.log("realResObj")
             console.log(realResObj)
            //  this.setState({
            //     //  realResObj,
            //      uploading:false,
            //      completed:true,
            //  }, () => setTimeout(this.redirectMethod, 2000))
            this.setState({
                //  realResObj,
                 uploading:false,
                 completed:true,
                 redirect:true
             });
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
        if(!this.state.imageFormData || this.state.uploading) return (
        <div style={{position:"fixed", left:"50%", top:"50%"}}>
           <Loader type="TailSpin" color="lightgreen" height={40} width={40} />
        </div>)

        console.log(`ImageFormData: state.redirect is ${this.state.redirect}`)
        return (
            this.state.completed ? (
                    this.state.redirect ? 
                    <Redirect push to="/home">
                        <Route path="/home" component={() => <Main extratAllFollowing={this.extratAllFollowing} loggedInUser={this.state.loggedInUser} allFollowingImages={this.state.allFollowingImages}/>} />
                   </Redirect> 
                   :
                 <div style={{position:"fixed", left:"50%", top:"50%"}}>
                     Image succusfully uploaded!
                 </div>) 
               : 
               <main>
                   
                    <div className="image-form-box">
                        <form className="image-form-left" action="image/upload" method="post" encType="multipart/form-data" /*onSubmit={this.handleSubmit}*/>
                        <h1 className="image-form-h1">Add New Image</h1>
                        <select className="image-form-select-box" value={this.state.airline} name="airline" onChange={this.handleChange}>
                            <option value="">Choose Airline</option>
                            {this.dataFormMap(this.state.imageFormData.airlines)}
                        </select>

                        <select className="image-form-select-box" value={this.state.airplaneModel} name="airplaneModel" onChange={this.handleChange}>
                            <option value="">Choose Airplane Model</option>
                            {this.dataFormMap(this.state.imageFormData.aircrafts)}
                        </select>

                        <select className="image-form-select-box" value={this.state.country} name="country" onChange={this.handleChange}>
                            <option value="">Country</option>
                            {this.dataFormMap(this.state.imageFormData.countries)}
                        </select>

                        <select className="image-form-select-box" value={this.state.city} name="city" onChange={this.handleChange}>
                            <option value="">City</option>
                            {this.dataFormMap(this.state.imageFormData.cities)}
                        </select>

                        <select className="image-form-select-box" value={this.state.airport} name="airport" onChange={this.handleChange}>
                            <option value="">Airport</option>
                            {this.dataFormMap(this.state.imageFormData.airports)}
                        </select>
                        <input className="image-form-input-text" type="text" name="registration"  value={this.state.registration}  onChange={this.handleChange}  placeholder="Registration"  />
                        <input class="image-form-description" name="description" value={this.state.description} placeholder="Description"  onChange={this.handleChange}/>
                        {/* <button onClick={this.handleBrowse}>Browse</button> */}
                        <input type="file" name="image" /*onChange={this.handleBrowse}*/ />
                        <button type="submit" class="form-submit-button">Submit</button>
                    </form>

                <div className="image-form-right">
                    <img className="image-form-right-image"src="/imageFormPicture.jpg" />
                </div>
                </div>

              {/*<hr />
               <h2>Entered information:</h2>
               <p>Airline: {this.state.airline}</p>
               <p>Airplane Model: {this.state.airplaneModel}</p>
               <p>Country: {this.state.country}</p>
               <p>City: {this.state.city}</p>
               <p>Airport:{this.state.airport}</p>
              <p>registration:{this.state.registration}</p> */}
           </main>
        ) // End of return
    }
}

export default ImageForm
