// import styled from 'styled-components';
import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// Sempre inicia em maiúsculo componente
function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <a className="boxLink" href={`https//github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>

      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationBox(propriedades) {
  return (

    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
    </h2>
    
      <ul>
        {/* {comunidades.map((itemAtual) => {
          return (
            <li key={propriedades.title}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
        </ul>
    </ProfileRelationsBoxWrapper>

  );
}

export default function Home() {
  
  const githubUser = 'rfaaelnc';
  const [comunidades, setComunidades] = React.useState([{
    id: '123456789',
    title: 'Eu odeio acordar cedo',
    image :'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
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

  const [seguidores, setSeguidores] = React.useState([]);
  //* - Pegar o array de dados do github
    React.useEffect(function() {
      
      fetch('https://api.github.com/users/peas/followers')
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        setSeguidores(result);
      });

    }, []); //* Array vazio roda só uma vez
    
  //* 1 - Criar um box que vai ter um map, 
  //* baseado nos itens do array que pegamos do github
  
  return (
    // fragments no compile
    <>
    <AlurakutMenu />
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer ?</h2>
          <form onSubmit={(e) => {
            e.preventDefault();

            const dadosDoForm = new FormData(e.target);
            console.log('title',dadosDoForm.get('title'));
            console.log('image',dadosDoForm.get('image'));


            const comunidade = {
              id: new Date().toISOString(),
              title : dadosDoForm.get('title'),
              image : dadosDoForm.get('image'),

            }

            // comunidades.push('Alura Stars');

            const comunidadesAtualizadas = [...comunidades, comunidade];

            setComunidades(comunidadesAtualizadas);

            console.log(e.target.elements);

            // console.log(comunidades);



          }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da comunidade?"
                type="text"
                required
                />
              </div>

              <div>
                <input 
                placeholder="Qual vai ser a imagem da capa?" 
                name="image" 
                aria-label="Qual vai ser a imagem da capa?"
                type="text" 
                required
                />
              </div>
              <button>
                Criar comunidade
              </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Meus amigos ({comunidades.length})
        </h2>
        
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
            </ul>
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
