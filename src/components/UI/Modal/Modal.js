import React from 'react'
import classes from "./Modal.module.css"
import ReactDom from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop}></div>
};

const ModalOverLay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById("overlays")

const Modal = props => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop />, portalElement)}
            {ReactDom.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
        </>
    )
}

export default Modal