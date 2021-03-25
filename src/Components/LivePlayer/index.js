import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../Redux/Actions/userActions';
import videojs from 'video.js'
import './styles.css';
import 'video.js/dist/video-js.css';
require('videojs-contrib-quality-levels');
require('videojs-max-quality-selector');
class LivePlayer extends Component {
    state = {

    }
    componentDidMount() {
        // instantiate Video.js
        const { banner } = this.props;
        if(!banner){
            this.player = videojs(this.videoNode, { ...this.props,
                html5: {
                  hls: {
                    overrideNative: true
                  }
                },
                responsive: true,
                controls: true,
                autoplay: "muted",
                preload: "auto"
            },
                function onPlayerReady() {
                // console.log('onPlayerReady', this)
            });
            this.player.maxQualitySelector();
        }
        
    }
    render() {
        const { banner } = this.props;
        return (<>
            { banner &&
                <div className="live-player-div-main">
                    <div className="live-player-inner-div">
                        <img src={banner} alt="Banner" />
                    </div>
                </div>
            }
            { banner === undefined &&
                <div className="live-player-div-main video-player-live">
                    <div className="live-player-inner-div video-player-live">
                        <video muted="muted" ref={ node => this.videoNode = node } id="my-player" className="video-js" style={{ height: '100%', width: '100%' }}>
                            <source src="http://45.77.38.149:8080/hls/livestream.m3u8" type="application/x-mpegURL" />
                            {/* <source src="https://vjs.zencdn.net/v/oceans.webm" type="video/webm" /> */}
                        </video>
                        {/* {
                            videojs('my-player', {
                                autoplay: 'muted'
                              })
                        } */}
                                {/* <ReactPlayer 
                            url='https://livecdn.live247stream.com/discoverpakistan/web/playlist.m3u8'
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="100%"
                            config={{
                                vidmeConfig: `240p`
                            }}
                            /> */}
                                {/* <ReactHlsPlayer
                            url='https://livecdn.live247stream.com/discoverpakistan/web/playlist.m3u8'
                            autoplay={true}
                            controls={true}
                            width="100%"
                            height="100%"
                            hlsConfig={
                                {  file: { 
                                    forceHLS: true,
                                    forceVideo: true,
                                    hlsVersion: '0.12.4',
                                    attributes: {
                                    //   poster: feed && feed.actionUrl && feed.actionUrl.image,
                                      disablePictureInPicture: true
                                    }
                                  }
                            }
                            }
                        /> */}
                                {/* <video id="my-player" controls className="live-player vjs-default-skin video-js " controls preload="auto" >
                        <source type="application/x-mpegURL" src="https://livecdn.live247stream.com/discoverpakistan/web/playlist.m3u8" />
                    </video> */}
                    </div>
                </div>
            }
        </>)
    }
}
export default connect(mapStateToProps)(LivePlayer)