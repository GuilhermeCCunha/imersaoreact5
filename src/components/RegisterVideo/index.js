import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";
import { UpdateModeContext } from "../Menu/components/UpdateMode"

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues(propsDoForm.initialValues);
        }
    };
}

const PROJECT_URL = "https://agiddpqoamxrqnawgipv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnaWRkcHFvYW14cnFuYXdnaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODM2MTQsImV4cCI6MTk4MjE1OTYxNH0.aH02ulyAWA-Z4U3Z1LhFnxOrAZEILXrh4vKsK8S9zPg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
    const youTubeId = url.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
    const Thumbnail = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
    return Thumbnail;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk", playlist: "jogos"  }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
    const atualizaContexto = React.useContext(UpdateModeContext);
    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do v??deo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formul??rio ap??s o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => {setFormVisivel(true); atualizaContexto.toggleMode();
                        console.log(atualizaContexto); }}>
                +
            </button>
            {/* Tern??rio */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);
                        
                        // Contrato entre o nosso Front e o BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: formCadastro.values.playlist,
                         })
                         .then((oqueveio) => {
                            console.log(oqueveio);
                         })
                         .catch((err) => {
                            console.log(err);
                         })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                        setTimeout(() => {
                            atualizaContexto.toggleMode();
                        console.log(atualizaContexto);
                            }, 890);
                        
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => { setFormVisivel(false); atualizaContexto.toggleMode();
                        console.log(atualizaContexto);}}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do v??deo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                                required
                            />
                            <input
                                pattern="((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))?(\/(?:[\w\-]+\?v=|embed\/|v\/)?)?([\w\-_]{11})(\S+)?"
                                title="Insira uma URL v??lida"
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                                required
                            />

                            {formCadastro.values.url.length > 11 ? <> <img src={getThumbnail(formCadastro.values.url)}  /> <br/> </>  : null }
                            
                            <input
								placeholder="Nome da playlist"
								name="playlist"
								value={formCadastro.values.playlist}
								onChange={formCadastro.handleChange}
								required
							/>
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}


// [X] Falta o bot??o para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formul??rio em si