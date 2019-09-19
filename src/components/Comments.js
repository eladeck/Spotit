import React from "react";
import { BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputComment: "",
      isSending: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;

    var today2 = new Date();
    var h = today2.getHours();
    var m = today2.getMinutes();
    var s = today2.getSeconds();
    // add a zero in front of numbers<10
    m = this.checkTime(m);
    s = this.checkTime(s);
    return today + "-" + h + ":" + m;
  }

  checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    this.setState({ [name]: value });
    console.log();
  }

  handleNewComment() {
    this.setState({ isSending: true, inputComment: "Thanks..." });
    console.log(
      "in handleNewComment, input text is " + this.state.inputComment
    );

    let userName = this.props.loggedInUser.userName;
    let text = this.state.inputComment;
    let date = this.getDate();

    let comment = {
      userName,
      text,
      date
    };

    fetch(`/image/newComment?id=${this.props.imageId}`, {
      method: "POST",
      body: JSON.stringify(comment),
      credentials: "include"
    })
      .then(res => {
        setTimeout(() => {
          this.props.comments.unshift(comment);
          this.setState(
            {
              isSending: false,
              inputComment: ""
            } /*, () => window.location.href="/"*/
          );
        }, 500);
      })
      .catch(error =>
        this.setState({ inputComment: "Error! try refresh the page " + error })
      );
  }

  render() {
    return (
      <div className="comment_block">
        <div className="create_new_comment"></div>
        <div className="input_comment">
          <input
            name="inputComment"
            value={this.state.inputComment}
            onChange={this.handleChange}
            type="text"
            placeholder="Share your thoughts..."
          />
          {this.state.isSending ? (<i class="fas fa-spinner fa-pulse send-comment"></i>) 
          : 
          (
            <i
              onClick={this.handleNewComment}
              class="fa fa-paper-plane send-comment"
              aria-hidden="true"
            ></i>
          )}
        </div>
        {this.props.comments &&
          this.props.comments.map((comment, i) => (
            <div key={i} className="new_comment">
              <ul className="user_comment">
                <div className="user_avatar">
                  <img src={`${this.props.loggedInUser.profilePictureUrl}`}/>
                </div>
                <div className="comment_body">
                  <p>{comment.text}</p>
                </div>
                <div className="comment_toolbar">
                  <div className="comment_details">
                    <ul>
                      <li>
                        <i className="fa fa-clock-o"></i>
                        {comment.date.split("-")[1] /*08.09.2019-2304*/}
                      </li>
                      <li>
                        <i className="fa fa-calendar"></i>
                        {comment.date.split("-")[0]}
                      </li>
                      <Link to={`/profile/${comment.userName}`}>
                        <li>
                          <i className="fa fa-pencil"></i>
                          <span className="user">{comment.userName}</span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div className="comment_tools">
                    <ul>
                      <li>
                        <i className="fa fa-share-alt"></i>
                      </li>
                      <li>
                        <i className="fa fa-reply"></i>
                      </li>
                      <li>
                        <i className="fa fa-heart love"></i>
                      </li>
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

export default Comments;
