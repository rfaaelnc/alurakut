import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response) {

    console.log(request.body);


    if(request.method === "POST") {


        const title = request.body.title;
        const creator_slug = request.body.creator_slug;
        const image_url = request.body.image_url;

        const tokenPrivate = '0d37f75a492d7f791e859215c4adee';

        const client = new SiteClient(tokenPrivate);

        // Validar os dados, antes de sair cadastrando
        
        const registroCriado = await client.items.create({
            itemType: "966559", // ID do Model "Communities" feito pelo datocms 
            title : title,
            creator_slug : creator_slug,
            image_url : image_url,
            url:"teste",
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
    
}

// NADA AQUI APARECE NO SERVIDOR NAVEGADOR 
// MICROBACKEND   Next