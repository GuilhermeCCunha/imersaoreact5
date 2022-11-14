import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import RegisterVideo from "../src/components/RegisterVideo";
import { useState } from "react";
import UpdateModeProvider, { UpdateModeContext } from "../src/components/Menu/components/UpdateMode";
import Head from "next";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

// _app.js -> Definições globais do NextJS
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prove o state de light ou dark mode para todo mundo 

function ProviderWrapper(props) {
    const [LSTheme, setLSTheme] = useState(null)
    const atualizaContexto = React.useContext(UpdateModeContext);
  
  
    React.useEffect(() => {

        atualizaContexto.toggleMode();
      
      var local = localStorage.getItem('ls_theme')
     
      setLSTheme(local)
      if (local === null) {
        setLSTheme("light")
      }
      if (local !== "light" && local !== "dark") {
        setLSTheme("light")
      }
    }, [])
    
    if (LSTheme === null) return null

    return (
        <ColorModeProvider initialMode={LSTheme}>
            {props.children}
        </ColorModeProvider>
    )
}

function ProviderWrapperUpdate(props) {
   

    return (
        <UpdateModeProvider initialMode={"a"}>
            {props.children}
        </UpdateModeProvider>
    )
}


function Root({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext);
    const atualizaContexto = React.useContext(UpdateModeContext);
    // console.log(contexto.mode);
    return (
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component {...pageProps} />
            <RegisterVideo />
        </ThemeProvider>
    )
}

export default function _App(props) {
    return (
        <>
        <Head>
            <title>AluraTube</title>
        </Head>
        <ProviderWrapperUpdate>
        <ProviderWrapper>
            <Root {...props} />
        </ProviderWrapper>
        </ProviderWrapperUpdate>
        </>
    )
};