import React from 'react'
import Api from '../../Api/Api.js';
import { URI } from '../../Api/index.js';
import { isNullRetNull, splitArrayIntoChunks } from '../../utils/index.js';
import Loader from '../../Components/Loader/index.js';
import './styles.css';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions.js';
import LivePlayer from '../../Components/LivePlayer/index.js';
import SubHeader from '../../Components/SubHeader/index.js';
import Notify from '../../Components/Notify/index.js';
import HeaderSearch from '../../Components/HeaderSearch/index.js';

class Home extends React.Component {
    state = {}
    
    componentWillMount(){
      this.getCategories()
    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    getCategories(){
      this.setStateObj({ loader: true });
      let payload = {
        uri:URI.CATEGORIES,
        method:'post',
        data:{
          // user_id: isNullRetNull(this.props.userData.user_id, 'false'),
        }
      }
      Api(payload)
        .then((res)=>{
          if(res.data.message === "success"){
              this.setStateObj({ loader: false, categories:res.data.data })
              this.props.setCategory(res.data.data)
          }
        })
        .catch((err)=>{
            // console.log(err)
            this.setStateObj({ loader: false });
            alert("Unkown Error : "+ err)
        })
    }

    getCategoryDetails(slug, category){
      this.setStateObj({ loader: true });
      const { userData } = this.props;
      let payload = {
          uri:`${URI.VIDEO_BY_SLUG}?slug=${slug}${(userData ? `&user_id=${userData.user_id}` : '')}`,
          method:'get',
          data:{
            user_id: isNullRetNull(this.props.userData.user_id, 'false'),
          }
      }
      Api(payload)
        .then((res)=>{
          this.setStateObj({ loader: false });
          if(res.data.message === 'success'){
              if(res.data.data.length > 0){
                this.props.setCatDetails(res.data.data)
                this.props.history.push("Category", { category: category })
              }else{
                alert("No data found!")
              }
          }else{
            alert("No data found!")
          }
        })
        .catch((err)=>{
          this.setStateObj({ loader: false });
          alert("Unkown Error \n"+ err)
        })
    }

    render(){
      const { loader } = this.state;
      const { getCategories } = this.props;

      return(<>
       { <HeaderSearch /> }
        <LivePlayer />
        <SubHeader />
        <Loader isLoader={loader}/>
        {
          splitArrayIntoChunks(getCategories,2).map((row, i)=>{
            return(
              <div key={i} className="row home-body m-0 p-0">
                {
                  row.map((item, j)=>{
                    return(
                    <button
                      type="button"
                      key={i+'_'+j}
                      className="col-md-6 col-sm-12 cat-btn mt-2"
                      onClick={()=>{
                        this.getCategoryDetails(item.slug, item)
                      }}>
                      <div className="row home-cat-title-row">
                        <div className="mr-1 green-dot"/>
                        <h5 className="home-h5-tag">{item.video_type}</h5>
                      </div>
                      <div className="row cat-detail-div">
                        <img className="cat-img" src={item.img} alt={item.video_type_desc} />
                        {/* <img src=  alt="?"/> */}
                        <div className="descriptions">
                          <h6 className="text-left m-0">{item.video_type}</h6>
                          <p className="text-left p-0 m-0">{item.video_type_desc}</p>
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
        <Notify { ...this.props }/>
      </>)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);