import { motion } from "framer-motion";
import { SwitchCamera, XCircle, Wand, Mic, Download } from "lucide-react";

export default function Button({
  onClick,
  btnText,
  leftBtn = "",
  leftOnClick = () => void 0,
  rightBtn = "",
  rightOnClick = () => void 0,
  leftColor = "#232323",
  rightColor = "#232323",
  rightActive = true,
  listening = false,
  active = true,
}) {
  const inactiveColor = "#232323";
  return (
    <div
      className="w-full h-[12%] absolute bottom-0 flex justify-between items-center p-2 gap-2"
      style={{ zIndex: 2000 }}
    >
      <div
        className="h-full aspect-[5/4] rounded-full flex justify-center items-center"
        style={{ background: leftBtn === "" ? "transparent" : leftColor }}
        onClick={leftOnClick}
      >
        {leftBtn === "retake" && <XCircle color="white" />}
      </div>

      <motion.div
        className="flex justify-center items-center w-full rounded-full h-full cursor-pointer relative"
        style={{
          background: "white",
          pointerEvents: active === false ? "none" : "auto",
          opacity: active === false ? 0.1 : 1,
        }}
        whileTap={{ scale: 1.1 }}
        onClick={onClick}
      >
        <button
          className="w-full rounded-full h-full p-[2px] uppercase"
          type={btnText === "generate" ? "submit" : ""}
        >
          <div
            className="w-full rounded-full h-full p-[2px] flex justify-center items-center"
            style={{ border: "2px solid grey" }}
          >
            {btnText}
          </div>
        </button>
      </motion.div>
      <motion.div
        className="h-full aspect-[5/4] rounded-full flex justify-center items-center"
        onClick={rightOnClick}
        style={{
          background:
            rightBtn === ""
              ? "transparent"
              : rightActive === false
              ? inactiveColor
              : rightColor,
          opacity: rightActive === true ? 1 : 0.3,
          cursor: rightActive === true ? "pointer" : "inherit",
          pointerEvents: rightActive === true ? "unset" : "none",
        }}
        initial={{
          backgroundImage:
            listening === true
              ? "conic-gradient(from 0deg, #24B68A, #00885F)"
              : "none",
        }}
        animate={{
          backgroundImage:
            listening === true
              ? "conic-gradient(from 360deg, #24B68A, #00885F)"
              : "none",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
        }}
      >
        <button
          type={btnText === "generate" ? "submit" : ""}
          className="w-full rounded-full h-full p-[2px] uppercase flex justify-center items-center"
        >
          {rightBtn === "switch" && <SwitchCamera color={"white"} />}
          {rightBtn === "prompt" && <Mic color={"white"} />}
          {rightBtn === "download" && <Download color={"white"} />}
          {rightBtn === "generate" && <Wand color={"white"} />}
        </button>
      </motion.div>
    </div>
  );
}
