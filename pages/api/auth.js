import jwt from 'jsonwebtoken';

export default async function teste(request,response) {

    const { authorization } = request.headers;


    if(authorization != 'undefined') {

        const tokenDecode = jwt.decode(authorization);

        const user = tokenDecode.githubUser;

        const authUser = await fetch(`https://api.github.com/users/${user}`);

        const data = await authUser.json();
        
        console.log(data);

        if(data.login) {

            response.send({
                isAuthenticated: 1,
            })

            return
        }


    } else {

        response.send({
            isAuthenticated: 0,
        })
        

    }



    // fetch(`https://api.github.com/users/${user}`)
    // .then( async (response) => {
    //     const dados = await response.json()
    //     // if(typeof dados.login != 'undefined') {

    //     if(dados.login) {
    //         console.log('chegou aqui',dados.login)
    //         response.json({
    //             isAuthenticated: 1,
    //         })


    //         return
    //     }

    // }).catch(err => console.log('deu erro'))

//     response.json({
//         isAuthenticated: 0,
//     })
}
