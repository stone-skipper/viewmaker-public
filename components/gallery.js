import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePhotoStore } from "../lib/store";
import Image from "next/image";

export default function Gallery() {
  const photoHistory = usePhotoStore((state) => state.photoHistory);
  const currentPhoto = usePhotoStore((state) => state.currentPhoto);
  const [toggleGallery, setToggleGallery] = useState(false);

  useEffect(() => {
    console.log(photoHistory);
    usePhotoStore.setState({ currentPhoto: photoHistory.length - 1 });
  }, [photoHistory]);

  return (
    <>
      <motion.div
        className="absolute text-white text-center w-full left-0 justify-center items-center top-2"
        style={{
          margin: "0 auto",
          display: photoHistory.length > 1 ? "flex" : "none",
        }}
      >
        <motion.div
          className="flex w-[30px] h-[30px] rounded-full bg-[black] justify-center items-center cursor-pointer select-none"
          style={{ zIndex: 5501 }}
          animate={{ rotate: toggleGallery === true ? 180 : 0 }}
          onClick={() => {
            setToggleGallery(!toggleGallery);
          }}
        >
          ↓
        </motion.div>
      </motion.div>
      <div
        className="max-w-[512px] w-full h-fit fixed top-0 justify-center items-center bg-[rgba(0,0,0,0.4)] gap-1 pt-[50px] pb-[10px]"
        style={{
          zIndex: 5500,
          display:
            photoHistory.length > 1 && toggleGallery === true ? "flex" : "none",
        }}
      >
        {photoHistory.map((photo, index) => {
          return (
            <div
              key={index}
              className="rounded-sm overflow-hidden cursor-pointer"
              style={{
                width: 50,
                height: 80,
                position: "relative",
                zIndex: 5501,
                border: index === currentPhoto ? "2px solid white" : "none",
              }}
              onClick={() => {
                usePhotoStore.setState({ currentPhoto: index });
              }}
            >
              <Image
                src={photo}
                alt="preview image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
