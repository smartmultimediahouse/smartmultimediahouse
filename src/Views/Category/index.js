import React from 'react'
import { splitArrayIntoChunks } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Category extends React.Component {
    state = {
      category:this.props.history.location.state.category
    }
    
    componentWillMount(){
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    playVideo(video){
      this.props.history.push(`Watch-Video/${video.title}`, { video: video, category:this.state.category })
    }

   render(){
     const { loader, category } = this.state;
     const { getCatDetails } = this.props;
      return(<>
        <Loader isLoader={loader}/>
        <HeaderSearch />
        <LivePlayer />
        <SubHeader />
        {
          getCatDetails.length > 0 &&
          <div className="row show-card-title-row">
            <div className="green-dot"/>
            <h5 className="show-h5-tag">{category.video_type}</h5>
          </div>
        }
        {
          splitArrayIntoChunks(getCatDetails, 2).map((row, i)=>{
            return(
              <div key={i} className="row show-body">
                {
                  row.map((item, j)=>{
                    return(
                    <button
                      type="button" key={i+'_'+j}
                      className="col-md-6 col-sm-12 card-btn"
                      onClick={()=>{ this.playVideo(item) }}>
                      <div className="row card-detail-div">
                        <img src={item.img} className="card-img" alt="pic"/>
                        <div className="descriptions">
                          <h6 className="text-left pt-1 pr-2">{item.title}</h6>
                            <p className="text-left p-0 m-0 pr-2">
                              {item.description}
                            </p>
                            <p className="text-left p-0 m-0 mt-2 pr-2">{item.total_view} Views | {item.time}</p>
                        </div>
                      </div>
                    </button>
                    )
                  })
                }
              </div>
            )
          })
        }
      </>)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Category);