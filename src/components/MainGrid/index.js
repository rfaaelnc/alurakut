import styled from 'styled-components';
const MainGrid = styled.main`
  /*display: grid;*/
  grid-gap: 10px;
  padding: 16px;
  margin: 0 auto;
  width:100%;
  max-width:500px;

  .profileArea {
    display:none;

    @media(min-width:860px) {
      display:block;
    }
  }
  @media(min-width: 860px) {
    max-width:1110px;
    display:grid;
    grid-template-areas: 
    "profileArea welcomeArea profileRelationsArea";
    grid-template-columns:160px 1fr 312px;
  }

  .list {

    li {
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    background-color:#F1F9FE;
    padding:15px;

    &:first-child {
      border-top-left-radius:10px;
      border-top-right-radius: 10px;
    }

    &:nth-child(odd) {
      background-color:#D9E6F6;
    }

    h3 {
      padding-left:15px;
    }

      figure {
        max-width:92px;
        border-radius:100%;
        max-width: 92px;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #f2f2f2;
        background-color:#f2f2f2;
        
        img {
          object-fit: cover;
          width: 92px;
          height: 92px;
        }
      }
    }
  }
`;

export default MainGrid;