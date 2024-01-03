import { AllProvidersContext } from "@/provider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AllProvidersContext>
      <ToastContainer />
      <Component {...pageProps} />
    </AllProvidersContext>
  );
}
