import React from "react";

export const armazenar = (chave, valor) => {
    localStorage.setItem(chave, valor)
  }


export const ColorModeContext = React.createContext({   
    mode: "",
    setMode: () => { alert("Você precisa me configurar primeiro!")  },
    toggleMode: () => { alert("Você precisa me configurar primeiro!")  },
});
ColorModeContext.displayName = "Theme";

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        if(mode === "dark") { setMode("light");  armazenar('ls_theme', "light"); }
        if(mode === "light") { setMode("dark");    armazenar('ls_theme', "dark"); }
    }

    return (
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}