import { AllProvidersContext } from "@/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AllProvidersContext>
      <Component {...pageProps} />;
    </AllProvidersContext>
  );
}
