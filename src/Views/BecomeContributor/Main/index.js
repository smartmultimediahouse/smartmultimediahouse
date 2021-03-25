import React from 'react';
import './styles.css';
import Dropzone from 'react-dropzone'
import { apiFileUpload } from '../../../Api/Api.js';
import { connect } from 'react-redux';
import { URI } from '../../../Api/index.js';
import { isObjEmpty } from '../../../utils';
import { Modal, Button, Jumbotron, Container, Row, Col } from "react-bootstrap";
import { mapDispatchToProps, mapStateToProps } from './../../../Redux/Actions/userActions.js';
import SubHeader from '../../../Components/SubHeader/index.js';
import Notify from '../../../Components/Notify/index.js';
import HeaderSearch from '../../../Components/HeaderSearch/index.js';

class BecomeContributor extends React.Component {
  state = {
    UploadModalOpen: false,
    file: [],
    fileUploadSuccess: "",
    showSuccess: false,
    uploadInfoModal: true
  }
  componentWillMount() {
  }

  openModal = () => this.setStateObj({ UploadModalOpen: true });
  closeModal = () => this.setStateObj({ UploadModalOpen: false });

  closeUploadInfoModal = () => {
    this.setStateObj({ uploadInfoModal: false })
  }

  onDrop = (acceptedFiles) => {
    var file = this.state.file;
    acceptedFiles.forEach((x, index) => {
      file.push(x);
    });

    this.setStateObj({ file: file })
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj })
  }

  uploadModalOpen = () => {
    const { userData, setAuthModal } = this.props;
    if(isObjEmpty(userData)){
      setAuthModal(true);
    } else {
      this.openModal();
    }
  }


  removeItem(index) {
    this.state.file.splice(index, 1);
    this.setState({ file: this.state.file })
  }



  UploadMedia = () => {
    const { userData, setNotify } = this.props;
    this.setStateObj({ loader: true });
    var formData = new FormData();
    formData.append('user_id', userData.user_id);
    this.state.file.forEach((x) => {
      formData.append('file[]', x);
    });
    apiFileUpload(
      URI.UPLOAD_CONTRIBUTOR,
      formData,
      result => {
        if (result.message === 'success') {
          this.setStateObj({ fileUploadSuccess: "Your contribution has been successfully uploaded", showSuccess: true, file: [] });
          setNotify({ isShow: true, msg: result.data })
          this.setStateObj({ loader: false });
        } else {
          alert('something went wrong');
        }
      },
      error => {
        alert(error);
      }
    )
  }

  render() {
    const { userData } = this.props;
    return (<>
      <HeaderSearch />
      <SubHeader />
      <div className="bc-main-div">
        <div className="bc-bg-image-div">
          <div className="col-lg-6 col-12 m-auto">
            <div className="card card-advertise col-lg-10 col-md-9 col-12 m-auto py-4">
              <div className="col-md-12 text-left">
                <h2>Welcome to the community!</h2>
                <h2 className="pt-1">We can't wait to see your best work.</h2>
              </div>
              <div className="card-body">
                <p className="card-text text-left" style={{ fontSize: 16, color: "#555" }}>
                  Ready to get started? Start uploading your images
                  (photos, vectors or illustrations) or video clips.
                </p>
                <p className="mt-4">
                  <u>
                    <a href="/Become-Contributor#" style={{ color: "#4f310b", fontWeight: 500 }}>
                      Learn how to submit videos
                    </a>
                  </u>
                </p>
                <div className="mt-5">
                  <div className="col-lg-12 upload-btn-wrapper">
                    <div onClick={this.uploadModalOpen} className="btn" style={{ fontWeight: 500 }}>UPLOAD HERE</div>
                  </div>
                </div>
                <div>
                  <p className="mt-5 text-center">
                    <a href="/" style={{ color: "#4f310b", fontWeight: 500 }}>
                      Go to Home Page
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" show={this.state.UploadModalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          {!isObjEmpty(userData) &&
            <Modal.Title>Upload your content</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          {!isObjEmpty(userData) &&
            <React.Fragment>
              <Jumbotron fluid style={{ backgroundColor: '#4f310b', padding: '2rem 1rem' }}>
                <Container>
                  <Row className="justify-content-md-center">
                    <p>
                      Uploading Vectors? Now, simply upload your EPS files. No JPEG required.
                    </p>
                    <p>
                      <sub>
                        JPEG previews are automatically generated for your EPS files. You no longer need to upload a JPEG with each vector.
                      </sub>
                    </p>
                  </Row>
                </Container>
              </Jumbotron>
              <div className="text-center mt-5">
                <Dropzone
                  onDrop={this.onDrop}
                  accept="image/*, application/postscript, video/mp4"
                  multiple
                >
                  {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <div className="mb-2 p-5" {...getRootProps()} style={{ border: '1px solid black', paddingLeft: '0 !important', paddingRight: '0 !important' }}>
                      <input {...getInputProps()} />
                      {!isDragActive &&
                        <React.Fragment>
                          <p className="mb-0">Drag and Drop our files here or <button style={{ backgroundColor: '#19b24b', borderColor: '#19b24b', color: '#fff' }}>Select Here</button></p>
                          <sub>
                            (.eps files or jpeg files that are at least 4.0 megapixels)
                          </sub>
                        </React.Fragment>
                      }
                      {isDragActive && !isDragReject && "Drop it like it's hot!"}
                      {isDragReject && "File type not accepted, sorry!"}

                    </div>
                  )}
                </Dropzone>
                <Row className="m-3">
                  {this.state.file.length > 0 && this.state.file.map((x, key) => {
                    return (
                      <React.Fragment key={key.toString()}>
                        {(x.type.split('/')[0] === 'image') &&
                          <Col xs="auto">
                            <img key={key} alt={x.name} src={URL.createObjectURL(x)} width="100" />
                            <div className="remove-file-btn" onClick={() => { this.removeItem(key); console.log(key) }}><p style={{ color: 'red' }}>Remove</p></div>
                          </Col>
                        }
                        {x.type === 'application/postscript' &&
                          <Col xs="auto">
                            <p key={key}>{x.name}</p>
                            <div className="remove-file-btn" onClick={() => { this.removeItem(key) }}><p style={{ color: 'red' }}>Remove</p></div>
                          </Col>
                        }
                      </React.Fragment>
                    )
                  })}
                </Row>
                <button className="float-right" onClick={this.UploadMedia} style={{ fontWeight: 500, backgroundColor: '#19b24b', borderColor: '#19b24b', color: '#fff' }}>UPLOAD</button>
                {this.state.showSuccess &&
                  <p>{this.state.fileUploadSuccess}</p>
                }
              </div>
            </React.Fragment>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeModal()} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>




      <Modal animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.uploadInfoModal} onHide={this.closeUploadInfoModal}>

        <Modal.Body>
          <h6 style={{ color: "#4f310b" }}>We can't wait to see your best work</h6>
          <p style={{ color: "#4f310b" }}>First, upload images and video that you have created. Then add details and submit your work for review.</p>
          <div className="pl-4 mb-2" style={{ color: "#4f310b" }}>
            <h6 className="mb-0">Photos or illustrations</h6>
            <p className="mb-0">Upload JPEG files that are at least 4 megapixels.</p>
          </div>
          <div className="pl-4 mb-2" style={{ color: "#4f310b" }}>
            <h6 className="mb-0">Videos</h6>
            <p className="mb-0">Upload video files using FTP.</p>
            {/* <a style={{ color: "#4f310b" }} href="/Become-Contributor#">Learn more</a> */}
          </div>
          <div className="pl-4 mb-2" style={{ color: "#4f310b" }}>
            <h6 className="mb-0">Vectors</h6>
            <p className="mb-0">Upload EPS files compatible with illustrator version 8 or 10.</p>
            {/* <a style={{ color: "#19b24b" }} href="/Become-Contributor#">Learn more</a> */}
          </div>
          <h6 style={{ color: "#4f310b" }}>Content with people or private property</h6>
          <a style={{ color: "#4f310b" }} href="/Become-Contributor#">Learn about permission and releases</a>
          <h6 style={{ color: "#4f310b" }}>Learn about common rejection reasons</h6>
          <a style={{ color: "#4f310b" }} href="/Become-Contributor#">Focus | Exposure | Pixelation | Trademarks</a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeUploadInfoModal()} variant="secondary">Got It</Button>
        </Modal.Footer>
      </Modal>
      <Notify {...this.props} />
    </>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BecomeContributor);