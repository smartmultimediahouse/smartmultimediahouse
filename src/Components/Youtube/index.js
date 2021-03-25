import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../Redux/Actions/userActions';
// import ReactPlayer from 'react-player';
import './styles.css'
import { getUrl } from '../../utils';

class Youtube extends Component {
    state = {

    }

    componentWillMount(){
        // console.log(ReactPlayer)
    }
    render(){
        const { url, className } = this.props
        return (<>
            <div className={`youtube-player-div-main ${className}`}>
            <iframe title="youtube" src={getUrl(url)} className="video-iframe-youtube"/>
                {/* <ReactPlayer
                    url={url}
                    controls
                    playbackRate = {2}
                    className='react-player'
                    width="100%"
                    height="100%"
                    /> */}
            </div>
        </>)
    }   
}

export default connect(mapStateToProps)(Youtube)