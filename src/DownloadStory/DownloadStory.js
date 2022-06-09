import React from "react";
import "./DownloadStory.css";
import axios from "axios";

export default function DownloadStory(props) {
  const handleDownload = () => {
    let obj = {
      sentences: props.data.original_story,
      images: props.data.url_images,
    };
    console.log(obj);
    axios
      .post("https://imagination-api.herokuapp.com/createPDF", obj)
      .then((response) => {
        console.log(response.data);
        var file = new Blob([response.data], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return props.images === null ? null : (
    <div className="download-container">
      <p className="download-title">Te gustó la historia generada?</p>
      <p className="download-descargar">Descárgala como PDF y compártela!</p>
      <button onClick={handleDownload} className="download-button">
        Descargar
      </button>
    </div>
  );
}
