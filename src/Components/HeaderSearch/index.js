import React, { Component } from 'react';
import './styles.css';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { isNullRetNull } from '../../utils/index.js';
import { SearchIcon } from '../../constant/svg';
import { Form, InputGroup } from 'react-bootstrap';
import { AsyncTypeahead, } from 'react-bootstrap-typeahead';
import { URI } from '../../Api';
import Api from '../../Api/Api';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class HeaderSearch extends Component {
    state = {
        isLoading: false,
        options: []
    };

    handleSearch = (query) => {
        this.setState({
            isLoading: true
        });
        let payload = {
            uri: URI.SEARCH,
            method: 'post',
            data: {
                q: query,
                page: 1
            }
        }
        Api(payload)
            .then((res) => {
                
                if (res.data.message === 'success') {
                    this.setState({
                        isLoading: false,
                        options: res.data.movie
                    });

                } else {
                    this.setState({
                        isLoading: false,
                        options: res.data.movie
                    });
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
    };

    playVideo = (video, videoType) => {
        let videoTypeArr = videoType.split(",");
        videoTypeArr.splice(videoTypeArr.indexOf(16), 1);
        videoTypeArr = videoTypeArr[Math.floor(Math.random()*videoTypeArr.length)]
        let payload = {
            uri: URI.CATEGORIES,
            method: 'post',
            data: {}
        }
        Api(payload)
            .then((res) => {
                if (res.data.message === 'success') {
                    res.data.data.forEach((x, index) => {
                        if (x.video_type_id === videoTypeArr) {
                            Api({
                                uri: `${URI.VIDEO_BY_SLUG}?slug=${x.slug}`,
                                method: 'get',
                                data: {
                                    user_id: isNullRetNull(this.props.userData.user_id, 'false'),
                                }
                            }).then((r) => {
                                this.props.setCatDetails(r.data.data);
                                this.props.history.push(`/Watch-Video/${video.title}`, { video: video, category: x })
                                if (this.props.history.location.pathname.includes("/Watch-Video")) {
                                    window.location.reload();
                                }
                            }).catch((e) => {
                                alert("Unkown Error : " + e)
                            })
                            // this.props.history.push("Watch-Video", { video: video, category: x })
                            // if(this.props.history.location.pathname === "/Watch-Video"){
                            //     window.location.reload();
                            // }
                        }
                    })
                }
            })
            .catch((err) => {
                alert("Unkown Error : " + err)
            })
        // this.props.history.push("Category", { category: category })
        // this.props.history.push("Watch-Video", { video: video, category:this.state.category })
    }


    render() {
        const filterBy = () => true;
        const {
            options,
            isLoading
        } = this.state;
        return (<>
            <div className="header-main-02">
                <div className="header-inner-div-02 row">
                    <Form.Group>
                        <InputGroup>
                            <AsyncTypeahead
                                className="search-input search-02"
                                filterBy={filterBy}
                                id="search-products"
                                isLoading={isLoading}
                                labelKey="title"
                                minLength={3}
                                onSearch={this.handleSearch}
                                options={options}
                                placeholder="Search for a product or category"
                                renderMenuItemChildren={(option, props) => (
                                    <React.Fragment>
                                        <div onClick={() => { this.playVideo(option, option.video_type) }} className="card" style={{ width: "100%" }}>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <img className="float-left mr-2" src={option.thumbnail_url} alt={option.title} height="100" />
                                                    <div>
                                                        <p style={{ whiteSpace: "pre-wrap" }} className="m-0">Name: {option.title}</p>
                                                        <p style={{ whiteSpace: "pre-wrap" }} className="m-0 search-description">Description: {option.description}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                )}
                            />
                            <InputGroup.Append>
                                <button type="button" className="search-btn">
                                    <SearchIcon color="lightgray" className="search-icon" />
                                </button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </div>
            </div>
        </>)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearch));