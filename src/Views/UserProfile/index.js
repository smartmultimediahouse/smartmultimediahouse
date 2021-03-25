import React from 'react';
import { Tab, Row, Nav, Col } from 'react-bootstrap';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import Profile from './Profile';
import WatchLater from './WatchLater';
import Favorite from './Favorite';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';
import { withRouter } from 'react-router-dom';
const queryString = require('query-string');

class UserProfile extends React.Component {

    componentDidMount() {
        // this.props.setNotify({ isShow:true, msg:"Login Successfully!", title:'Success' });
    }

    render() {
        const parsed = queryString.parse(window.location.search);
        const {
            setLoginStatus,
            setUserData,
            setNotify
        } = this.props
        return (
            <React.Fragment>
                <HeaderSearch />
                <SubHeader />
                <Tab.Container transition={false} id="left-tabs-example" defaultActiveKey={parsed.tabName} activeKey={parsed.tabName}>
                    <Row className="mt-3">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link onClick={() => { this.props.history.push("/user-profile?tabName=profile") }} eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => { this.props.history.push("/user-profile?tabName=favorite") }} eventKey="favorite">Favorites</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => { this.props.history.push("/user-profile?tabName=watchlater") }} eventKey="watchlater">Watch Later</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => {
                                            setLoginStatus();
                                            setUserData();
                                            setNotify({ isShow: true, msg: 'Logout Successfully!', title: 'Success' })

                                        }}>Logout</button>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    <Profile />
                                </Tab.Pane>
                                <Tab.Pane eventKey="favorite">
                                    <div className="row watch-video-card-title-row m-0 p-0 pl-1 mb-2">
                                        <div className="green-dot" />
                                        <h5 className="watch-video-h5-tag">Favorite Videos</h5>
                                    </div>
                                    {parsed.tabName === "favorite" && <Favorite />}
                                </Tab.Pane>
                                <Tab.Pane eventKey="watchlater">
                                    <div className="row watch-video-card-title-row m-0 p-0 pl-1 mb-2">
                                        <div className="green-dot" />
                                        <h5 className="watch-video-h5-tag">Watch Later</h5>
                                    </div>
                                    {parsed.tabName === "watchlater" && <WatchLater />}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Notify />
            </React.Fragment>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));