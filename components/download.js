import Link from "next/link";
import { Download as DownloadIcon } from "lucide-react";
import { usePhotoStore } from "lib/store";

export default function Download(props) {
  const photoHistory = usePhotoStore((state) => state.photoHistory);
  const currentPhoto = usePhotoStore((state) => state.currentPhoto);

  if (!props.predictions.length) return null;

  const lastPrediction = props.predictions[props.predictions.length - 1];

  if (!lastPrediction.output) return null;

  const lastImage = lastPrediction.output[lastPrediction.output.length - 1];

  return (
    <Link href={photoHistory[currentPhoto]}>
      <a className="lil-button" target="_blank" rel="noopener noreferrer">
        <DownloadIcon className="icon" />
        Download
      </a>
    </Link>
  );
}
