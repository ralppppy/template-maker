import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import background from "./images/background.png";
import dress from "./images/dress.jpg";
import htmlToImage from "html-to-image";
import download from "downloadjs";
import domtoimage from "dom-to-image";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

function App() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(500);
  const [priceOff, setPriceOff] = useState(50);

  let backgroundSize = {
    width: 1200,
    height: 675,
  };
  let imageSize = {
    width: 500,
  };
  const center = {
    x: window.innerWidth / 2 - backgroundSize.width / 2,
    y: window.innerHeight / 2 - backgroundSize.height / 2,
  };

  const generate = () => {
    let node = document.getElementById("image-generate");
    console.log(node);
    // htmlToImage
    //   .toPng(document.getElementById("image-generate"))
    //   .then(function (dataUrl) {
    //     download(dataUrl, "my-node.png");
    //   });

    domtoimage
      .toJpeg(document.getElementById("image-generate"), { quality: 0.95 })
      .then(function (dataUrl) {
        download(dataUrl, "my-node.png");
      });
  };

  const handleChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleChangePrice = (event) => {
    setPrice(event.currentTarget.value);
  };
  const handleChangeOff = (event) => {
    setPriceOff(event.currentTarget.value);
  };

  let toAddTop = isMobile ? 0 : center.y;
  let toAddBot = isMobile ? 0 : center.x;
  let topPrice = isMobile ? 153 : 150;

  //const price = 500;
  let devider = price > 999 ? 5 : 4;

  if (price > 999) {
    if (!isMobile) {
      devider = 6;
    } else {
      devider = 10;
    }
  } else {
    if (!isMobile) {
      devider = 4;
    } else {
      devider = 4;
    }
  }

  return (
    <div id="test">
      {isMobile ? (
        <>
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              bottom: 0,
              left: 50,
              zIndex: 1000,
            }}
            onClick={generate}
          >
            Download
          </button>
          <input
            className="form-control"
            style={{
              position: "absolute",
              bottom: 150,
              left: 50,
              zIndex: 1000,
            }}
            type="file"
            onChange={handleChange}
          />
          <input
            className="form-control"
            value={price}
            style={{
              position: "absolute",
              bottom: 100,
              left: 50,
              zIndex: 1000,
            }}
            type="text"
            onChange={handleChangePrice}
          />
          <input
            className="form-control"
            value={priceOff}
            style={{
              position: "absolute",
              bottom: 50,
              left: 50,
              zIndex: 1000,
            }}
            type="text"
            onChange={handleChangeOff}
          />
        </>
      ) : (
        <>
          <button
            className="btn btn-primary"
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={generate}
          >
            Download
          </button>
          <input
            className="form-control"
            style={{
              position: "absolute",
              top: 10,
              left: 50,
              zIndex: 1000,
              width: 300,
            }}
            type="file"
            onChange={handleChange}
          />
          <input
            className="form-control"
            value={price}
            style={{
              position: "absolute",
              top: 10,
              left: 400,
              zIndex: 1000,
              width: 100,
            }}
            type="text"
            onChange={handleChangePrice}
          />
          <input
            className="form-control"
            value={priceOff}
            style={{
              position: "absolute",
              top: 10,
              left: 600,
              zIndex: 1000,
              width: 100,
            }}
            type="text"
            onChange={handleChangeOff}
          />
        </>
      )}

      <div
        id="image-generate"
        style={{
          height: backgroundSize.height,
          width: backgroundSize.width,
          position: "absolute",
          // top: toAddTop,
          // left: toAddBot,
          zIndex: 0,
        }}
      >
        <img
          style={{
            height: backgroundSize.height,
            width: backgroundSize.width,
            position: "absolute",
            top: toAddTop,
            left: toAddBot,
            zIndex: 0,
          }}
          src={background}
        />
        <img
          style={{
            zIndex: 2,
            position: "absolute",
            top: toAddTop + backgroundSize.height / 7,
            left: toAddBot + backgroundSize.width / 2 - imageSize.width / 3,
          }}
          src={file ? file : dress}
          // width={imageSize.width}
          height={500}
        />

        <div
          style={{
            zIndex: 3,
            position: "absolute",
            top: toAddTop + backgroundSize.height / 7 + 150,
            left:
              toAddBot +
              backgroundSize.width / 2 -
              imageSize.width / 2 -
              200 +
              200 / 3.5,
            minWidth: 250,
            minHeight: 100,
            border: "6px solid black",
            backgroundColor: "#fff",
            boxShadow: "5px 5px rgba(0,0,0,0.2)",
          }}
        ></div>

        {/* font-size: 58px;
    z-index: 4;
    position: absolute;
    top: 315.929px;
    left: 389.143px;
    font-style: italic; */}

        <h1
          style={{
            fontSize: 58,
            fontStyle: "italic",
            zIndex: 4,
            position: "absolute",
            top: toAddTop + backgroundSize.height / 7 + topPrice + 10,
            left:
              toAddBot +
              backgroundSize.width / 2 -
              imageSize.width / 2 -
              200 +
              200 / 3.5 +
              50 / devider,
          }}
        >
          {price} PHP
        </h1>
        <h3
          style={{
            fontSize: 38,
            zIndex: 4,
            position: "absolute",
            top: toAddTop + backgroundSize.height / 7 + 150 - 50 / 4 + 65 + 50,
            left:
              toAddBot +
              backgroundSize.width / 2 -
              imageSize.width / 2 -
              200 +
              100,
          }}
        >
          {parseInt(priceOff) !== 0 && <> {priceOff}% OFF!!</>}
        </h3>
      </div>
    </div>
  );
}

export default App;
