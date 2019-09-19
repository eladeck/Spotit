import React from 'react'
import Popup from 'reactjs-popup'
import { BrowserRouter as Router, Route, Redirect, Link, WithRouter} from 'react-router-dom';

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
                      {props.users.map(user => 
                      <>
                      {console.log(user.profilePictureUrl)}
                        
                        <li onClick={() => close()}><Link to={`/profile/${user.userName}`}><img src={user.profilePictureUrl} className="popup-username-image" />{user.userName}</Link></li>
                      </>
                        )}
                </ul>  
   
              </div>
              <div className="actions">
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