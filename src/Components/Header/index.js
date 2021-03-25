import React, { Component } from 'react';
import './styles.css';
import { GoogleStore, IosStore } from '../../constant/svg';
import { isNullRetNull, isObjEmpty } from '../../utils';
import { profile } from '../../constant/images';
import AuthModal from '../AuthModal';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { Link } from 'react-router-dom';
import { logo01 } from '../../constant/images';

class Header extends Component {
    render() {
        const { userData, setLoginStatus, setUserData, setNotify } = this.props;
        return (<>
            <div className="header-main">
                <div className="row header-inner-div">
                    
                <Link to="/"><img src={logo01} className="head-logo-01" alt="pic" /></Link>

                <div className="left-side-row">
                        <a target="_blank" rel="noopener noreferrer" href="/">LIVE</a> <span> - </span>
                        <a target="_blank" rel="noopener noreferrer" href="/">CATCH UP</a> <span> - </span>
                        <a target="_blank" rel="noopener noreferrer" href="/">SCHEDULE</a>
                        </div>
                    <div className="row right-side-row">

                     

                    
                     <div className="row store-icons-div">
                        <a target="_blank" rel="noopener noreferrer" href="#"><GoogleStore className="store-01" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="#"><IosStore className="store-01" /></a>
                    </div>

                    
                    <div className="right-side-row1">
                        <a href="/">SEARCH</a>
                    </div>

                        {
                            isObjEmpty(userData) &&
                            <AuthModal desktop={true} />
                        }
                        {
                            !isObjEmpty(userData) &&
                            
                            <div className="dropdown">
                            
                                <button className="p-0 m-0 profile-icon-btn profile-icon-btn-header" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                    <span style={{ marginRight: 5, color: 'white' }}>{userData.name}</span><img src={isNullRetNull(userData.image_url, false) ? isNullRetNull(userData.image_url, 'https://') : profile} alt="?" />
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
                </div>
            </div>
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);