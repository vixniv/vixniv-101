import Head from "next/head";
import "../styles/globals.css";
import { CustomProvider } from "../utils/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CustomProvider>
        <Component {...pageProps} />
      </CustomProvider>
    </>
  );
}

export default MyApp;
