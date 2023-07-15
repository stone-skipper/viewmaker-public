import "../styles/globals.css";
import { useEffect } from "react";
import ReactGA from "react-ga4";

function MyApp({ Component, pageProps }) {
  ReactGA.initialize("G-TJVVBVRH1S");

  return <Component {...pageProps} />;
}

export default MyApp;
