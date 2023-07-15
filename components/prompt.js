import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";

import Button from "./button";

export default function VoicePrompt(props) {
  const [value, setValue] = useState("");
  const [words, setWords] = useState([]);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
      let splittedResult = result.split(" ");
      setWords((prev) => [...prev, ...splittedResult]);
      console.log(result, words);
    },
  });

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    setWords(words.filter((item) => item !== name));
    console.log(name);
  };

  useEffect(() => {
    let splittedResult = value.split(" ");
    setWords((prev) => [...prev, ...splittedResult]);
  }, [value]);

  useEffect(() => {
    if (listening === true) {
      stop();
    }
  }, []);

  return (
    <form onSubmit={props.onSubmit}>
      <div className="flex w-full justify-center flex-col absolute bottom-0 h-full">
        <div className="flex w-full h-[12%] absolute bottom-0 p-2 gap-2">
          <div className="aspect-[5/4] h-full"></div>
          <input
            type="text"
            placeholder="type your prompt"
            defaultValue={value}
            name="prompt"
            className="w-full h-full rounded-full p-2 text-center"
            style={{ zIndex: 2001 }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div className="aspect-[5/4] h-full"></div>
        </div>
        <div className="w-full flex justify-between items-center h-[15%]">
          <Button
            btnText={"generate"}
            active={words.length === 0 || props.canvas === null ? false : true}
            onClick={() => {
              if (listening === true) {
                stop();
              }
            }}
            leftBtn="retake"
            leftOnClick={props.retake}
            // rightOnClick={() => {
            //   if (listening === false) {
            //     listen({ interimResults: false });
            //   } else {
            //     stop();
            //   }
            // }}
            rightBtn="generate"
            rightColor="#24B68A"
            rightActive={value !== "" ? true : false}
            listening={listening}
          />
        </div>

        {/* <div
          className="flex flex-wrap w-full h-fit absolute top-0 gap-[10px] p-6 justify-start"
          style={{ zIndex: 4000, rowGap: 10 }}
        >
          {listening === true && words.length === 0 && (
            <div className="text-2xl text-white">
              <br /> listening... <br />
              <br /> describe your imagination <br />
              in 3-10 words.
            </div>
          )}
          {words.length !== 0 &&
            words.map((info, index) => {
              return (
                <motion.div
                  key={index}
                  className="p-3 px-5 w-fit h-fit bg-[#24B68A] text-white rounded-full flex gap-5 items-center"
                >
                  {info}
                  <div
                    name={info}
                    onClick={handleRemoveItem}
                    className="text-xs rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center w-[20px] h-[20px] text-center cursor-pointer"
                  >
                    ⨉
                  </div>
                </motion.div>
              );
            })}
        </div> */}

        {/* {(listening || words.length !== 0) && (
          <div
            className="w-full absolute top-0 h-[88%] flex justify-center items-center bg-[rgba(0,0,0,0.5)] overflow-hidden"
            style={{ borderRadius: 20 }}
          ></div>
        )} */}
      </div>
    </form>
  );
}
