import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import About from "components/about";
import { motion } from "framer-motion";
import { TextAnim } from "components/textAnim";
import SvgAnim from "components/svg";

export default function Home() {
  const [toggleAbout, setToggleAbout] = useState(false);
  return (
    <div className="max-w-[512px] mx-auto p-4 bg-[#24B68A] h-full overflow-hidden">
      <Head>
        <title>Viewmaker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex justify-between w-full h-full flex-col relative">
        <div
          className="absolute w-full h-fit"
          style={{ zIndex: 0, transform: "scale(2)" }}
        >
          <SvgAnim color="#02A473" fade={false} />
        </div>
        <TextAnim
          content={"VIEW MAKER"}
          fontSize={80}
          color="white"
          width={"50%"}
        />

        <motion.div
          className="text-left text-white w-[75%] uppercase text-lg"
          style={{ lineHeight: 1.4, zIndex: 1 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          collaborate with ai
          <br />
          on a smartphone camera, <br />
          and &apos;make&apos; a view <br />
          <br />
          BRING YOUR IMAGINATION TO LIFE
          <br />
          at your fingertips
          <br />
        </motion.div>
        <About toggle={toggleAbout} zIndex={20} />
        <div className="flex w-full h-[10%] gap-2 z-50">
          <div
            className="h-full aspect-square rounded-full flex justify-center items-center bg-[#00885F] text-white cursor-pointer select-none"
            onClick={() => {
              setToggleAbout(!toggleAbout);
            }}
          >
            {toggleAbout === true ? "✕" : "?"}
          </div>
          <Link href="/paint">
            <motion.a
              className="w-full text-center text-[#24B68A] bg-white rounded-full cursor-pointer flex justify-center items-center"
              style={{
                opacity: toggleAbout === true ? 0.1 : 1,
                pointerEvents: toggleAbout === true ? "none" : "auto",
              }}
            >
              START TO IMAGINE
            </motion.a>
          </Link>
        </div>
      </div>
    </div>
  );
}
