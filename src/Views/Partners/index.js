import React from 'react'
import Api from '../../Api/Api.js';
import { URI } from '../../Api/index.js';
import { splitArrayIntoChunks } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import { Bg01Banner } from './../../constant/images';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Partners extends React.Component {
    state = {
      shows:[]
    }
    
    componentWillMount(){
      this.getPartnersList()
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }


    getPartnersList(){
      this.setStateObj({ loader: true });
      let payload = {
          uri:URI.GET_PARTNERS,
          method:'post',
          data:{ id:this.props.userData.user_id }
      }
      Api(payload)
        .then((res)=>{
          if(res.data.message === "success"){
              this.props.setPartnersList(res.data.data)
            }
            this.setStateObj({ loader: false })
        })
        .catch((err)=>{
            this.setStateObj({ loader: false });
            alert("Unkown Error ", err)
        })
    }

   render(){
     const { 
       loader, 
      // shows 
      } = this.state;
     const { partnersList } = this.props;
    
      return(<>
        <HeaderSearch />
        <LivePlayer banner={Bg01Banner}/>
        <SubHeader />
        <Loader isLoader={loader}/>
          <div className="row show-card-title-row">
            <div className="green-dot"/>
            <h5 className="show-h5-tag">Partners</h5>
          </div>
        {
          splitArrayIntoChunks(partnersList, 4).map((row, r)=>{
            return(
              <div key={r} className="row m-0 p-0">
                {
                  row.map((card, i)=>{  
                    return(
                      <div key={i} className="col-md-3 col-sm-3 col-xs-6 m-0 p-0 mt-2" style={{ width: "50%" }}>
                        <div className="partner-card-img-div">
                          <img src={card.img} className="partner-card-img" alt="Card"/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
        <div className="row m-0 p-0 mt-3" />
        <Notify { ...this.props }/>
      </>)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Partners);