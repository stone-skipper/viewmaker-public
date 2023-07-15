import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";

import Button from "./button";
import { usePhotoStore } from "../lib/store";

export default function Camera(props) {
  const [cameraMode, setCameraMode] = useState("environment");
  const videoConstraints = {
    facingMode: cameraMode,
  };
  const [size, setSize] = useState([0, 0]);
  const webcamRef = React.useRef(null);
  const addPhoto = usePhotoStore((state) => state.addPhoto);

  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: size[0] * 3,
      height: size[1] * 0.88 * 3,
    });
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpg" });
        console.log(imageSrc + "!");
        onImageDropped(file);
        addPhoto(imageSrc);
      });
  }, [webcamRef]);

  const onImageDropped = props.onImageDropped;
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageDropped(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
    },
    [onImageDropped]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (props.predictions.length) return null;

  if (props.userUploadedImage) return null;

  return (
    <div className="absolute z-50 flex text-gray-500 text-sm text-center select-none w-full h-full overflow-hidden">
      <Webcam
        audio={false}
        screenshotFormat="image/jpg"
        width={"100%"}
        videoConstraints={videoConstraints}
        mirrored={cameraMode === "user" ? true : false}
        ref={webcamRef}
        screenshotQuality={1}
        imageSmoothing={false}
        minScreenshotHeight={720}
        style={{
          objectFit: "cover",
          borderRadius: 20,
          overflow: "hidden",
          background: "#303030",
          height: "88%",
        }}
      >
        {({ getScreenshot }) => (
          <>
            <Button
              onClick={capture}
              btnText=""
              rightBtn="switch"
              rightOnClick={() => {
                if (cameraMode === "user") {
                  setCameraMode("environment");
                } else {
                  setCameraMode("user");
                }
              }}
            />
          </>
        )}
      </Webcam>
    </div>
  );
}
