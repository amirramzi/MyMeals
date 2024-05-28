import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// where to portal
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
