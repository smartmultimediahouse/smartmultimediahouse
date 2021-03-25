import React from 'react'
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import { ContactUsBanner } from '../../constant/images.js';
import { MailIcon, UserIcon, CallIcon, PageIcon, ChatIcon, HomeIcon, WorldIcon } from '../../constant/svg.js';
//import HeaderSearch from '../../Components/HeaderSearch/index.js';

class ContactUs extends React.Component {
    state = {
    }
    
    componentWillMount(){
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    render(){
      const { loader } = this.state;

      return(<>
        {/*<HeaderSearch /> */}
        <LivePlayer banner={ContactUsBanner}/>
        <SubHeader />
        <Loader isLoader={loader}/>


        <div className="container mb-1" style={{ color : "#4f310b" }}>
            <div className="row">

                <div className="col-lg-6 col-md-12 style-01" >
                    <h2 className="mb-3" style={{ color : "#fff" }}>
                        Contact Details
                    </h2>
                    <div className="col-md-8 col-12 bg-white p-4">
                        <div className="row">
                            <div className="col">
                                <p>
                                <HomeIcon />  www.lokvirsa.tv
                                </p>
                                <p>
                                    <MailIcon height="14px" width="14px" fill="#333"/> info@lokvirsa.tv
                                </p>
                                <p>
                                    <CallIcon /> (012) 345 67899
                                </p>
                                <p>
                                    <WorldIcon /> Lokvirsa, UK.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6  col-md-12">
                    <h2 className="styles-02" style={{ color : "#fff" }}>
                        Get in touch with us
                    </h2>
                    <section className="checkout_area mb-0">
                        <div className="">
                            <form className="card-body row contact_form" action="https://discoverpakistan.tv/home/contact_process" method="post" id="form01">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white icon-4" id="basic-addon1">
                                            <UserIcon height="14px" width="14px"/>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control input-01" placeholder="Full Name"
                                        aria-label="Username" name="name" aria-describedby="basic-addon1"/>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white icon-4" id="basic-addon1">
                                            <MailIcon height="14px" width="14px" fill="#333"/>

                                        </span>
                                    </div>
                                    <input type="text" className="form-control input-01" 
                                        placeholder="Email" name="email" aria-label="Username" aria-describedby="basic-addon1"/>

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white icon-4" id="basic-addon1">
                                            <CallIcon />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control input-01" 
                                        placeholder="Telephone Number" aria-label="Username"
                                        aria-describedby="basic-addon1" name="phone"/>

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white icon-4" id="basic-addon1">
                                            <PageIcon />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control input-01" 
                                        placeholder="Subject" name="subject" aria-label="Username" aria-describedby="basic-addon1"/>

                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white icon-4" id="basic-addon1">
                                            <ChatIcon />
                                        </span>
                                    </div>
                                    <textarea type="text" className="form-control input-01 style-03" 

                                        placeholder="Your Message" name="message" aria-label="Username" aria-describedby="basic-addon1"/>
                                </div>
                            </form>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <button type="submit" className="btn btn-primary checkout-btn1" form="form01">
                                    SEND
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <br/>
       
      
        
        <Notify { ...this.props }/>
      </>)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);