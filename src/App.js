import "./App.css";
import TextModule from "./TextModule/TextModule";
import ImageModule from "./ImageModule/ImageModule";
import Nav from "./Nav/Nav";
import DownloadStory from "./DownloadStory/DownloadStory";
import { useState } from "react";
function App() {
  const [images, setImages] = useState(null);
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  return (
    <div className="App">
      <Nav></Nav>
      <TextModule
        setData={setData}
        text={text}
        setText={setText}
        setImages={setImages}
      />
      <ImageModule setText={setText} images={images} setImages={setImages} />
      <DownloadStory data={data} images={images} />
    </div>
  );
}

export default App;
