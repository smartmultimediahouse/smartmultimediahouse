import React from 'react';
import Home from './Views/Home/index';
import Shows from './Views/Shows/index';
import Category from './Views/Category/index';
import WatchVideo from './Views/WatchVideo/index';
import Advertise from './Views/Advertise/index';
import Pakistan from './Views/Pakistan/index';
import TouristCommunity from './Views/TouristCommunity/index';
import SingleCommunity from './Views/SingleCommunity/index';
import ContactUs from './Views/ContactUs/index';
import Disclaimer from './Views/Disclaimer/index';
import PrivacyPolicy from './Views/PrivacyPolicy/index';
import TermsOfUse from './Views/TermsOfUse/index';
import Career from './Views/Career/index';
import Partners from './Views/Partners/index';
import BecomeContributor from './Views/BecomeContributor/Main/index';
import UserProfile from './Views/UserProfile/index';

import DiscoverShop from './Views/Shop/Main/index';
import ViewProduct from './Views/Shop/ViewProduct/index';
import ViewFullBag from './Views/Shop/ViewBag/index';

import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Components/Header';
// import HeaderSearch from './Components/HeaderSearch';
import Footer from './Components/Footer';

import SlideDrawer from './SlideDrawer/SlideDrawer.js'
import Backdrop from './SlideDrawer/Backdrop.js'

import './index.css'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './Redux/Actions/userActions';
import { isObjEmpty } from './utils';

class RoutesComponent extends React.Component {
  state = {
    drawerOpen: false,
    pathName: window.location.pathname
  }

  drawerToggleClickHandler = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  render() {
    let backdrop;
    if (this.state.drawerOpen) {
      backdrop = <Backdrop drawerBtn={this.drawerToggleClickHandler} />;
    }
    const {
      userData
    } = this.props
    return (
      <div>
        <SlideDrawer drawerBtn={this.drawerToggleClickHandler} show={this.state.drawerOpen} onClose={this.drawerToggleClickHandler} />
        { backdrop}

        <div className="sticky-header">
          <Header />
          {/* <HeaderSearch /> */}
        </div>

        <div className="div-body">
          <div className="body-inner-div">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/"><Redirect to="/" /></Route>
              <Route exact path="/shows" component={Shows} />
              <Route exact path="/category" component={Category} />
              <Route exact path="/watch-video/:name" component={WatchVideo} />
              <Route exact path="/advertise" component={Advertise} />
              <Route exact path="/pakistan" component={Pakistan} />
              <Route exact path="/tourist-community" component={TouristCommunity} />
              <Route exact path="/single-community/:id/:name" component={SingleCommunity} />
              <Route exact path="/contact-us" component={ContactUs} />
              <Route exact path="/disclaimer" component={Disclaimer} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/career" component={Career} />
              <Route exact path="/terms-Of-use" component={TermsOfUse} />
              <Route exact path="/view-full-bag" component={ViewFullBag} />
              <Route exact path="/partners" component={Partners} />
              <Route exact path="/become-contributor" component={BecomeContributor} />
              <Route exact path="/discover-shop" component={DiscoverShop} />
              <Route exact path="/view-product" component={ViewProduct} />
              <Route exact path="/user-profile">
                {isObjEmpty(userData) ? <Redirect to="/" /> : <UserProfile />}
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

export const Routes = connect(mapStateToProps, mapDispatchToProps)(RoutesComponent)
