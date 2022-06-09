import React, { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import "./ImageModule.css";
import StarRatings from "react-star-ratings";
import SuccessAnimation from "./SuccessAnimation";
import GeneratedImage from "../GeneratedImage/GeneratedImage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "..";

const stories = [
  {
    sentences: [
      "el patito era feliz",
      "un dia fue a caminar el pato",
      "El pato se perdió",
    ],
    images: [
      "https://serpapi.com/searches/6247a3ef7f836156e9f883b6/images/71de5ea6d9223e69d72067ce1220973f5ddc70686e3df2d10d9bc8189318d0f7.jpeg",
      "https://serpapi.com/searches/6247a3f1edb034f29e718748/images/dbe8e22c29c43dca0799d4dde5588871747989a3fce63cf21e24790ca188f79d.jpeg",
      "https://serpapi.com/searches/6247a3f5fdca3e7783308fb7/images/30a8c3253a3e0166645c01e31766a2d70fee326906e78e6ca8d0acc1397143f8.jpeg",
    ],
  },
  {
    sentences: ["un niño cantaba", "Se cayó el niño"],
    images: [
      "https://serpapi.com/searches/6247aaeaa74fe0ab5084cf53/images/bd4c0df7f6d5f876f7a6eb39858c4d033a00e18b45704ba079353f7cc599dd2b.jpeg",

      "https://serpapi.com/searches/6247aaee5c56060c89758ee9/images/04b07061ed8d6c31df5dc01bab0fc4036fd2b866919ff7b72dd67a21abae4d03.jpeg",
    ],
  },
  {
    sentences: [
      "Un perro corre.",
      "Un gato persigue a un perro.",
      "Perro y gato juegan juntos.",
      "El gato se molesta con el perro.",
      "El perro llora.",
    ],
    images: [
      "https://serpapi.com/searches/6247ac453d69196783c87160/images/b02b23fda28c157dfa280846ea9b219ba0e0d216afd646c95572b253d15a86a7.jpeg",
      "https://serpapi.com/searches/6247ac47629a01302295a425/images/8c221d733747b6f9f451d4de021fbde35d52ad54726597a66ab07894e36ddcbf.jpeg",
      "https://serpapi.com/searches/6247ac4817f923baad3d76ea/images/3b1451b133d8bbb557b5151d1808aa032df5abe7fee5c68944a6b31df4f6d764.jpeg",
      "https://serpapi.com/searches/6247ac4c2236e2c76b322b0a/images/6f7ec9b2ecb11a21a92c85f20e055880a89b235c58c8a572fc022ef48403ec9e.jpeg",
      "https://serpapi.com/searches/6247ac4e10d744369f79c8e6/images/b70e96e370ef5dd35d939a9e21e28fdef07de98f64b44ab44c0ae40c1998dca5.jpeg",
    ],
  },
];

function ImageModule(props) {
  const [showModal, setShowModal] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [selected, setSelected] = useState(1);
  const [ratings, setRatings] = useState({ first: 0, second: 0, third: 0 });
  const [success, setSuccess] = useState(false);

  const checkRatings = () => {
    if (ratings.first === 0 || ratings.second === 0 || ratings.third === 0) {
      return false;
    }

    return true;
  };

  const sendRatings = async () => {
    try {
      const docRef = await addDoc(collection(db, "ratings"), ratings);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2000);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return props.images === null ? null : (
    <>
      <div className="images-container">{props.images}</div>
      {showCompare ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <p
              onClick={() => {
                setSelected(1);
              }}
              style={{
                marginRight: 20,
                fontSize: 20,
                cursor: "pointer",
                fontWeight: selected === 1 ? "bold" : "normal",
              }}
            >
              historia 1
            </p>
            <p
              onClick={() => {
                setSelected(2);
              }}
              style={{
                marginRight: 20,
                fontSize: 20,
                cursor: "pointer",
                fontWeight: selected === 2 ? "bold" : "normal",
              }}
            >
              historia 2
            </p>
            <p
              onClick={() => {
                setSelected(3);
              }}
              style={{
                marginRight: 20,
                fontSize: 20,
                cursor: "pointer",
                fontWeight: selected === 3 ? "bold" : "normal",
              }}
            >
              historia 3
            </p>
          </div>
          <div className="images-container">
            {stories[selected - 1]["sentences"].map((sentence, idx) => {
              return (
                <div key={idx}>
                  <GeneratedImage
                    number={idx + 1}
                    text={stories[selected - 1]["sentences"][idx]}
                    img={stories[selected - 1]["images"][idx].toString()}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {/* BUTTONS  */}
      <div
        style={{
          display: "flex",
          flexDirection: window.screen.width > 800 ? "row" : "column",
          justifyContent: "center",
          padding: "0 30px",
        }}
      >
        <button
          onClick={() => {
            props.setImages(null);
            props.setText("");
          }}
          style={{ marginBottom: 10 }}
          className="restart-button"
        >
          Reiniciar
        </button>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          style={{
            marginLeft: window.screen.width > 800 ? 20 : 0,
            marginBottom: 10,
          }}
          className="rate-button"
        >
          Calificar
        </button>

        <button
          onClick={() => {
            setShowCompare(true);
          }}
          style={{
            marginLeft: window.screen.width > 800 ? 20 : 0,
            marginBottom: 10,
          }}
          className="compare-button"
        >
          Comparar
        </button>
      </div>
      <ModalComponent
        loader={false}
        handleComponent={() => {
          setShowModal(false);
        }}
        showModal={showModal}
      >
        {success ? (
          <div className="rate-container">
            {" "}
            <SuccessAnimation />
          </div>
        ) : (
          <div className="rate-container">
            <div
              style={{ textAlign: "center", fontSize: 25, marginBottom: 20 }}
            >
              <p>Calidad visual</p>
              <StarRatings
                rating={ratings.first}
                starRatedColor="yellow"
                changeRating={(e) => {
                  setRatings({ ...ratings, first: e });
                }}
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div
              style={{ textAlign: "center", fontSize: 25, marginBottom: 20 }}
            >
              <p>Consistencia</p>
              <StarRatings
                rating={ratings.second}
                starRatedColor="yellow"
                changeRating={(e) => {
                  setRatings({ ...ratings, second: e });
                }}
                numberOfStars={5}
                name="rating"
              />
            </div>
            <div
              style={{ textAlign: "center", fontSize: 25, marginBottom: 20 }}
            >
              <p>Relevancia</p>
              <StarRatings
                rating={ratings.third}
                starRatedColor="yellow"
                changeRating={(e) => {
                  setRatings({ ...ratings, third: e });
                }}
                numberOfStars={5}
                name="rating"
              />
            </div>

            <button
              onClick={() => {
                sendRatings();
              }}
              disabled={!checkRatings()}
              style={{
                backgroundColor: "rgb(0, 32, 75)",
                color: "white",
                padding: "10px 30px",
                outline: "none",
                border: "none",
                fontSize: 25,
                borderRadius: 10,
                cursor: !checkRatings() ? "default" : "pointer",
                opacity: !checkRatings() ? 0.5 : 1,
              }}
            >
              Enviar
            </button>
          </div>
        )}
      </ModalComponent>
    </>
  );
}

export default ImageModule;
