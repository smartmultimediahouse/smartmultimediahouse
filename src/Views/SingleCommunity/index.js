import React from 'react';
import { URI } from "../../Api";
import Api from "../../Api/Api";
import { getDiffInDates, isNullRetNull, isObjEmpty } from '../../utils';
import { DislikeIcon, LikeIcon, } from '../../constant/svg.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import ReadMoreAndLess from 'react-read-more-less';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import SubHeader from '../../Components/SubHeader/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';
import {
  getComments,
  doComment,
  updateComment,
} from './functions.js';
class SingleCommunity extends React.Component {
  getComments = getComments.bind(this);
  doComment = doComment.bind(this);
  updateComment = updateComment.bind(this);
  constructor(props) {
    super(props);
    this.state = {
      isSuggestedCommunityModalOpen: false,
      errorMsg: "",
      commentsList: [],
      commentIdsObj: {},
      commentsObj: {},
      commentEdit: {}
    }
  }
  componentWillMount() {
    this.getComments();
  }
  setStateObj(obj) {
    this.setState({ ...this.state, ...obj })
  }
  likeOrDislike = (id, value, userId) => {
    const { userData, setAuthModal } = this.props;
    if (isObjEmpty(userData)) {
      setAuthModal(true);
    } else {
      let payload = {
        uri: URI.COMMUNITY_LIKE_DISLIKE,
        method: 'POST',
        data: {
          member_id: userId,
          comment_id: id,
          like_unlike: value,
        }
      }
      Api(payload)
        .then((res) => {
          if (res.status === 200) {
            this.getComments();
          }
        })
        .catch((err) => {
          this.setStateObj({ loader: false });
          alert("Unkown Error : " + err)
        })
    }
  }
  delComment = (id) => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      let payload = {
        uri: URI.DEL_COMMUNITY_COMMENT,
        method: 'POST',
        data: {
          comment_id: id
        }
      }
      Api(payload)
        .then((res) => {
          if (res.status === 200) {
            this.getComments();
          }
        })
        .catch((err) => {
          this.setStateObj({ loader: false });
          alert("Unkown Error : " + err)
        })
    } else {
    }

  }
  addOrreplyComment = (event, parentCommentId, userId) => {
    event.preventDefault();
    const { userData, setAuthModal } = this.props;
    if (isObjEmpty(userData)) {
      setAuthModal(true);
    } else {
      this.setStateObj({ loader: true });
      let payload = {
        uri: URI.ADD_COMMUNITY_COMMENT,
        method: 'POST',
        data: {
          community_id: this.props.match.params.id,
          parent_comment_id: parentCommentId,
          comment: event.target[0].value,
          user_id: userId
        }
      }
      Api(payload)
        .then((res) => {
          if (res.status === 200) {
            this.getComments();
            document.getElementById("addcomment").reset();
          }
        })
        .catch((err) => {
          this.setStateObj({ loader: false });
          alert("Unkown Error : " + err)
        })
    }
  }
  render() {
    const { loader, commentsList, commentIdsObj, commentEdit } = this.state;
    const { isLoggedIn, setAuthModal, userData } = this.props;
    return (<>
      <HeaderSearch />
      <SubHeader />
      <div className="col-12 pl-1 mt-3">
        <p className="title01 mt-1">Members - {this.props.match.params.name}</p>
      </div>
      <Loader isLoader={loader} />
      <div className="row mb-4">
        <div className="col-lg-1">
          <img src={userData.image_url} alt="" className="show-img-01 mt-3" />
        </div>
        <div className="col-lg-11 col-md-11">
          <section className="checkout_area">
            <form id="addcomment" onSubmit={(e) => this.addOrreplyComment(e, 0, userData.user_id)}>
              <div className="input-group">
                <input type="text" name="new_comment" className="form-control input-01" placeholder="Add a Comment ..." />
              </div>
              <div className="input-group mt-2">
                <button type="submit" className="btn btn-sm btn-success btnsubmitt ">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>  
      {
        commentsList.map((comment, i) => {
          return (
            <div key={i} className="row m-0 p-0 mb-4 comment-card-row">
              <img src={(comment.comment_sender_name === userData.user_id ? userData.image_url : comment.img)} className="rounded-circle comment-img mt-1" alt="Figure" />
              <div className="col-md-12 m-0 p-0 ml-2 p-2 comment-card-row-inner">
                <div className="row m-0 p-0 comments-user-div">
                  <b>{comment.name}</b>&nbsp;&nbsp;
                        <p className="m-0">{getDiffInDates(comment.created_at)}</p>
                </div>
                <div className="row m-0 p-0 mb-2 comment-text-div">
                  <ReadMoreAndLess
                    className="comment-text"
                    charLimit={260}
                    readMoreText="Read more"
                    readLessText="Read less">
                    {comment.comment}
                  </ReadMoreAndLess>
                </div>
                <div className="row m-0 p-0 comment-ftr-btns">
                  <button
                    type="button"
                    style={{display: 'none'}}
                    className="row m-0 p-0 mr-1"
                    onClick={() => {
                      if (isLoggedIn) {
                        this.setStateObj({ commentIdsObj: { [`c${comment.comment_id}`]: true } })
                      } else {
                        setAuthModal(true);
                      }
                    }}>Reply</button>
                  {isLoggedIn &&
                    comment.comment_sender_name === userData.user_id &&
                    <>
                      <button
                        type="button"
                        className="row m-0 p-0 mr-1"
                        onClick={() => {
                          if (isLoggedIn) {
                            this.setStateObj({ commentIdsObj: { [`ce${comment.comment_id}`]: true }, commentEdit: comment })
                          } else {
                            setAuthModal(true);
                          }
                        }}>Edit</button>
                      <button
                        type="button"
                        className="row m-0 p-0 mr-1"
                        onClick={() => {
                          if (isLoggedIn) {
                            this.delComment(comment.comment_id)
                          } else {
                            setAuthModal(true);
                          }
                        }}>Delete</button>
                    </>
                  }
                  <button
                    type="button"
                    className="row m-0 p-0 ml-1 mr-1"
                    onClick={() => { this.likeOrDislike(comment.comment_id, 1, userData.user_id) }}>
                    {isNullRetNull(comment.likes, 0)} &nbsp;<LikeIcon fill={comment.is_like_dislike === true ? "#19b24b" : "#999999"} width="18px" height="18px" />
                  </button>
                  <button
                    type="button"
                    className="row m-0 p-0 ml-1 mr-1"
                    onClick={() => { this.likeOrDislike(comment.comment_id, -1, userData.user_id) }}>
                    {isNullRetNull(comment.dislikes, 0)} &nbsp;<DislikeIcon fill={comment.is_like_dislike === false ? "#19b24b" : "#999999"} width="18px" height="18px" />
                  </button>
                </div>

                {commentIdsObj[`c${comment.comment_id}`] &&
                  <>
                    <input
                      className="form-control mt-3 mb-2 comment-box"
                      placeholder="Add Comment"
                      id={`c${comment.comment_id}`}
                      onChange={(e) => {
                        if (isLoggedIn) {
                          this.setStateObj({ commentsObj: { [`c${comment.comment_id}`]: e.target.value } })
                        } else {
                          setAuthModal(true);
                        }
                      }} />
                    <button
                      type="button"
                      className="form-control mt-1 mb-4 comment-btn"
                      style={{display: 'none'}}
                      onClick={() => {
                        if (isLoggedIn) {
                          this.doComment(`c${comment.comment_id}`, comment.comment_id) 
                        } else {
                          setAuthModal(true);
                        }
                      }}>
                      <h6 className="m-0 p-0">Reply</h6>
                    </button>
                  </>
                }
                {commentIdsObj[`ce${comment.comment_id}`] &&
                  <>
                    <input
                      className="form-control mt-3 mb-2 comment-box"
                      placeholder="Add Comment"
                      value={commentEdit.comment}
                      onChange={(e) => {
                        if (isLoggedIn) {
                          this.setStateObj({ commentEdit: { ...commentEdit, comment: e.target.value } })
                        } else {
                          setAuthModal(true);
                        }
                      }} />
                    <button
                      type="button"
                      className="form-control mt-1 mb-4 comment-btn"
                      onClick={() => {
                        if (isLoggedIn) {
                          this.updateComment()
                        } else {
                          setAuthModal(true);
                        }
                      }}>
                      <h6 className="m-0 p-0">Update</h6>
                    </button>
                  </>
                }
                {
                  comment.replies &&
                  comment.replies.reverse().map((commentr, i) => {
                    return (
                      <div style={{display: 'none'}} key={i} className="row m-0 p-0 mb-2 comment-card-row">
                        <img src={(commentr.comment_sender_name === userData.user_id ? userData.image_url : commentr.img)} className="rounded-circle comment-img  mt-1" alt="Figure" />
                        <div className="col-md-12 m-0 p-0 ml-2 p-2 comment-card-row-inner">
                          <div className="row m-0 p-0 comments-user-div">
                            <b>{commentr.name}</b>&nbsp;&nbsp;
                                  <p className="m-0">{getDiffInDates(commentr.created_at)}</p>
                          </div>
                          <div className="row m-0 p-0 mb-2 comment-text-div">
                            <ReadMoreAndLess
                              className="comment-text"
                              charLimit={260}
                              readMoreText="Read more"
                              readLessText="Read less">
                              {commentr.comment}
                            </ReadMoreAndLess>
                          </div>
                          <div className="row m-0 p-0 comment-ftr-btns">
                            <button
                              type="button"
                              className="row m-0 p-0 mr-1"
                              style={{display: 'none'}}
                              onClick={() => {
                                if (isLoggedIn) {
                                  this.setStateObj({ commentIdsObj: { [`c${commentr.comment_id}`]: true } })
                                } else {
                                  setAuthModal(true);
                                }
                              }}>Reply</button>

                            {isLoggedIn &&
                              commentr.comment_sender_name === userData.user_id &&
                              <>
                                <button
                                  type="button"
                                  className="row m-0 p-0 mr-1"
                                  onClick={() => {
                                    if (isLoggedIn) {
                                      this.setStateObj({ commentIdsObj: { [`ce${commentr.comment_id}`]: true }, commentEdit: commentr })
                                    } else {
                                      setAuthModal(true);
                                    }
                                  }}>Edit</button>
                                <button
                                  type="button"
                                  className="row m-0 p-0 mr-1"
                                  onClick={() => {
                                    if (isLoggedIn) {
                                      this.delComment(commentr.comment_id)
                                    } else {
                                      setAuthModal(true);
                                    }
                                  }}>Delete</button>
                              </>
                            }
                            <button
                              type="button"
                              className="row m-0 p-0 ml-1 mr-1"
                              onClick={() => { this.likeOrDislike(commentr.comment_id, 1, userData.user_id) }}>
                              {isNullRetNull(commentr.likes, 0)} &nbsp;<LikeIcon fill={commentr.is_like_dislike === true ? "#19b24b" : "#999999"} width="18px" height="18px" />
                            </button>
                            <button
                              type="button"
                              className="row m-0 p-0 ml-1 mr-1"
                              onClick={() => { this.likeOrDislike(commentr.comment_id, -1, userData.user_id) }}>
                              {isNullRetNull(commentr.dislikes, 0)} &nbsp;<DislikeIcon fill={commentr.is_like_dislike === false ? "#19b24b" : "#999999"} width="18px" height="18px" />
                            </button>
                          </div>
                          {commentIdsObj[`c${commentr.comment_id}`] &&
                            <>
                              <input
                                className="form-control mt-3 mb-2 comment-box"
                                placeholder="Add Comment"
                                id={`cr${commentr.comment_id}`}
                                onChange={(e) => {
                                  this.setStateObj({ commentsObj: { [`cr${commentr.comment_id}`]: e.target.value } })
                                }} />
                              <button
                                type="button"
                                className="form-control mt-1 mb-2 comment-btn"
                                style={{display: 'none'}}
                                onClick={() => {
                                  if (isLoggedIn) {
                                    this.doComment(`cr${commentr.comment_id}`, comment.comment_id)
                                  } else {
                                    setAuthModal(true);
                                  }
                                }}>
                                <h6 className="m-0 p-0">Reply</h6>
                              </button>
                            </>
                          }
                          {commentIdsObj[`ce${commentr.comment_id}`] &&
                            <>
                              <input
                                className="form-control mt-3 mb-2 comment-box"
                                placeholder="Add Comment"
                                value={commentEdit.comment}
                                onChange={(e) => {
                                  if (isLoggedIn) {
                                    this.setStateObj({ commentEdit: { ...commentEdit, comment: e.target.value } })
                                  } else {
                                    setAuthModal(true);
                                  }
                                }} />
                              <button
                                type="button"
                                className="form-control mt-1 mb-4 comment-btn"
                                onClick={() => {
                                  if (isLoggedIn) {
                                    this.updateComment()
                                  } else {
                                    setAuthModal(true);
                                  }
                                }}>
                                <h6 className="m-0 p-0">Update</h6>
                              </button>
                            </>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCommunity);