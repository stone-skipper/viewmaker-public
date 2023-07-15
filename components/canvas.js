import React, { useEffect } from "react";
import Image from "next/image";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Spinner from "components/spinner";
import { motion } from "framer-motion";
import SvgAnim from "./svg";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }
  onChange = async () => {
    const paths = await this.canvas.current.exportPaths();

    // only respond if there are paths to draw (don't want to send a blank canvas)
    if (paths.length) {
      const data = await this.canvas.current.exportImage("svg");
      this.props.onDraw(data);
    }
  };

  render() {
    const predictions = this.props.predictions.map((prediction) => {
      prediction.lastImage = prediction.output
        ? prediction.output[prediction.output.length - 1]
        : null;
      return prediction;
    });

    const predicting = predictions.some((prediction) => !prediction.output);
    const lastPrediction = predictions[predictions.length - 1];
    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* PREDICTION IMAGES */}

        {!this.props.userUploadedImage &&
          predictions
            .filter((prediction) => prediction.output)
            .map((prediction, index) => (
              <div
                key={"prediction" + index}
                className="w-full h-[88%] absolute overflow-hidden top-0"
                style={{
                  borderRadius: 20,
                }}
              >
                <Image
                  alt={"prediction" + index}
                  layout="fill"
                  objectFit="cover"
                  className="animate-in fade-in"
                  style={{ zIndex: index, position: "absolute", top: 0 }}
                  src={this.props.currentImage}
                />
              </div>
            ))}

        {this.props.userUploadedImage && (
          <div
            className="w-full h-[88%] relative overflow-hidden"
            style={{
              borderRadius: 20,
            }}
          >
            <Image
              src={URL.createObjectURL(this.props.userUploadedImage)}
              alt="preview image"
              layout="fill"
              objectFit="cover"
            />
            <div className="w-full h-fit absolute bottom-[30px] flex justify-center items-center flex-col">
              <SvgAnim color="black" />
              <motion.div
                className="p-3 bg-[#24B68A] text-white rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {this.canvas.current !== null
                  ? "2. WRITE PROMPTS"
                  : "1. DRAW THE AREA TO EDIT"}
              </motion.div>
            </div>
          </div>
        )}

        {/* SPINNER */}
        {predicting && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: predictions.length + 100 }}
          >
            <div className="p-4 w-40 bg-white text-center rounded-lg animate-in zoom-in">
              <Spinner />
              <p className="pt-3 opacity-30 text-center text-sm">
                {lastPrediction.status}
              </p>
            </div>
          </div>
        )}

        {(predictions.length > 0 || this.props.userUploadedImage) &&
          !predicting && (
            <div
              className="absolute top-0 left-0 w-full h-[88%]"
              style={{
                zIndex: predictions.length + 100,
                mixBlendMode: "difference",
              }}
            >
              <ReactSketchCanvas
                ref={this.canvas}
                strokeWidth={60}
                strokeColor="white"
                canvasColor="transparent"
                onChange={this.onChange}
                style={{ border: "none" }}
              />
            </div>
          )}
      </div>
    );
  }
}
