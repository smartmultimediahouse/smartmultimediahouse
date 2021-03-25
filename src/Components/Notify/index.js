import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { mapDispatchToProps, mapStateToProps } from '../../Redux/Actions/userActions';
import { WarningIcon } from '../../constant/svg';
import { Modal } from 'react-bootstrap';
import { isNullRetNull } from '../../utils';
 
class Notify extends Component {

    render(){
        const { notify, setNotify } = this.props;
        const { isShow, title, msg } = notify;
        return (<>
        <Modal animation={false} show={isShow} onHide={()=>{ setNotify() }}>
            <Modal.Body>
                <div className="row m-0 p-0 mt-3 notify-modal-logo-div">
                    <WarningIcon height="8vw" width="8vw" fill="#f8bb86"/>
                </div>

                <div className="row m-0 p-0 notify-modal-logo-div-01">
                    <h2 className="m-0 p-0">{isNullRetNull(title, "Warning")}</h2>
                </div>
                <div className="row m-0 p-0 notify-modal-logo-div-01">
                    <h6 className="m-0 p-0">{isNullRetNull(msg,'')}</h6>
                </div>
                <div className="row m-0 p-0 mb-3 notify-row">
                    <button type="button" onClick={()=>{ setNotify() }} className="btn notify-btn">
                        <h5 className="m-0 p-0">Ok</h5>
                    </button>
                </div>
            </Modal.Body>
        </Modal>

        </>)
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify)