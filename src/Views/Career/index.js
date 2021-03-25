import React from 'react'
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import { CareerBanner } from '../../constant/images.js';
import Api from '../../Api/Api';
import { URI } from '../../Api';
import HeaderSearch from '../../Components/HeaderSearch/index.js';
import JobModal from './JobModal';

class Career extends React.Component {
  state = {
    jobs: [],
    noJob: '',
    
  }

  componentWillMount() {
    this.getJobs();
  }

  setStateObj(obj) {
    this.setState({ ...this.state, ...obj })
  }

  getJobs = () => {
    let payload = {
      uri: URI.JOBS_LIST,
      method: 'post',
      data: {}
    }
    Api(payload)
      .then((res) => {
        console.log(res)
        if (res.data.data.length > 0) {
          this.setStateObj({ jobs: res.data.data });
        } else {
          this.setStateObj({ noJob: '0 Jobs are available Sorry.' });
        }
      })
      .catch((err) => {
        console.log(err)
        alert("Unkown Error : " + err)
      })
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

  render() {
    const { loader, jobs } = this.state;

    return (<>
      {/*<HeaderSearch /> */}
      <LivePlayer banner={CareerBanner} />
      <SubHeader />
      <div className="col-12 pl-1 mt-3">
        <p className="title01 mt-1">Open Jobs</p>
      </div>
      <Loader isLoader={loader} />
      <div className="row mt-5">
        {jobs.map((x, index) => {
          return (
            <div key={index.toString()} className="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-5">
              <div className="main main-raised">
                <div className="profile-content">
                  <div className="container">
                    <div className="row">
                      <div className="col-4 m-auto">
                        <div className="profile">
                          <div className="avatar">
                            <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg" className="img-raised rounded-circle img-fluid" alt="job" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="title">{x.name}</h3>
                    <div className="description text-center">
                      <p>{x.description}</p>
                    </div>
                    <JobModal job={x.name} />
                  </div>
                </div>
              </div>
            </div>

          );
        })
        }
      </div>
      <Notify {...this.props} />
    </>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Career);