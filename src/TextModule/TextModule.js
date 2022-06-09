import React, { useState, useEffect } from "react";
import GeneratedImage from "../GeneratedImage/GeneratedImage";
import ModalComponent from "../ModalComponent/ModalComponent";
import "./TextModule.css";
import axios from "axios";
import SuccessAnimation from "../ImageModule/SuccessAnimation";

export default function TextModule(props) {
  // const [text, setText] = useState("");
  const [numWords, setNumWords] = useState(0);
  const [numSentences, setNumSentences] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [restart, setRestart] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComponent = () => {
    setShowModal(!showModal);
  };

  const getImages = (text) => {
    let imgs = [];
    // .post("https://imagination-api.herokuapp.com/imagination", {
    //   story: props.text,
    // })

    axios
      .post("https://imagination-api.moonsv.net/imagination", {
        story: props.text,
      })
      .then(function (response) {
        console.log(response.data);
        props.setData(response.data.result);
        for (
          let index = 0;
          index < response.data.result["url_images"].length;
          index++
        ) {
          const element = (
            <GeneratedImage
              number={index + 1}
              text={props.text.split(".")[index]}
              img={response.data.result["url_images"][index].toString()}
            />
          );
          imgs.push(element);
          setShowModal(false);
          setSuccess(true);

          setTimeout(() => {
            setShowModal(false);
            setSuccess(false);
          }, 2000);

          setRestart(true);
        }
        props.setImages(imgs);
      })
      .catch(function (error) {
        setShowModal(false);
        console.log(error);
      });
  };
  const submitText = (e) => {
    e.preventDefault();

    if (numWords > 200) {
      setError("El texto no puede tener más de 200 palabras.");
      alert("El texto no puede tener más de 200 palabras.");
    } else if (numWords < 2) {
      setError("El texto no puede tener menos de 2 palabras.");
    } else if (numSentences > 5) {
      setError("El texto no puede tener mas de 5 oraciones.");
      alert("El texto no puede tener mas de 5 oraciones.");
    } else if (numSentences === 0) {
      setError("El texto tiene que tener al menos 1 oración.");
    } else {
      handleComponent();
      setTimeout(() => {
        getImages(props.text);
      }, 0);

      setError("");
      // const mock = setInterval(() => {
      //   clearInterval(mock);
      // }, 1000);
    }
  };

  const test = () => {
    if (numWords > 200) {
      setError("El texto no puede tener más de 200 palabras.");
      alert("El texto no puede tener más de 200 palabras.");
    } else if (numSentences > 5) {
      setError("El texto no puede tener mas de 5 oraciones.");
      alert("El texto no puede tener mas de 5 oraciones.");
    }
  };
  const calculateNumberWords = (text) => {
    test();
    let tempText = text;
    //Remove unwanted spaces
    tempText = tempText.replace(/\./g, " ");

    tempText = tempText.replace(/\s+/g, " ");

    //last array is blank space
    let numWordsTemp =
      tempText.length > 0 && tempText !== " "
        ? tempText.split(" ").filter((res) => res !== "").length
        : 0;

    return numWordsTemp;
  };

  const calculateNumberSentences = (text) => {
    let tempText = text;
    //Remove unwanted periods
    tempText = tempText.replace(/\s+/g, "");
    //last array is blank space
    let numWordsTemp =
      tempText.length > 0 && tempText !== " "
        ? tempText.split(".").filter((res) => res !== "").length
        : 0;

    return numWordsTemp;
  };

  const handleChange = (e) => {
    props.setText(e.target.value);
    //Calculate number of words
    setNumWords(calculateNumberWords(e.target.value));
    setNumSentences(calculateNumberSentences(e.target.value));
  };

  return (
    <>
      <div>
        <form className="text-module" onSubmit={submitText}>
          <textarea
            value={props.text}
            onChange={handleChange}
            className="textArea"
            placeholder="Escribe una historia!"
          ></textarea>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              padding: "0 30px",
            }}
          >
            <p className="num-words">{numSentences}/5 Oraciones</p>
            <p className="num-words">{numWords}/200 Palabras</p>
          </div>
          <p className="error-text">{error}</p>

          <input
            type="submit"
            value="Generar Imagenes"
            className="generateButton"
          />
        </form>
      </div>
      <ModalComponent
        loader={true}
        handleComponent={handleComponent}
        showModal={showModal || success}
      >
        {success ? (
          <div className="loader-container">
            {" "}
            <SuccessAnimation showSuc={true} />
          </div>
        ) : (
          <div className="loader-container">
            <p
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "rgb(0, 32, 75)",
              }}
            >
              Generando imágenes...
            </p>
            <div className="loader"></div>
          </div>
        )}
      </ModalComponent>
    </>
  );
}
