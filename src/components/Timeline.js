import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  .favoritos {
    display: flex;
    overflow-x: auto;
  }
  favorito-container{
    width: 100px;
		height: 124px;
    text-align: center;
  }
  .favorito-img {
    width: 80px;
		height: 80px;
    border-radius: 50%;
  }
  .favorito-text{
    font-size: 14px;
    text-align: center;
    padding-right: 0;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }
  // Scrollbar estilizado
  // Firefox 
  * {
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) => theme.borderBase} ${({ theme }) => theme.backgroundLevel1};
  }
  // Chrome, Edge, and Safari
  *::-webkit-scrollbar {
    width: 16px;
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundLevel1};
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.borderBase};
    border-radius: 10px;
    border: 3px solid ${({ theme }) => theme.backgroundLevel1};
  }
`;