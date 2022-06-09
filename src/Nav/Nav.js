import React, { useState } from "react";
import "./Nav.css";
import ModalComponent from "../ModalComponent/ModalComponent";
import HelpComponent from "../HelpComponent/HelpComponent";

export default function Nav() {
  const [showModal, setShowModal] = useState(false);

  const handleComponent = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="nav-container">
        <div className="nav-upc"></div>
        <h1 className="nav-title">Imagination</h1>
        <div className="instructions-icon">
          <div onClick={handleComponent} style={{ cursor: "pointer" }}>
            Ayuda
          </div>
        </div>
      </div>

      <ModalComponent
        loader={false}
        handleComponent={handleComponent}
        showModal={showModal}
      >
        <HelpComponent handleComponent={handleComponent}></HelpComponent>
      </ModalComponent>
    </>
  );
}
