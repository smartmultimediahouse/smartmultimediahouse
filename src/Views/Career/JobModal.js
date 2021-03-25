import React from 'react';
import { Modal } from 'react-bootstrap';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { Form } from 'react-bootstrap';
import Api from '../../Api/Api';
import { URI } from '../../Api';

class JobModal extends React.Component {
    state = {
        modalOpen: false,
        selectedFile: {
            name: ""
          },
    }

    applyCareer = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        var data = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            job: e.target.job.value,
            experince: e.target.experince.value,
            postion: e.target.postion.value,
            comment: e.target.comment.value,
            file: selectedFile,
        }
        let payload = {
            uri: URI.APPLY_FOR_JOB,
            method: 'post',
            data: data
        }
        Api(payload)
            .then((res) => {
                console.log(res)

            })
            .catch((err) => {
                console.log(err)
                alert("Unkown Error : " + err)
            })
    }

    onFileChange = event => {
        if (event.target.files.length !== 0) {
            this.setStateObj({ selectedFile: event.target.files[0], fileUrl: URL.createObjectURL(event.target.files[0]) });
        } else {
            this.setStateObj({ selectedFile: { name: "" } });
        }
    };

    modalOpenClose = (status) => {
        this.setState({
            modalOpen: status
        })
    }

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }    

    render() {
        const { modalOpen } = this.state;
        const { job } = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col text-center mb-4">
                        <button onClick={() => this.modalOpenClose(true)} className="profile-button">Apply Now</button>
                    </div>
                </div>
                <Modal animation={false} show={modalOpen} size="md" aria-labelledby="contained-modal-title-vcenter2" centered onHide={() => this.modalOpenClose(false)}>
                    <Modal.Header className="text-center" closeButton>
                        <Modal.Title>
                            Job Application
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-center">
                            Please provide the following information to start your application process:
                        </p>
                        <Form onSubmit={(e) => { this.applyCareer(e) }}>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required name="name" type="text" placeholder="Enter Name" />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group controlId="userEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required name="email" type="email" placeholder="Enter email" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Group controlId="phone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control required name="phone" type="tel" placeholder="Enter Mobile" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Group controlId="experince">
                                        <Form.Label>Experience</Form.Label>
                                        <Form.Control required name="experince" type="text" placeholder="Enter Experience" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Form.Group controlId="job">
                                        <Form.Label>Job</Form.Label>
                                        <Form.Control disabled name="job" value={job} type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group controlId="postion">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control required name="postion" type="text" placeholder="Enter Position" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="input-group">
                                        <p className="fomr-label w-100">CV/Resume</p>
                                        <label className="file form-control">
                                            <input type="file" required className="" name="file" id="file" aria-label="File browser example" onChange={this.onFileChange} />
                                            <span className="file-custom">{this.state.selectedFile.name}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control name="comment" type="text" placeholder="Enter Comment" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Group controlId="termsOfUseAccept">
                                        <Form.Check style={{ float: 'left' }} required name="termsOfUseAccept" type="checkbox" />
                                        <Form.Label style={{display: 'inherit'}}>You have agreed to the <a href='/terms-of-use'> terms </a> of the Discover Pakistan.</Form.Label>
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group className="text-center">
                                <button className="btn sign-in-btn sub-app" type="submit" style={{width: '50%'}}>
                                    Submit Application
                                </button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn" onClick={() => { this.modalOpenClose(false) }} data-toggle="modal" data-target="#authModal">Close</button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(JobModal);
