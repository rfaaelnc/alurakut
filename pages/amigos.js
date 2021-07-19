// import styled from 'styled-components';
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// teste
import { server } from '../src/configs/';

// Sempre inicia em maiúsculo componente
function ProfileSidebar(propriedades) {
  // console.log(propriedades);
  return (
    <Box as="aside">

    <hr />
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <hr />

      <a className="boxLink" href={`https//github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>

      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationBox(propriedades) {
  // console.log(propriedades.items);
  return (

    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
    </h2>

    
    
      <ul>
        {
          propriedades.items.length > 0 ?
          propriedades.items.slice(0,6).map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <a href={`https://github.com/${itemAtual.login}`} target="_blank">
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })

        : 

        <li> Sem {propriedades.title}</li>
        
        }
        </ul>

        <hr></hr>

        <a href="/amigos" className="boxLink">Ver todos</a>
    </ProfileRelationsBoxWrapper>

  );
}

export default function Home(props) {
  
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];
  // console.log('Teste useState',comunidades[0]);
  // console.log('Teste useState',comunidades[0]);

  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto',
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  let qtdCommunity =0;
  const [seguidores, setSeguidores] = React.useState([]);
  const [community, setCommunity] = React.useState([]);
  //* - Pegar o array de dados do github
    React.useEffect(function() {
    
      // GET 

      fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        setSeguidores(result);
      });


      //* TESTE
      const token = 'a5b9457e4ce7725c9ebdb39beda264';

      fetch(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `{ 
              allCommunities 
              { id,title, imageUrl } 
            }`
          }),
        }
      )
      .then( res=> res.json())
      .then((res) => {
        setCommunity(res.data.allCommunities);
      })
      .catch((error) => {
        console.log(error);
      });

    }, []); //* Array vazio roda só uma vez
    
  //* 1 - Criar um box que vai ter um map, 
  //* baseado nos itens do array que pegamos do github
  return (
    // fragments no compile
    <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />

      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

      <Box>
          <h2 className="subTitle">Amigos({seguidores.length})</h2>

          <ul className="list">
          {console.log(seguidores)}
              {

                  

                seguidores.map((item) => {

              return (
              <li>
                  <figure>
                  <a href={`https://github.com/${item.login}`}>
                      <img src={item.avatar_url} />
                    </a>
                  </figure>

                  <h3>{item.login}</h3>
                  
              </li>

              )
            })

            }
          </ul>


        </Box>

      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

      <ProfileRelationBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {/* Minhas comunidades ({comunidades.length}) */}
          Minhas comunidades ({community.length})
        </h2>
        
          <ul>

          
            {/* {comunidades.map((itemAtual) => {
              qtdCommunity++
              if(qtdCommunity <= 6) {
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
              }
            })} */}

            {
              community.map((itemAtual) => {
              return (
                <li key={itemAtual.title}>
                  <a href={`/community/${itemAtual.id}`} target="_blank">
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })
              
              
            }

            </ul>
            
            
            <hr></hr>

            <a href="/comunidades" className="boxLink">Ver todos</a>
            
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da comunidade ({pessoasFavoritas.length})
        </h2>

          <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.user_token;
  const { isAuthenticated } = await fetch(`${server}/api/auth`, {
    headers: {
      Authorization: token,
    }
  })
  .then(response => response.json())
  // .then(result => console.log(result))

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}