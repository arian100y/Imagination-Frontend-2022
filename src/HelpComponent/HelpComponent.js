import React from "react";
import "./HelpComponent.css";

export default function HelpComponent(props) {
  return (
    <div className="help-container">
      <div className="help-img"></div>
      <div className="help-description">
        <p className="help-title">Instrucciones</p>
        <p>
          Esta aplicación permite visualizar imagenes generadas que describen un
          texto de entrada. Para poder visualizar estas imagenes, debes escribir
          una historia de hasta 5 oraciones y hasta 200 palabras. Luego debes
          darle click a GENERAR IMAGENES y esperar los resultados .
        </p>
        <button className="help-button" onClick={props.handleComponent}>
          Listo!
        </button>
      </div>
    </div>
  );
}
  