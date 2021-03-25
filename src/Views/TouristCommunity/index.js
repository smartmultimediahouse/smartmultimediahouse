import React from 'react'
import Api from '../../Api/Api.js';
import { Modal, Button } from "react-bootstrap";
import { URI } from '../../Api/index.js';
import { isNullRetNull, splitArrayIntoChunks } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class TouristCommunity extends React.Component {
  state = {
    selectedFile: {
      name: ""
    },
    isSuggestedCommunityModalOpen: false,
    fileUrl: ""
  }

  componentWillMount() {
    this.getCommunities()
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj })
  }

  onFileChange = event => {
    if(event.target.files.length !== 0){
      this.setStateObj({ selectedFile: event.target.files[0], fileUrl: URL.createObjectURL(event.target.files[0]) }); 
    } else {
      this.setStateObj({ selectedFile: { name: ""} });
    }
  }; 

  openModal = () => this.setStateObj({ isSuggestedCommunityModalOpen: true });
  closeModal = () => this.setStateObj({ isSuggestedCommunityModalOpen: false });
  

  getCommunities() {
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.COMMUNITIES,
      method: 'GET',
      data: {
        // user_id: isNullRetNull(this.props.userData.user_id, 'false'),
      }
    }
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({ loader: false, communities: res.data.data })
          this.props.setCommunities(res.data.data)
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error : " + err)
      })
  }

  getCategoryDetails(slug, category) {
    this.setStateObj({ loader: true });
    let payload = {
      uri: `${URI.VIDEO_BY_SLUG}?slug=${slug}`,
      method: 'get',
      data: {
        user_id: isNullRetNull(this.props.userData.user_id, 'false'),
      }
    }
    Api(payload)
      .then((res) => {
        this.setStateObj({ loader: false });
        if (res.data.message === 'success') {
          if (res.data.data.length > 0) {
            this.props.setCatDetails(res.data.data)
            this.props.history.push("Category", { category: category })
          } else {
            alert("No data found!")
          }
        } else {
          alert("No data found!")
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error \n" + err)
      })
  }

  suggestCommunity = (event) => {
    event.preventDefault();
    this.setStateObj({ loader: true });
    let payload = {
      uri: URI.SUGGEST_COMMUNITY,
      method: 'POST',
      data: {
        community: event.target.community.value,
        name: event.target.Username.value,
        image: event.target.file.files[0]
      }
    }
    Api(payload)
      .then((res) => {
        if (res.data.message === "success") {
          this.setStateObj({ loader: false, newCommunity: res.data.data });
          this.openModal();
        }
      })
      .catch((err) => {
        this.setStateObj({ loader: false });
        alert("Unkown Error : " + err);
      })
  }

  render() {
    const { loader, fileUrl } = this.state;
    const { getCommunities } = this.props;

    return (<>
      <HeaderSearch />
      <SubHeader />
      <div className="col-12 pl-1 mt-3">
        <p className="title01 mt-1">MOST ACTIVE COMMUNITIES</p>
      </div>
      <Loader isLoader={loader} />

      {
        splitArrayIntoChunks(getCommunities, 2).map((row, i) => {
          return (
            <div key={i} className="row home-body m-0 p-0">
              {
                row.map((item, j) => {
                  return (
                    <a key={j.toString()} href={`/single-community/${item.community_id}/${item.name}`} className="col-lg-6 col-md-6 col-sm-12 mb-4 community-box">
                      <div className="row">
                        <div className="col-lg-6 col -md-6 col-sm-6 p-0">
                          <img className="community-images" src={item.img} alt={item.name} style={{ width: "100%" }} />
                        </div>
                        <div className="col-lg-6 col -md-6 col-sm-6 pl-2" id="set_p">
                          <p style={{ fontWeight: "bold", textAlign: "left", color: "black", marginLeft: 0, paddingLeft: 0 }}>{item.name}</p>
                          <p className="text-left p-0 m-0">
                            Become Part
                              </p>
                        </div>
                      </div>
                    </a>
                  )
                })
              }
            </div>
          )
        })
      }
      <hr />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <h2 className="mt-4 mb-0" style={{ fontWeight: 600, textAlign: "left" }}>
            Add New Community
          </h2>
          <form onSubmit={this.suggestCommunity} className="card-body contact_form" >
            <div className="row">
              <div className="col-lg-6 pl-2">
                <div className="input-group mb-3">
                  <div className="input-group-prepend" style={{ marginRight: 0 }}>
                    <span className="input-group-text bg-white icon-4" id="basic-addon1"><i className="fa fa-user"></i></span>
                  </div>
                  <input type="text" className="form-control input-01" name="community" placeholder="Community Name" aria-label="Username" aria-describedby="basic-addon1" required />
                </div>
              </div> <div className="col-lg-6 pl-2"></div>
              <div className="col-lg-6 pl-2">
                <div className="input-group mb-3">
                  <div className="input-group-prepend" style={{ marginRight: 0 }}>
                    <span className="input-group-text bg-white icon-4" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                  </div>
                  <input type="text" className="form-control input-01" placeholder="Suggest By" name="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                </div>
              </div>
              <div className="col-lg-6 pl-2"></div>
              <div className="col-lg-6 pl-2">
                <div className="input-group">
                  <label className="file form-control">
                    <input type="file" required className="" name="file" id="file" aria-label="File browser example" onChange={this.onFileChange} />
                    <span className="file-custom">{this.state.selectedFile.name}</span>
                  </label>
                  <span className="pull-right ml-2"><button type="submit" className="btn btn-success" style={{ height: 41, lineHeight: 1, padding: "8px 20px", borderRadius: 0 }}>ADD</button></span>
                </div>
              </div>

              <div className="col-lg-6 pl-2"></div>

            </div>
          </form></div>
      </div>
      <Modal show={this.state.isSuggestedCommunityModalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Community Suggested Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            //eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img style={{ width: "100%" }} src={fileUrl} alt="Suggested Community image" />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeModal()} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
      <Notify {...this.props} />
    </>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouristCommunity);