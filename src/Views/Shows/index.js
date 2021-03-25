import React from 'react'
import Api from '../../Api/Api.js';
import { URI } from '../../Api/index.js';
import { isNullRetNull, splitArrayIntoChunks } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import { Link } from 'react-router-dom';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Shows extends React.Component {
    state = {
      shows:[]
    }
    
    componentWillMount(){
      this.getShows()
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    getShows(){
      this.setStateObj({ loader: true });
      let payload = {
          uri:URI.GET_SHOWS_DETAIL,
          method:'post',
          data:{ 
            user_id: isNullRetNull(this.props.userData.user_id, 'false'),
          }
      }
      Api(payload)
          .then((res)=>{
              if(res.data.message === "success"){
                  this.setStateObj({ loader: false, shows:res.data.data })
              }else{
                  this.setStateObj({ loader: false })
              }
          })
          .catch((err)=>{
              this.setStateObj({ loader: false });
              alert("Unkown Error ", err)
          })
      }

   render(){
     const { loader, shows } = this.state;

      return(<>
        <HeaderSearch />
        <LivePlayer />
        <SubHeader />
        <Loader isLoader={loader}/>
        {
          shows.length > 0 &&
          <div className="row show-card-title-row">
            <div className="green-dot"/>
            <h5 className="show-h5-tag">Shows</h5>
          </div>
        }
        {
          splitArrayIntoChunks(shows, 2).map((row, i)=>{
            return(
              <div key={i} className="row show-body">
                {
                  row.map((item, j)=>{
                    return(
                    <Link to="Shows" key={i+'_'+j}>
                      <div className="col-sm-12 card-btn">
                      <div className="row card-detail-div">
                        <img src={item.img} className="card-img" alt="?"/>
                        <div className="descriptions">
                          <h6 className="text-left m-0 mt-1">{item.name}</h6>
                          <p className="text-left p-0 m-0">{item.time}</p>
                          <p className="text-left p-0 m-0"><strong>Repeat:</strong> {item.repeat}</p>
                        </div>
                      </div>
                      </div>
                    </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Shows);