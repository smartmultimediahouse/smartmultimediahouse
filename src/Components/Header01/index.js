import React, { Component } from 'react';
import './styles.css'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { GoogleStore, IosStore, NavIcon } from '../../constant/svg';
import { profile } from '../../constant/images';
import { isNullRetNull, isObjEmpty } from '../../utils';
import AuthModal from '../AuthModal';
import { logo01 } from '../../constant/images';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        const {
            drawerBtn,
            userData,
            setLoginStatus,
            setUserData,
            setNotify
        } = this.props
        return (<>
            <div className="header-main-01">
                <div className="header-inner-div-01 row">
                    <div className="row">
                        <button type="button" onClick={drawerBtn && drawerBtn} className="nav-button mr-2">
                            <NavIcon className="nav-icon" />
                        </button>
                        <Link to="/"><img src={logo01} className="head-logo-01" alt="pic" /></Link>
                        {
                            isObjEmpty(userData) &&
                            <AuthModal mobile={true} />
                        }
                        {
                            !isObjEmpty(userData) &&
                            <div className="dropdown" style={{ position: 'absolute', right: 12, top: 5, bottom: 0, }}>
                                <button className="p-0 m-0 profile-icon-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" style={{ backgroundColor: "transparent", border: 0 }}>
                                    <img src={isNullRetNull(userData.image_url, false) ? isNullRetNull(userData.image_url, 'https://') : profile} alt="?" />
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link style={{ marginRight: 0, textDecoration: 'none' }} to="/user-profile?tabName=profile">
                                        <button type="button" className="dropdown-item">Profile</button>
                                    </Link>
                                    <Link style={{ marginRight: 0, textDecoration: 'none' }} to="/user-profile?tabName=favorite">
                                        <button type="button" className="dropdown-item">Favorite</button>
                                    </Link>
                                    <Link style={{ marginRight: 0, textDecoration: 'none' }} to="/user-profile?tabName=watchlater">
                                        <button type="button" className="dropdown-item">Watch Later</button>
                                    </Link>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => {
                                            setLoginStatus();
                                            setUserData();
                                            setNotify({ isShow: true, msg: 'Logout Successfully!', title: 'Success' })

                                        }}>Logout</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="row store-icons-div">
                        <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.DiscoverPakistan.dp"><GoogleStore className="store-01" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/pk/app/discover-pakistan/id1543657981"><IosStore className="store-01" /></a>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);