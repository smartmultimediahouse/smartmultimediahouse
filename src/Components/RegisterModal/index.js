import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { URI } from '../../Api';
import Api from '../../Api/Api';
import { engLogo } from '../../constant/images';
import { Modal, Form } from 'react-bootstrap';


const RegisterModal = (props) => {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
    const doSignUp = (e) => {
        e.preventDefault();
        let payload = {
            uri:URI.SIGNUP,
            method:'post',
            data:{
                email: e.target.userEmail.value,
                password: e.target.userPassword.value,
                name: e.target.userName.value,
                agreeTerms: e.target.termsOfUseAccept.value
            }
        }
        Api(payload)
        .then((res)=>{
            // console.log("Login : ", res)
            if(res.data.status === 'success'){
                props.setNotify({ isShow:true, msg:"Registered Successfully!", title:'Success' });
                setRegisterModalOpen(false);
            }else{
                props.setNotify({ isShow:true, msg:res.data.data, title:'Failed' })
            }
        })
        .catch((err)=>{
            alert("Unkown Error : "+err)
        })
    }
    return (
        <React.Fragment>
            <div className="row m-0 p-0 mt-3 mb-4 sigin-instract-row">
                <h6 className="m-0 p-0">Don't have an account yet? </h6>
                <button
                    onClick={() => { setRegisterModalOpen(true) }}
                    type="button"
                    data-toggle="modal" data-target="#authModal"
                    className="m-0 p-0 sign-up-btn">
                    <h6 className="m-0 p-0"><span> &nbsp; </span>Sign up</h6>
                </button>
            </div>
            <Modal animation={false} show={registerModalOpen} size="md" aria-labelledby="contained-modal-title-vcenter2" centered onHide={() => setRegisterModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row m-0 p-0 auth-modal-logo-div">
                        <img src={engLogo} alt="logo" className="auth-modal-logo" />
                    </div>
                    <Form onSubmit={(e) => {doSignUp(e)}}>
                        <Form.Group controlId="userName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required name="userName" type="text" placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required name="userEmail" type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="userPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="userPassword" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="termsOfUseAccept">
                            <Form.Check style={{float: 'left'}} required name="termsOfUseAccept" type="checkbox" />
                            <Form.Label>You have agreed to the <a href='/terms-of-use'> terms </a> of the Discover Pakistan.</Form.Label>
                        </Form.Group>
                        <Form.Group className="text-center">
                        <button className="btn sign-in-btn" type="submit">
                            Submit
                        </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" onClick={() => { setRegisterModalOpen(false) }} data-toggle="modal" data-target="#authModal">Close</button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );

}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);