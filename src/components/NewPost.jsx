import React from 'react'
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import './style.css'

const NewPost = ({image}) => {
    const {url,width,height} = image;

    const imgRef = useRef()
    const canvasRef = useRef()

    const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width,
        height,
      });

      const resized = faceapi.resizeResults(detections, {
        width,
        height,
      });
      
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all ([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
      ])
      .then(handleImage)
      .catch((e) => console.log(e));
    };

      imgRef.current && loadModels();
    }, []);

    return (
        <div className='container'>
            <div className="left" style={{width,height}}>
                <img ref={imgRef} src={url} crossOrigin='anonymous' alt="" />
                <canvas ref={canvasRef} width={width} height={height}/>
            </div>
            <div className="right">
                <h1>Refresh page to select a different image</h1>
            </div>
        </div>
    );
};
export default NewPost
