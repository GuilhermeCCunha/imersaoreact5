import React from "react";
// Testar no servidor da vercel

export const UpdateModeContext = React.createContext({
    setNewVideos: () => { alert("Você precisa me configurar primeiro!")  },
    addToPlaylist: () => { alert("Você precisa me configurar primeiro!")  },
});

UpdateModeContext.displayName = "Update";

export default function UpdateModeProvider(props) {
    const [newVideos, setNewVideos] = React.useState(props.initialMode);

    function addToPlaylist() {
    
        setNewVideos(newVideos+1)
            
    }

    return (
        <UpdateModeContext.Provider value={{ newVideos: newVideos, setNewVideos: setNewVideos, addToPlaylist: addToPlaylist }}>
            {props.children}
        </UpdateModeContext.Provider>
    );
}