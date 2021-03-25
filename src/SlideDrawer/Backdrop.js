import React from 'react'
import './Backdrop.css'
export default class Backdrop extends React.Component {
  render(){
    const { drawerBtn } = this.props
    return(
      <button className="backdrop" onClick={drawerBtn} />
    )
  }
}