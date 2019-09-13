import React from 'react'
import Popup from 'reactjs-popup'

export default function PopupModal(props) {
    console.log(`PopupModal.js: textToDisplay is ${props.textToDisplay}, and users is:`)
    console.log(props.users)
    return (
        <Popup trigger={<h2 className="followers-following"> {props.users.length} {props.textToDisplay} </h2>} modal>
          {close => (
            <div className="not-hidden-modal">
              <a className="close" onClick={close}>
                &times;
              </a>
              
              <div className="content">
                  <ul style={{overflow:"auto"}}>
                      {props.users.map(follower => 
                        <li>{follower}</li>
                        )}
                </ul>  
   
              </div>
              <div className="actions">
                <Popup
                  trigger={<button className="button"> {props.inside} </button>}
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