import React from "react";
// Testar no servidor da vercel

export const UpdateModeContext = React.createContext({
    mode: "a", // testar a e depois vazio
    setMode: () => { alert("Você precisa me configurar primeiro!")  },
    toggleMode: () => { alert("Você precisa me configurar primeiro!")  },
});

export default function UpdateModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
    
        if(mode === "a")  setMode("b");  
        if(mode === "b")  setMode("a");     
    }

    return (
        <UpdateModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </UpdateModeContext.Provider>
    );
}