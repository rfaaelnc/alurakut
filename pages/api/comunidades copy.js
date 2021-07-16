import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response) {

    console.log(request.body);


/*
    if(request.method === "POST") {

        const tokenPrivate = '0d37f75a492d7f791e859215c4adee';

        const client = new SiteClient(tokenPrivate);

        // Validar os dados, antes de sair cadastrando
        
        const registroCriado = await client.items.create({
            itemType: "966559", // ID do Model "Communities" feito pelo datocms 

            ...request.body,
        });

        // const registroCriado = await client.items.create({
        //     itemType: "966559", // ID do Model "Communities" feito pelo datocms 
        //     title : "Comunidade de Teste",
        //     imageUrl: "https;//github.com/omariosouto.png",
        //     creatorSlug: "admin",
        //     Url:"teste",
        // });

        console.log(registroCriado);

        console.log(tokenPrivate);

        response.json({
            dados: 'Dados...',
            registroCriado: registroCriado,

        });


        return;

    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mais o POST tem!',
    });
*/
    
}

// NADA AQUI APARECE NO SERVIDOR NAVEGADOR 
// MICROBACKEND   Next