import React from 'react'
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import SubHeader from '../../Components/SubHeader/index.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import { Bg01Banner } from './../../constant/images';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Advertise extends React.Component {
    state = {}

    setStateObj(obj) {
        this.setState({ ...this.state, ...obj })
    }

    render() {
        return (<>
            <HeaderSearch />
            <LivePlayer banner={Bg01Banner}/>
            <SubHeader />
            <section className="bg-advertise mt-4">
                <div className="cont_ mb-4">
                    <div className="row">
                        <div className="col-lg-6 col-12" style={{ margin:"0 auto" }}>
                            <div className="card card-advertise col-lg-12 col-md-9 col-12 m-auto py-4">
                                <div className="col-md-12 text-left">
                                    <h2 className="text-center">Adevtise With Us!!</h2>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-justify" style={{fontSize: "16px", color: "#555", lineHeight: "25px"}}>
                                        Lokvirsa Sales connects this house of beloved brands to the world, offering limitless possibilities and solutions rooted in imagination.
                                        For more information on how to partner and advertise with Discover Pakistan Sales, please contact us at
                                    </p>
                                    <center className="mt-4">
                                        <a href="mailto:info@discoverpakistan.tv" style={{fontWeight: 500, fontSize:"20px"}}>
                                            info@lokvirsa.tv
                                        </a>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Notify {...this.props} />
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Advertise);