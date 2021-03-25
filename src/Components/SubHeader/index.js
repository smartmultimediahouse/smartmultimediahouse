import React, { Component } from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
 
class SubHeader extends Component {
    state = {
        list:[
            { name:"HOME:", link:"/" },
            { name:"SHOWS", link:"/shows" },
            { name:"STORE", link:"/discover-shop" },
            { name:"COMMUNITY", link:"/tourist-community" },
            { name:"PARTNERS", link:"/partners" },
            { name:"CONTRIBUTOR", link:"/become-contributor" },
            { name:"ADVERTISE", link:"/advertise" },
        ]
    }

    render(){
        const { list } = this.state;
        return (<>
        
            <div className="sub-header-main">

            <div className="sub-new">      
            
            <p>Current Show Name <br/>
            Tuesday 11:30PM <br/>
            A crime drama set in Morecambe, following <br/>
            Segment Lisa bell who works for the  </p>
            
            </div>
           
                <div className="row sub-header-inner-div">
                    <div className="row sub-header-inner-div-01">
                    
                        {
                            list.map((nav, i)=>{
                                return(
                                    <div key={i} className="h5-div">
                                        { nav.isLink ?
                                            <a href={nav.link} className="sub-header-link">
                                                <h5 className="h5">{nav.name}</h5>
                                            </a>
                                            :
                                            <Link to={nav.link} className="sub-header-link">
                                                <h5 className="h5">{nav.name}</h5>
                                            </Link>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>)
    }   
}

export default SubHeader