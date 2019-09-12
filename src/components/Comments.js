import React from "react"
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputComment:"",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState({[name]: value})
    }

    handleNewComment() {
        console.log("in handleNewComment, input text is " + this.state.inputComment)
        fetch(`/image/newComment?id=${this.props.imageId}`, {
            method:"POST",
            body: this.state.inputComment,
            credentials:"include"
         })
         .then(res =>{console.log('here'); <Redirect push to="/" />})
         .catch(error => {});
    }

    render() {
        if(!this.props.comments) {
            return <div>no comments</div>;
        }

        return (
            <div className="comment_block">
            <div className="create_new_comment">
            </div>
              <div className="input_comment">
                  <input name="inputComment" onChange={this.handleChange} type="text" placeholder="Share your thoughts..." />
                  <i onClick={this.handleNewComment} class="fa fa-paper-plane send-comment" aria-hidden="true"></i>
              </div>
              {this.props.comments.map((comment, i) => (
                          <div key={i} className="new_comment">
                          <ul className="user_comment">
                              <div className="user_avatar">
                                  {/* <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg"></img> */}
                                  <img src={`${comment.userName}/profilePicture.jpg`}></img>
                              </div>
                              <div className="comment_body">
                                  <p>{comment.text}</p>
                              </div>
                              <div className="comment_toolbar">
                                  <div className="comment_details">
                                      <ul>
                                          <li><i className="fa fa-clock-o"></i>{comment.date.split('-')[1] /*08.09.2019-2304*/}</li>
                                          <li><i className="fa fa-calendar"></i>{comment.date.split('-')[0]}</li>
                                          <li><i className="fa fa-pencil"></i> <span className="user">{comment.userName}</span></li>
                                      </ul>
                                  </div>
                       <div className="comment_tools">
                                      <ul>
                                          <li><i className="fa fa-share-alt"></i></li>
                                          <li><i className="fa fa-reply"></i></li>
                                          <li><i className="fa fa-heart love"></i></li>
                                      </ul>
                                  </div>
                              </div>
                          </ul>
                      </div> 
              ))}
        </div>
        ); // render return
    } // render
} // Comments class

export default Comments