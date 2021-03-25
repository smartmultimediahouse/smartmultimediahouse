import React from 'react';
import './SlideDrawer.css';
import {
    showHeader,
    discover_shop,
    partner,
    advertise,
    pakistan,
    itrip,
    tourist_community,
    contributor,
    contactuspng,
    sideBarLogo
} from '../constant/images';
import { Link } from 'react-router-dom';

export default class SlideDrawer extends React.Component {

    state = {
        list: [
            { name: "Shows", link: "/shows", img: showHeader },
            { name: "Discover Shop", link: "/discover-shop", img: discover_shop },
            { name: "Partners", link: "/partners", img: partner },
            { name: "Advertise", link: "/advertise", img: advertise },
            { name: "Pakistan", link: "/pakistan", img: pakistan },
            { name: "iTrip", link: "https://itrip.pk/", isLink: true, img: itrip },
            { name: "Tourist Community", link: "/tourist-community", img: tourist_community },
            { name: "Become Contributor", link: "/become-contributor", img: contributor },
            { name: "Contact Us", link: "/contact-us", img: contactuspng },
        ]
    }

    setSelected(lang) {
        this.setState({ selectedLang: lang })
    }

    // closeMenu() {
    //     var element = document.getElementById("mobile-nav-slider");
    //     if (typeof (element) != 'undefined' && element != null) {
    //         document.getElementById("mobile-nav-slider").classList.remove("open");
    //         console.log(document.getElementById("mobile-nav-slider").nextElementSibling)
    //         // document.getElementById("mobile-nav-slider").nextElementSibling.remove();
    //     }
    // }

    render() {
        const { list } = this.state;
        const { drawerBtn } = this.props;
        let drawerClasses = 'side-drawer';
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }

        return (
            // <div className={drawerClasses}>
            //     <Row>
            //         <Col sm={12} className="drawer-sub-col">
            //             <img src={engLogo} className="drawer-logo" alt="logo" />
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col sm={12}>
            //             {
            //                 list.map((nav, i) => {
            //                     return (
            //                         <div key={i} className="h5-div" style={{ marginLeft: "2em" }}>
            //                             { nav.isLink ?
            //                                 <a href={nav.link} className="sub-header-link">
            //                                     <h5 className="h5">{nav.name}</h5>
            //                                 </a>
            //                                 :
            // <Link to={nav.link} className="sub-header-link">
            //     <h5 className="h5">{nav.name}</h5>
            // </Link>
            //                             }
            //                         </div>
            //                     )
            //                 })
            //             }
            //         </Col>
            //     </Row>
            // </div>
            <div id="mobile-nav-slider" className={drawerClasses}>
                <div id="mobile-nav">
                    <ul className="nav-menu">
                        <li onClick={drawerBtn} style={{ height: "auto" }}>
                            <a href='/'>
                                <img src={sideBarLogo} alt="" style={{ height: 50 }} />
                            </a>
                        </li>
                        {
                            list.map((nav, i) => {
                                return (
                                    <li key={i} className="btm-menu mt-4 mb-3">
                                        { nav.isLink ?
                                            <a onClick={drawerBtn} href={nav.link} className="sub-header-link">
                                                <span style={{ marginRight: 10 }}>
                                                    <img src={nav.img} height="20" width="20" style={{ marginTop: -1 }} alt={nav.name} />
                                                </span>{nav.name}</a>
                                            :
                                            <Link onClick={drawerBtn} to={nav.link} className="sub-header-link">
                                                <span style={{ marginRight: 10 }}>
                                                    <img src={nav.img} height="20" width="20" style={{ marginTop: -1 }} alt={nav.name} />
                                                </span>{nav.name}
                                            </Link>
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="row justify-content-center" style={{ position: 'absolute', width: '100%', left: 12, bottom: 0 }}>
                    <div className="col col-auto">
                        <p style={{ fontSize: 12 }}>Powered by <a href="http://smartmultimediahouse.com/" target="_blank" rel="noopener noreferrer">Smart Multimedia House</a></p>
                    </div>
                </div>
            </div>
        )
    }

}