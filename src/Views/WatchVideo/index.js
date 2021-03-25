import React from 'react'
import { getDiffInDates, isNullRetNull } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import Youtube from '../../Components/Youtube/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import ReadMoreAndLess from 'react-read-more-less';
import { DislikeIcon, LikeIcon, WatchLaterIcon, FavouriteIcon } from '../../constant/svg.js';
import {
  getComments,
  doComment,
  updateComment,
  deleteComment,
  doCommentLikeDisLike,
  doVideoLikeDisLike,
  addFavorite,
  addInWatchLater,
  getFavorite,
  getWatchLater
} from './functions.js';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';
 
const moment = require('moment');

class WatchVideos extends React.Component {
    getComments = getComments.bind(this);
    doComment = doComment.bind(this);
    updateComment = updateComment.bind(this);
    deleteComment = deleteComment.bind(this);
    doCommentLikeDisLike = doCommentLikeDisLike.bind(this);
    doVideoLikeDisLike = doVideoLikeDisLike.bind(this);
    addFavorite = addFavorite.bind(this);
    addInWatchLater = addInWatchLater.bind(this);
    getFavorite = getFavorite.bind(this);
    getWatchLater = getWatchLater.bind(this);
    constructor(props){
      super(props);
      this.state = {
        playVideo: this.props.history.location.state.video,
        category:this.props.history.location.state.category,
        commentsList:[],
        commentIdsObj:{},
        commentsObj:{},
        commentEdit:{}
      }
      this.playVideo = this.playVideo.bind(this);
    }    
    componentWillMount(){
      this.getComments(this.state.playVideo.videos_id)
    }
    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }
    playVideo(video){
      this.props.history.push(`Watch-Video/${video.title}`, { video: video, category:this.state.category })
      this.getComments(video.videos_id)
    }
   render(){
      
      const { loader, playVideo, category, commentsList, commentIdsObj, commentEdit } = this.state;
      const { getCatDetails, isLoggedIn, userData, setAuthModal } = this.props;
      console.log(playVideo);
      return(<>
            <Helmet>
                <title>{playVideo.title}</title>
            </Helmet>
        <HeaderSearch />
        <SubHeader />
        <div className="row m-0 p-0">
          <div className="col-md-7 m-0 p-0 mt-2">
            <Youtube url={playVideo.slug} className="youtube-player-class"/>
            <h5 className="mt-1">{playVideo.title}</h5>
            <div className="row m-0 p-0 mb-2 video-first-row">
              <h6 className="m-0 p-0 video-release-date">{moment(playVideo.release).format('MMM DD, YYYY')}</h6>
              <div className="row m-0 p-0 video-icons-row">           
                <button
                  type="button"
                  style={{display: 'flex', alignItems: 'center'}}
                  onClick={()=>{
                    this.doVideoLikeDisLike(playVideo, 1, (playVideo.is_user_like !== undefined ? playVideo.is_user_like.toString() : 'none'))
                  }}>
                  {isNullRetNull(playVideo.total_likes,0)} &nbsp;<LikeIcon fill={playVideo.is_user_like === true ? "#19b24b" : "#333"} width="20px" height="20px"/>
                </button>
                <button
                  type="button"
                  style={{display: 'flex', alignItems: 'flex-end'}}
                  onClick={()=>{
                    this.doVideoLikeDisLike(playVideo, -1, (playVideo.is_user_like !== undefined ? playVideo.is_user_like.toString() : 'none'))
                  }}>
                  <DislikeIcon fill={playVideo.is_user_like === false ? "#19b24b" : "#333"} width="20px" height="20px"/> &nbsp;{isNullRetNull(playVideo.total_dislikes,0)}
                </button>
                <button
                  type="button"
                  onClick={()=>{
                    (getFavorite().includes(playVideo.videos_id) ? this.addFavorite(playVideo, true) : this.addFavorite(playVideo))
                    
                  }}>
                  <FavouriteIcon fill={getFavorite().includes(playVideo.videos_id) ? "#19b24b" : "#999999"} width="20px" height="20px"/>
                </button>
                <button
                  type="button"
                  onClick={()=>{
                    (getWatchLater().includes(playVideo.videos_id) ? this.addInWatchLater(playVideo, true) : this.addInWatchLater(playVideo))                    
                  }}>
                  <WatchLaterIcon fill={getWatchLater().includes(playVideo.videos_id) ? "#19b24b" : "#999999"} width="20px" height="20px"/>
                </button>
              </div>
            </div>
            <ReadMoreAndLess
                className="video-description"
                charLimit={260}
                readMoreText="Read more"
                readLessText="Read less">
                {playVideo.description}
            </ReadMoreAndLess>
            <input
              className="form-control mt-3 mb-2 comment-box"
              placeholder="Add Comment"
              id="parentComment"
              onChange={(e)=>{
                if(isLoggedIn){
                  this.setStateObj({ commentsObj:{ 'parentComment':e.target.value } })
                }else{
                  setAuthModal(true);
                }
              }}/>
            <button type="button"
              className="form-control mt-1 mb-4 comment-btn"
              onClick={()=>{
                if(isLoggedIn){
                  this.doComment(playVideo.videos_id, 'parentComment')
                }else{
                  setAuthModal(true);
                }
              }} >
              <h6 className="m-0 p-0">Submit</h6>
            </button>
            <Loader isLoader={loader}/>
            {
              commentsList.map((comment, i)=>{
                return(
                  <div key={i} className="row m-0 p-0 mb-4 comment-card-row">
                    <img src={comment.img} className="rounded-circle comment-img mt-1" alt="Figure"/>
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
                          onClick={()=>{
                            if(isLoggedIn){
                              this.setStateObj({ commentIdsObj:{[`c${comment.vcomment_id}`]:true} })
                            }else{
                              setAuthModal(true);
                            }
                          }}>Reply</button>
                          { isLoggedIn &&
                            comment.comment_sender_name === userData.user_id &&
                            <>
                              <button
                                type="button"
                                className="row m-0 p-0 mr-1"
                                onClick={()=>{
                                  if(isLoggedIn){
                                    this.setStateObj({ commentIdsObj:{[`ce${comment.vcomment_id}`]:true }, commentEdit:comment })
                                  }else{
                                    setAuthModal(true);
                                  }
                                }}>Edit</button>
                              <button
                                type="button"
                                className="row m-0 p-0 mr-1"
                                onClick={()=>{
                                  if(isLoggedIn){
                                    this.deleteComment(comment.vcomment_id)
                                  }else{
                                    setAuthModal(true);
                                  }
                                }}>Delete</button>
                            </>
                          }
                        <button
                          type="button"
                          className="row m-0 p-0 ml-1 mr-1"
                          onClick={()=>{
                            this.doCommentLikeDisLike(comment, 1)
                          }}>
                          {isNullRetNull(comment.likes, 0)} &nbsp;<LikeIcon fill={comment.like_unlike === "true" ? "#19b24b" : "#999999"} width="18px" height="18px"/>
                        </button>
                        <button
                          type="button"
                          className="row m-0 p-0 ml-1 mr-1"
                          onClick={()=>{
                            this.doCommentLikeDisLike(comment, -1)
                          }}>
                          {isNullRetNull(comment.dislikes, 0)} &nbsp;<DislikeIcon fill={comment.like_unlike === "false" ? "#19b24b" : "#999999"} width="18px" height="18px"/>
                        </button>
                      </div>
                      { commentIdsObj[`c${comment.vcomment_id}`] &&
                        <>
                          <input
                            className="form-control mt-3 mb-2 comment-box"
                            placeholder="Add Comment"
                            id={`c${comment.vcomment_id}`}
                            onChange={(e)=>{ 
                              if(isLoggedIn){
                                this.setStateObj({ commentsObj:{ [`c${comment.vcomment_id}`]:e.target.value } })
                              }else{
                                setAuthModal(true);
                              }
                            }}/>
                          <button
                            type="button"
                            className="form-control mt-1 mb-4 comment-btn"
                            style={{display: 'none'}}
                            onClick={()=>{
                              if(isLoggedIn){
                                this.doComment(playVideo.videos_id, `c${comment.vcomment_id}`, comment.vcomment_id) 
                              }else{
                                setAuthModal(true);
                              }
                            }}>
                            <h6 className="m-0 p-0">Reply</h6>
                          </button>
                        </>
                      }
                      {commentIdsObj[`ce${comment.vcomment_id}`] &&
                        <>
                          <input
                            className="form-control mt-3 mb-2 comment-box"
                            placeholder="Add Comment"
                            value={commentEdit.comment}
                            onChange={(e)=>{ 
                              if(isLoggedIn){
                                this.setStateObj({ commentEdit:{ ...commentEdit, comment:e.target.value } })
                              }else{
                                setAuthModal(true);
                              }
                            }}/>
                          <button
                            type="button"
                            className="form-control mt-1 mb-4 comment-btn"
                            onClick={()=>{
                              if(isLoggedIn){
                                  this.updateComment()
                              }else{
                                setAuthModal(true);
                              }
                            }}>
                            <h6 className="m-0 p-0">Update</h6>
                          </button>
                        </>
                      }
                      {
                        comment.replies &&
                        comment.replies.reverse().map((commentr, i)=>{
                          return(
                            <div style={{display: 'none'}} key={i} className="row m-0 p-0 mb-2 comment-card-row">
                              <img src={commentr.img} className="rounded-circle comment-img  mt-1" alt="Figure"/>
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
                                    style={{display: 'none'}}
                                    className="row m-0 p-0 mr-1"
                                    onClick={()=>{
                                      if(isLoggedIn){
                                        this.setStateObj({ commentIdsObj:{[`c${commentr.vcomment_id}`]:true} })
                                      }else{
                                        setAuthModal(true);
                                      }
                                    }}>Reply</button>

                                  { isLoggedIn &&
                                    commentr.comment_sender_name === userData.user_id &&
                                    <>
                                      <button
                                        type="button"
                                        className="row m-0 p-0 mr-1"
                                        onClick={()=>{
                                          if(isLoggedIn){
                                            this.setStateObj({ commentIdsObj:{[`ce${commentr.vcomment_id}`]:true }, commentEdit:commentr })
                                          }else{
                                            setAuthModal(true);
                                          }
                                        }}>Edit</button>
                                      <button
                                        type="button"
                                        className="row m-0 p-0 mr-1"
                                        onClick={()=>{
                                          if(isLoggedIn){
                                            this.deleteComment(commentr.vcomment_id)
                                          }else{
                                            setAuthModal(true);
                                          }
                                        }}>Delete</button>
                                    </>
                                  }
                                  <button
                                    type="button"
                                    className="row m-0 p-0 ml-1 mr-1"
                                    onClick={()=>{
                                      this.doCommentLikeDisLike(commentr, 1)
                                    }}>
                                    {isNullRetNull(commentr.likes,0)} &nbsp;<LikeIcon fill={commentr.like_unlike === "true" ? "#19b24b" : "#999999"} width="18px" height="18px"/>
                                  </button>
                                  <button
                                    type="button"
                                    className="row m-0 p-0 ml-1 mr-1"
                                    onClick={()=>{
                                      this.doCommentLikeDisLike(commentr, -1)
                                    }}>
                                    {isNullRetNull(commentr.dislikes,0)} &nbsp;<DislikeIcon fill={commentr.like_unlike === "false" ? "#19b24b" : "#999999"} width="18px" height="18px"/>
                                  </button>
                                </div>
                                { commentIdsObj[`c${commentr.vcomment_id}`] &&
                                  <>
                                    <input
                                      className="form-control mt-3 mb-2 comment-box"
                                      placeholder="Add Comment"
                                      id={`cr${commentr.vcomment_id}`}
                                      onChange={(e)=>{ 
                                        this.setStateObj({ commentsObj:{ [`cr${commentr.vcomment_id}`]:e.target.value } })
                                      }}/>
                                    <button
                                      type="button"
                                      className="form-control mt-1 mb-2 comment-btn"
                                      style={{display: 'none'}}
                                      onClick={()=>{
                                        if(isLoggedIn){
                                          this.doComment(playVideo.videos_id, `cr${commentr.vcomment_id}`, comment.vcomment_id)
                                        }else{
                                          setAuthModal(true);
                                        }
                                      }}>
                                      <h6 className="m-0 p-0">Reply</h6>
                                    </button>
                                  </>
                                }
                                {commentIdsObj[`ce${commentr.vcomment_id}`] &&
                                  <>
                                    <input
                                      className="form-control mt-3 mb-2 comment-box"
                                      placeholder="Add Comment"
                                      value={commentEdit.comment}
                                      onChange={(e)=>{ 
                                        if(isLoggedIn){
                                          this.setStateObj({ commentEdit:{ ...commentEdit, comment:e.target.value } })
                                        }else{
                                          setAuthModal(true);
                                        }
                                      }}/>
                                    <button
                                      type="button"
                                      className="form-control mt-1 mb-4 comment-btn"
                                      onClick={()=>{
                                        if(isLoggedIn){
                                            this.updateComment()
                                        }else{
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
          </div>
          <div className="col-md-5 col-sm-12 p-0 m-0 mb-3 mt-2">
            {
              getCatDetails.length > 0 &&
              <div className="row watch-video-card-title-row m-0 p-0 pl-1 mb-2">
                <div className="green-dot"/>
                <h5 className="watch-video-h5-tag">{category.video_type}</h5>
              </div>
            }
            {
              // eslint-disable-next-line array-callback-return
              getCatDetails.map((item, i) => {
                if(item.videos_id !== playVideo.videos_id){
                  return(
                    <button
                      key={i}
                      type="button"
                      className="card-btn"
                      onClick={()=>{
                        this.playVideo(item); this.props.history.push(`/Watch-Video/${item.title}`, { video: item, category:this.state.category }); this.setState({playVideo: item})
                      }}>
                      <div className="row m-0 p-0 watch-video-card-detail-div">
                        <img src={item.img} className="watch-video-card-img" alt="?"/>
                        <div className="descriptions">
                          <h6 className="text-left pt-1 pr-2">{item.title}</h6>
                          <p className="text-left p-0 m-0 pr-2">
                            {item.description}
                          </p>
                          <p className="text-left p-0 m-0 mt-1 pr-2">{item.total_view} Views | {item.time}</p>
                        </div>
                      </div>
                    </button>
                  )
                }
              })
            }
          </div>
        </div>
        <Notify { ...this.props }/>
      </>)
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(WatchVideos);