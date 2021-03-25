import React from 'react';
import { Table, Tab, Tabs, Image, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { URI } from '../../Api';
import Api from '../../Api/Api';
import { getBase64 } from '../../utils';

class ViewProfile extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Row className="p-5">
                    <Col xs={12} md={4}>
                        <Image src={this.props.user.image_url} thumbnail roundedCircle style={{ width: 150, height: 150 }} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: 60 }}>Name: </th>
                                    <td style={{ borderBottom: '2px solid #dee2e6' }}>
                                        {this.props.user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email: </th>
                                    <td style={{ borderBottom: '2px solid #dee2e6' }}>
                                        {this.props.user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Gender: </th>
                                    <td style={{ borderBottom: '2px solid #dee2e6' }}>
                                        {this.props.user.gender}
                                    </td>
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePic: props.user.image_url,
            selectedFile: { name: "Select File" }
        }
    }
    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }


    pictureSelect = (e) => {
        if (e.target.files.length !== 0) {
            this.setStateObj({ selectedFile: e.target.files[0], profilePic: URL.createObjectURL(e.target.files[0]) });
        } else {
            this.setStateObj({ selectedFile: { name: "Select File" } });
        }
    }

    profileUpdate = (e) => {
        e.preventDefault();
        this.setStateObj({ loader: true });
        let data = {
            id: this.props.user.user_id,
            email: e.target.userEmail.value,
            name: e.target.userName.value,
            gender: e.target.userGender.value,
        }
        if (e.target.userPassword.value) {
            data.password = e.target.userPassword.value;
        }
        if (e.target.userProfile.files[0]) {
            data.photo = e.target.userProfile.files[0];
        }
        let payload = {
            uri: URI.UPDATE_PROFILE,
            method: 'post',
            data: data
        }
        Api(payload)
            .then((res) => {
                if (res.data.status === 'success') {
                    Api({
                        uri: URI.GET_USER_DETAILS,
                        method: 'post',
                        data: {
                            id: this.props.user.user_id
                        }
                    }).then((result) => {
                        
                        if(this.state.profilePic !== result.data.userInfo.img){
                            getBase64(this.state.selectedFile, resultImgBase => {
                                this.props.setUserData({
                                    email: result.data.userInfo.email,
                                    gender: (result.data.userInfo.gender === "1" ? "Male" : "Female"),
                                    image_url: resultImgBase,
                                    join_date: result.data.userInfo.join_date,
                                    last_login: result.data.userInfo.last_login,
                                    message: "success",
                                    name: result.data.userInfo.name,
                                    status: "202",
                                    user_id: result.data.userInfo.user_id,
                                }
                                )
                            });
                        }else {
                            this.props.setUserData({
                                email: result.data.userInfo.email,
                                gender: (result.data.userInfo.gender === "1" ? "Male" : "Female"),
                                image_url: this.state.profilePic,
                                join_date: result.data.userInfo.join_date,
                                last_login: result.data.userInfo.last_login,
                                message: "success",
                                name: result.data.userInfo.name,
                                status: "202",
                                user_id: result.data.userInfo.user_id,
                            }
                            );
                        }                        
                        this.props.setNotify({ isShow: true, msg: "Profile Updated Successfully!", title: 'Success' })
                    })
                } else {
                    this.props.setNotify({ isShow: true, msg: res.data.data, title: 'Failed' })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }

    render() {
        const {
            user
        } = this.props
        const { profilePic } = this.state;
        return (
            <React.Fragment>
                <Row className="p-5">
                    <Col xs={6} md={4}>
                        <Image src={profilePic} thumbnail roundedCircle style={{ width: 150, height: 150 }} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Form onSubmit={(e) => { this.profileUpdate(e) }}>
                            <Form.Group controlId="userName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="userName" type="text" defaultValue={user.name} />
                            </Form.Group>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="userEmail" type="email" defaultValue={user.email} />
                            </Form.Group>
                            <Form.Group controlId="userGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control name="userGender" defaultValue={user.gender} size="sm" as="select">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="userPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="userPassword" type="password" placeholder="*****************" />
                            </Form.Group>
                            <Form.Group controlId="userProfile">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.File
                                    name="userProfile"
                                    id="profile-pic-select"
                                    label={this.state.selectedFile.name}
                                    lang="en"
                                    custom
                                    onChange={(e) => { this.pictureSelect(e) }}
                                />
                            </Form.Group>
                            <Button className="custom-submit-btn" variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}


class Profile extends React.Component {

    render() {
        const {
            userData,
            setUserData,
            setNotify,
            setLoginStatus
        } = this.props
        return (
            <React.Fragment>
                <Tabs transition={false} defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="profile" title="Profile">
                        <ViewProfile user={userData} />
                    </Tab>
                    <Tab eventKey="EditProfile" title="Edit Profile">
                        <EditProfile user={userData} setUserData={setUserData} setNotify={setNotify} setLoginStatus={setLoginStatus} />
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
