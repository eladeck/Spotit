
import React, { Component } from "react"
import Popup from 'reactjs-popup'
import FlightInfo from "./FlightInfo";
import Loader from 'react-loader-spinner'

class GoSpotit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightInfo: null
        } // state

    this.createListItems = this.createListItems.bind(this);    
    //this.fetchFlightInfo = this.fetchFlightInfo.bind(this);
    } // c'tor

    // fetchFlightInfo() {
    //   fetch(`/data/flights`, {method: 'GET', credentials: 'include'})
    //   .then(response => {
    //       return response.json()
    //   })
    //   .then(res => {
    //       console.log(`in GoSpotIt:this.componentDidMount, res is:`);
    //       console.log(res);
    //       return res;
    //   })
    //   .catch(errMsg => {console.log("in GoSpotIt:this.componentDidMount in catch err is");console.log(errMsg); return null;})
    // }

    createListItems() {
        const listLength = 10;
        const items = [];

        for(let i = 0; i < listLength; i++) {
            items.push({
                number: `LY${Math.round(Math.random() * 350)}`,
                origin: `TLV`,
                dest: `CDG`,
                ETD: Math.round(Math.random() * 1000) + 1000,
                planeModel: `Boeing 767`,
                id: i,
            })
        } // for

        return items;
    } // createListItems

    PopupExample() {
      console.log(`GoSpotIt: PopupExample(): flightInfo is `)
      console.log(this.props.flightInfo)
            return (
                <Popup trigger={<h1 className="button title clickable-title"> Go Spotit! </h1>} modal>
                  {close => (
                    <div className="not-hidden-modal">
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <div className="header" style={{color:"pink"}}> What are you waiting for? Go Spotit </div>
                      <div className="content">
                          <ul style={{overflow:"auto"}}>
                              {this.props.flightInfo.map(flightInfoObject => 
                                <FlightInfo 
                                    key={flightInfoObject.id}
                                    number={flightInfoObject.number}
                                    origin={flightInfoObject.origin}
                                    dest={flightInfoObject.dest}
                                    ETD={flightInfoObject.ETD}
                                    planeModel={flightInfoObject.planeModel}
                                />
                                )}
                        </ul>  
           
                      </div>
                      <div className="actions">
                        <Popup
                          trigger={<button className="button"> {this.props.inside} </button>}
                          position="top center"
                          closeOnDocumentClick
                        >
                          <span>

                          </span>
                        </Popup>
                        <button
                          className="button"
                          onClick={() => {
                            console.log('modal closed ')
                            close()
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              )
    } // PopupExample


    render() {
      const flightInfo = this.props.flightInfo;
          return (
            <div className="go-spotit box">
                {this.PopupExample()}
                 <div className='scroll-container'>
                    <ul className='scorll-ul'>
                      {!flightInfo ? <Loader type="TailSpin" color="lightgreen" height={30} width={30} /> : 
                      flightInfo.map((flightInfoObject, index) =>
                        <li key={index}>
                            <FlightInfo 
                                number={flightInfoObject.number}
                                origin={flightInfoObject.origin}
                                dest={flightInfoObject.dest}
                                ETD={flightInfoObject.ETD}
                                planeModel={flightInfoObject.planeModel}
                            />
                        </li> 

                      )}
                    </ul>  
                </div>
            </div>
                ); // return render
        } // render
} // GoSpotit Component





export default GoSpotit



