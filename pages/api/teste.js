const { SiteClient } = require("datocms-client");
const client = new SiteClient("0d37f75a492d7f791e859215c4adee");

async function createRecord() {

const registroCriado = await client.items.create({
    itemType: "966559", // ID do Model "Communities" feito pelo datocms 
    title : "Comunidade de Teste",
    image_url: "https://github.com/omariosouto.png",
    creator_slug: "admin",
    url:"teste",
}).catch((err)=> console.log(err));

}

// function createRecord() {
//   const record = client.items.create({
//     itemType: "966559", // model ID
//     title: "Teste Comunity",
//   });
//   console.log(record);
// }
createRecord();
