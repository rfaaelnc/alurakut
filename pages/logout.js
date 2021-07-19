import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

const destroyCookie = () => {

    const getCookie = nookies.get();
    const user = getCookie.user_token;
    let status = 0;

    if(user) {

        nookies.destroy({},'user_token');

        if(!user) {
           status = 1;
        }

    }

    return {
        status: status,
    }

}

export default function Logout() {

    const router = useRouter();
    const { status } = destroyCookie();    

    useEffect(()=> {
        if(!(status)) {
            router.push('/login')
        }
    }, [status]);

    return <p>Redirecionando...{status ? 'Deslogado com sucesso' : 'levando para home'}</p>


}
