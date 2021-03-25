import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { URI } from '../../Api';
import Api from '../../Api/Api';
import { engLogo } from '../../constant/images';
import { Modal, Form } from 'react-bootstrap';


const ForgotPasswordModal = (props) => {
    const [fPassModalOpen, setFPassModalOpen] = React.useState(false);
    const doResetPass = (e) => {
        e.preventDefault();
        let payload = {
            uri: `${URI.FORGOT_PASSWORD}${e.target.userEmail.value}`,
            method: 'post',
            data: {}
        }
        Api(payload)
            .then((res) => {
                // console.log("Login : ", res)
                console.log(res.data.status);
                props.setNotify({ isShow: true, msg: "Check you email.We have sent your password throught email.", title: 'Success' });
                setFPassModalOpen(false);
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    }
    return (
        <React.Fragment>
            <div className="row m-0 p-0 forgot-password-row">
                <button
                    onClick={() => { setFPassModalOpen(true) }}
                    type="button"
                    data-toggle="modal" data-target="#authModal"
                    className="p-0 m-0 mb-3 forgot-password-btn">
                    <h6 className="m-0 p-0">Forgot Password?</h6>
                </button>
            </div>
            <Modal animation={false} show={fPassModalOpen} size="lg" aria-labelledby="contained-modal-title-vcenter2" centered onHide={() => setFPassModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reset
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row m-0 p-0 auth-modal-logo-div">
                        <img src={engLogo} alt="logo" className="auth-modal-logo" />
                    </div>
                    <Form onSubmit={(e) => { doResetPass(e) }}>

                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required name="userEmail" type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="text-center">
                        <button className="btn sign-in-btn" type="submit">
                            Submit
                        </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" onClick={() => { setFPassModalOpen(false) }} data-toggle="modal" data-target="#authModal">Close</button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );

}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal);