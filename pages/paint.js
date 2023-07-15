import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Canvas from "components/canvas";
import Prompt from "components/prompt";
import Button from "components/button";
import About from "components/about";
import Camera from "components/camera";
import Gallery from "components/gallery";
import { usePhotoStore } from "lib/store";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [toggleAbout, setToggleAbout] = useState(false);
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);
  const addPhoto = usePhotoStore((state) => state.addPhoto);
  const photoHistory = usePhotoStore((state) => state.photoHistory);
  const currentPhoto = usePhotoStore((state) => state.currentPhoto);
  const defaultPrompts =
    ", high resolution, detailed, photo-realistic, OM-D E-M5 Mark III | M.Zuiko Digital ED 12–40mm F2.8 PRO | 1/50sec | F9 | ISO64";
  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    const prevPrediction = predictions[predictions.length - 1];
    const prevPredictionOutput = prevPrediction?.output
      ? prevPrediction.output[prevPrediction.output.length - 1]
      : null;

    const body = {
      prompt: e.target.prompt.value + defaultPrompts,
      image: userUploadedImage
        ? await readAsDataURL(userUploadedImage)
        : // only use previous prediction as init image if there's a mask
        maskImage
        ? prevPredictionOutput
        : null,
      mask: maskImage,
      num_inference_steps: 50,
    };
    console.log(body, "body");

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      console.log(error);
      return;
    }
    setPredictions(predictions.concat([prediction]));

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));

      if (prediction.status === "succeeded") {
        setUserUploadedImage(null);
        console.log(prediction.output);
        addPhoto(prediction.output[0]);
      }
    }
  };
  useEffect(() => {
    console.log(predictions);
  }, [predictions]);

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions([]);
    setError(null);
    setMaskImage(null);
    setUserUploadedImage(null);
    usePhotoStore.setState({ photoHistory: [] });
  };

  const develop = async () => {
    fetch(photoHistory[currentPhoto])
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "capture.jpeg", { type: "image/jpg" });
        setUserUploadedImage(file);
      });
  };

  return (
    <div className="w-full h-full">
      <Head>
        <title>Viewmaker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="mx-auto max-w-[512px] h-full relative">
        <Gallery />
        <div className="absolute h-full w-[95%] left-[2.5%]">
          <About toggle={toggleAbout} zIndex={79} />
        </div>
        <div className="absolute flex w-full h-[10%] gap-2 z-[80] justify-end p-3">
          <div
            className="h-full aspect-square rounded-full flex justify-center items-center bg-[rgba(255,255,255,0.2)] text-white cursor-pointer select-none"
            onClick={() => {
              setToggleAbout(!toggleAbout);
            }}
          >
            {toggleAbout === true ? "✕" : "?"}
          </div>
        </div>
        <div className="w-full h-full mx-auto relative">
          {error && (
            <div className="fixed bg-[white] top-[50px] z-[200000]">
              {error}
            </div>
          )}

          <Camera
            onImageDropped={setUserUploadedImage}
            predictions={predictions}
            userUploadedImage={userUploadedImage}
          />
          <div className="relative h-full w-full flex">
            <Canvas
              predictions={predictions}
              userUploadedImage={userUploadedImage}
              onDraw={setMaskImage}
              currentImage={photoHistory[currentPhoto]}
            />
          </div>
          <div className="max-w-[512px] mx-auto">
            {userUploadedImage && (
              <Prompt
                onSubmit={handleSubmit}
                retake={startOver}
                canvas={maskImage}
              />
            )}
            {predictions.length > 0 &&
              predictions[predictions.length - 1].output &&
              !userUploadedImage && (
                <Button
                  btnText={"develop"}
                  onClick={develop}
                  leftBtn="retake"
                  leftOnClick={startOver}
                  rightOnClick={() => {
                    window.open(photoHistory[currentPhoto], "_blank");
                  }}
                  rightBtn="download"
                  rightColor="#24B68A"
                />
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}
