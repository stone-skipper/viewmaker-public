import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export function TextAnim({
  fontSize,
  color,
  hoverColor,
  referer = "",
  content,
  delay = 0,
  width = null,
  onClick = () => void 0,
}) {
  const [currentInView, setCurrentInView] = useState(false);

  const links = [
    { title: "INSTAGRAM", link: "https://instagram.com/stone.skipper" },
    { title: "CV", link: "https://read.cv/seungmee_lee" },
    { title: "LINKEDIN", link: "https://www.linkedin.com/in/seungmeelee/" },
    { title: "EMAIL", link: "mailto:iam.seungmee.lee@gmail.com" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCurrentInView(true);
    }, delay * 1000);
  }, []);

  useEffect(() => {}, [color]);

  const letterContainerVariants = {
    initial: { transition: { staggerChildren: 0.02 } },
    default: { transition: { staggerChildren: 0.02 } },
    hover: { transition: { staggerChildren: 0.03 } },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 60,
      rotate: 0,
      transition: {
        duration: 0,
      },
    },
    default: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    hover: {
      opacity: 1,
      y: -4,
      rotate: 0,
      color: hoverColor,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    // @ts-ignore
    <AnimatePresence>
      <motion.div
        style={{
          position: "relative",
          wordBreak: "break-word",
          maxWidth: width,
          width: "fit-content",
          height: "fit-content",
          // fontFamily: '"Inter", san-serif',
          cursor: "pointer",
          display: currentInView === true ? "flex" : "none",
          flexDirection: "column",
          whiteSpace: "nowrap",
        }}
        onClick={onClick}
      >
        <motion.h1
          variants={letterContainerVariants}
          initial={"initial"}
          whileInView={"default"}
          whileHover={"hover"}
          style={{
            padding: 0,
            fontWeight: 400,
            margin: 0,
            width: "fit-content",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
          transition={{
            delay: delay * 1000,
          }}
        >
          <div
            style={{
              textAlign: "left",
              fontSize: fontSize,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              height: "fit-content",
            }}
          >
            {content.split(" ").map((word, wordI) => (
              <motion.div
                key={`word-${word}-${wordI}`}
                style={{
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  background: "transparent",
                  color: color,
                }}
                whileHover={{
                  background:
                    word.includes("↗") === true ? hoverColor : "transparent",
                  color: word.includes("↗") === true ? "white" : color,
                }}
              >
                {Array.from(word).map((letter, index) => (
                  <motion.div
                    key={`${index}-${letter}`}
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      overflow: "hidden",
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <motion.span
                      variants={letterVariants}
                      transition={{ duration: 0.5 }}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        color: color,
                        borderBottom:
                          word.includes("↗") === true
                            ? "2px solid " + hoverColor
                            : "none",
                      }} // Position elements
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  </motion.div>
                ))}
                {/* remove the last spacing */}
                {wordI !== content.split(" ").length - 1 ? "\u00A0" : null}
              </motion.div>
            ))}
          </div>
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
