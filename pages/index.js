import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";
import{ UpdateModeContext } from "../src/components/Menu/components/UpdateMode"
function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists
    const atualizaContexto = React.useContext(UpdateModeContext);
    React.useEffect(() => {
        console.log("useEffect");
        console.log(atualizaContexto);
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
            });
    }, [atualizaContexto,valorDoFiltro]);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists} favoritos={config.favorites}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: black;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...propriedades }) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    const favoritosNames = Object.keys(propriedades.favoritos);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
            {favoritosNames.map((favoritosName) => {
				const favoritos = propriedades.favoritos[favoritosName];
				//console.log(favoritosName);
				//console.log(favoritos);
				return (
					<section key={favoritosName}>
						<h2>{favoritosName}</h2>
						<div className="favoritos">
							{favoritos
								.map((favorito) => {
									return (
										<a
											key={favorito.name}
											className="favorito-container"
											href={favorito.url}
                                            target="_blank" rel="noreferrer"
										>
											<img
												className="favorito-img"
												src={`https://github.com/${favorito.github}.png`}
											/>
											<span className="favorito-text">{favorito.name}</span>
										</a>
									)
								})}
						</div>
					</section>
				)
			})}
        </StyledTimeline>
    )
}