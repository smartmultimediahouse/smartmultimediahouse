import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { URI } from '../../Api';
import Api from '../../Api/Api';
import { profile, profileMobile } from '../../constant/images';
import { isNullRetNull } from '../../utils';
import { engLogo } from '../../constant/images';
import { Modal, Form } from 'react-bootstrap';
import RegisterModal from '../RegisterModal';
import ForgotPasswordModal from '../ForgotPasswordModal';


const AuthModal = (props) => {
    const doLogin = (e) => {
        e.preventDefault();
        let payload = {
            uri: URI.LOGIN,
            method: 'post',
            data: {
                email: e.target.email.value,
                password: e.target.password.value
            }
        }
        Api(payload)
            .then((res) => {
                // console.log("Login : ", res)
                if (res.data.message === 'success') {
                    props.setLoginStatus(true);
                    props.setUserData(res.data)
                    props.setNotify({ isShow: true, msg: "Login Successfully!", title: 'Success' })
                } else {
                    props.setNotify({ isShow: true, msg: res.data.data, title: 'Failed' })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }
    return (
        <React.Fragment>
            {
                props.mobile &&
                <button onClick={() => { props.setAuthModal(true) }} type="button" className="p-0 m-0 login-mobile-btn" style={{ position: "absolute", top: 0, bottom: 0, width: "10%", backgroundColor: "transparent", right: 12, border: 0 }}>
                    {window.innerWidth < 501 &&
                        <img src={isNullRetNull(props.image_url, false) ? isNullRetNull(props.userData.image_url, 'https://') : profileMobile} alt="?" style={{ height: "100%" }} />
                    }
                    {window.innerWidth > 500 &&
                        <img src={isNullRetNull(props.image_url, false) ? isNullRetNull(props.userData.image_url, 'https://') : profile} alt="?" style={{ height: "100%" }} />
                    }
                </button>
            }
            {
                props.desktop &&
                <button onClick={() => { props.setAuthModal(true) }} type="button" className="p-0 m-0" >
                    <img src={isNullRetNull(props.userData.image_url, false) ? isNullRetNull(props.userData.image_url, 'https://') : profile} alt="?" />
                </button>
            }
            <Modal animation={false} show={props.authModal} size="md" aria-labelledby="contained-modal-title-vcenter2" centered onHide={() => props.setAuthModal(false)}>
                <Modal.Body>
                    <button onClick={() => { props.setAuthModal(false) }} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="row m-0 p-0 auth-modal-logo-div">
                        <img src={engLogo} alt="logo" className="auth-modal-logo" />
                    </div>
                    <Form onSubmit={(e) => { doLogin(e) }}>
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required name="email" type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="userPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <ForgotPasswordModal />
                        <Form.Group className="text-center">
                            <button className="btn sign-in-btn" type="submit">
                                Submit
                        </button>
                        </Form.Group>
                    </Form>
                    <RegisterModal />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );

}
export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);