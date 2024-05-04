import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`App is changing to ${url}`);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
