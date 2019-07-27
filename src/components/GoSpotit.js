
import React, { Component } from "react"
import Popup from 'reactjs-popup'
import { SSL_OP_NO_TLSv1 } from "constants";
import FlightInfo from "./FlightInfo";


class GoSpotit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // state

    this.createListItems = this.createListItems.bind(this);    

    } // c'tor

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
            return (
                <Popup trigger={<h1 className="button title clickable-title"> Go Spotit! </h1>} modal>
                  {close => (
                    <div className="modal">
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <div className="header"> Modal Title </div>
                      <div className="content">
                          <ul style={{overflow:"auto"}}>
                              {this.createListItems().map(flightInfoObject => 
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


        return (
            <div className="go-spotit box">
                {this.PopupExample()}
                 <div className='scroll-container'>
                    <ul className='scorll-ul'>
                      {this.createListItems().map((flightInfoObject, index) =>
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
        );
    }


} // GoSpotit Component





export default GoSpotit



