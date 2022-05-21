import "../public/nprogress.css";
import Layout from "../Components/Layout";
import { useState, useMemo, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import Nprogress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`loading: ${url}`);
      Nprogress.start();
    };
    const handleStop = (url) => {
      console.log(`done: ${url}`);
      Nprogress.done();
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  /*   console.log(prefersDarkMode, "theme _appjs"); */
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            50: "#e3f2fd",
            100: "#bbdefb",
            200: "#90caf9",
            300: "#64b5f6",
            400: "#42a5f5",
            500: "#2196f3",
            600: "#1e88e5",
            700: "#1976d2",
            800: "#1565c0",
            900: "#0d47a1",
            A100: "#82b1ff",
            A200: "#448aff",
            A400: "#2979ff",
            A700: "#2962ff",
            dark: "#1976d2",
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px ${
                    darkMode
                      ? "rgba(59, 59, 59, 1)"
                      : "rgba(174, 174, 255, 0.1)"
                  } inset`,
                  WebkitTextFillColor: `${darkMode ? "white" : "black"}`,
                },
              },
            },
          },
        },
      }),
    [darkMode]
  );
  const onClickTheme = (event) => {
    if (event === true) {
      setDarkMode(!darkMode);
    }
  };
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <title>Trabanwaan</title>
            <meta
              name="description"
              content="A platform marketplace that instantly connects you with your local workers to help you with cleaning, furniture assembly, home repairs, running errands and more."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            
          </Head>
          <Layout layout={theme.palette.mode} onClickTheme={onClickTheme} />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
