import PrivateRoute from "@/components/privateRoute";
import { AllProvidersContext } from "@/provider";
import "@/styles/globals.css";
import { checkIsPublicRoute } from "@/utils/checkIspublicRoute";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
  const asPath = usePathname();

  const isPrivate = checkIsPublicRoute(asPath);

  // return (
  //   <>
  //     {isPrivate && <Component {...pageProps} />}
  //     {!isPrivate && (
  //       <PrivateRoute>
  //         <Component {...pageProps} />
  //       </PrivateRoute>
  //     )}
  //   </>
  // );

  return (
    <AllProvidersContext>
      <Component {...pageProps} />;
    </AllProvidersContext>
  );
}
