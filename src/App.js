import React from 'react'
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './Redux/Actions/userActions.js';
// import Home from './Views/Home/index.js'


import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes'; // where we are going to specify our routes

class App extends React.Component {
   state={}
   render(){
    //  console.log(this.props)
      return(<>
        {/* <Home /> */}
        <Router>
          <Routes />
        </Router>
      </>)  
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);