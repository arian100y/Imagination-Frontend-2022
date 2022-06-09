import React, { useEffect } from "react";
import "./ModalComponent.css";

export default function ModalComponent(props) {
  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [props.showModal]);

  return props.showModal ? (
    <div>
      <div
        onClick={() => {
          if (!props.loader) {
            props.handleComponent();
          }
        }}
        className="modal-background"
      ></div>
      <div className="modal-container">{props.children}</div>
    </div>
  ) : null;
}
