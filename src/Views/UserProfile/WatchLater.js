import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { URI } from '../../Api';
import { splitArrayIntoChunks } from '../../utils/index.js';
import Api from '../../Api/Api';
import { CardGroup, Card } from 'react-bootstrap';

class WatchLater extends React.Component {

    state = {
        watchLater: []
    }

    componentDidMount() {
        this.getWatchLater();
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    getWatchLater = () => {
        const {
            userData
        } = this.props
        let payload = {
            uri: URI.GET_WATCH_LATER,
            method: 'post',
            data: {
                user_id: userData.user_id
            }
        }
        Api(payload)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setStateObj({ watchLater: res.data });
                } else {
                    this.props.setNotify({ isShow: true, msg: "You don't have any video in your watch later", title: 'Failed' })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }

    removeWatchLater = (id) => {
        let payload = {
            uri: URI.REMOVE_WATCH_LATER,
            method: 'post',
            data: {
                // user_id: userData.user_id,
                wish_list_id: id
            }
        }
        Api(payload)
            .then((res) => {
                if (res.data.message === 'success') {
                    this.props.setNotify({ isShow: true, msg: "Successfully removed", title: 'success' })
                    this.getWatchLater();
                } else {
                    this.props.setNotify({ isShow: true, msg: "Sorry Something went wrong", title: 'Failed' })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }

    playVideo = (video, videoType) => {
        let videoTypeArr = videoType.split(",");
        videoTypeArr.splice(videoTypeArr.indexOf(16), 1);
        videoTypeArr = videoTypeArr[Math.floor(Math.random() * videoTypeArr.length)]
        let payload = {
            uri: URI.CATEGORIES,
            method: 'post',
            data: {}
        }
        Api(payload)
            .then((res) => {
                if (res.data.message === 'success') {
                    res.data.data.forEach((x) => {
                        if (x.video_type_id === videoTypeArr) {
                            this.props.history.push(`/Watch-Video/${video.title}`, { video: video, category: x })
                        }
                    })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }

    render() {
        const { watchLater } = this.state;
        return (
            <React.Fragment>
                {splitArrayIntoChunks(watchLater, 2).map((row, i) => {
                    console.log(row);
                    return (
                        <div key={i} className="row show-body">
                            {
                                row.map((item, j) => {
                                    return (
                                        <div key={i + '_' + j} className="col-md-6 col-sm-12 card-btn">
                                            <CardGroup>
                                                <Card>
                                                    <Card.Img variant="top" src={item.thumbnail_url} />
                                                    <Card.Body onClick={() => { this.playVideo(item, item.video_type) }} style={{ cursor: 'pointer' }} >
                                                        <Card.Title>{item.title}</Card.Title>
                                                        <Card.Text className="remove-fav-text-description">
                                                            {item.description}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small style={{ cursor: 'pointer' }} onClick={() => { this.removeWatchLater(item.wish_list_id) }} className="text-danger">Remove from Watch Later</small>
                                                    </Card.Footer>
                                                </Card>
                                            </CardGroup>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
                }
            </React.Fragment>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WatchLater));
