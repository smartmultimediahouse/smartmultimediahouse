import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { URI } from '../../Api';
import { splitArrayIntoChunks } from '../../utils/index.js';
import Api from '../../Api/Api';
import { CardGroup, Card } from 'react-bootstrap';

class Favorite extends React.Component {

    state = {
        favorites: []
    }

    componentDidMount() {
        this.getFavorites();
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    getFavorites = () => {
        const {
            userData
        } = this.props
        let payload = {
            uri: URI.GET_FAVORITE,
            method: 'post',
            data: {
                user_id: userData.user_id
            }
        }
        Api(payload)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setStateObj({ favorites: res.data });
                } else {
                    this.props.setNotify({ isShow: true, msg: "You don't have any favorite video", title: 'Failed' })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }

    removeFav = (id) => {
        const {
            userData
        } = this.props
        let payload = {
            uri: URI.RM_FAVORITE,
            method: 'post',
            data: {
                user_id: userData.user_id,
                videos_id: id
            }
        }
        Api(payload)
            .then((res) => {
                if (res.data.status === 'success') {
                    this.props.setNotify({ isShow: true, msg: "Successfully removed", title: 'success' })
                    this.getFavorites();
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
        videoTypeArr = videoTypeArr[Math.floor(Math.random()*videoTypeArr.length)]
        let payload = {
            uri:URI.CATEGORIES,
            method:'post',
            data:{}
        }
        Api(payload)
        .then((res)=>{
            if(res.data.message === 'success'){
                console.log(res);
                res.data.data.forEach((x) => {
                    if(x.video_type_id === videoTypeArr){
                        console.log(this.props);
                        this.props.history.push(`/Watch-Video/${video.title}`, { video: video, category: x })
                    }
                })                
            }
        })
        .catch((err)=>{
            alert("Unkown Error : "+err)
        })
    }

    render() {
        const { favorites } = this.state;
        return (
            <React.Fragment>
                {splitArrayIntoChunks(favorites, 2).map((row, i) => {
                    return (
                        <div key={i} className="row show-body">
                            {
                                row.map((item, j) => {
                                    return (
                                        <div key={i + '_' + j} className="col-md-6 col-sm-12 card-btn">
                                            <CardGroup>
                                                <Card>
                                                    <Card.Img variant="top" src={item.thumbnail_url} style={{ height: 200 }} />
                                                    <Card.Body onClick={() => { this.playVideo(item, item.video_type) }} style={{ cursor: 'pointer', minHeight: 148 }} >
                                                        <Card.Title className="remove-fav-text-description">{item.title}</Card.Title>
                                                        <Card.Text className="remove-fav-text-description">
                                                            {item.description}
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small style={{ cursor: 'pointer' }} onClick={() => {this.removeFav(item.videos_id)}} className="text-danger">Remove from favorite</small>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorite));
