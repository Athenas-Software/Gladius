import axios from 'axios';

class AthenasService {

    private token: string = '';
    private sub: string = 'localhost'

    auth = async (login: string, password: string): Promise<void> => {

        let { data } = await axios.post(`${process.env.URLAPI}v2/usuarios/auth`, {
            login,
            password
        }, {
            auth: {
                username: process.env.APIXUSER || '',
                password: process.env.APIXPASS || ''
            }
        })

        this.token = data.token
    }
}

export { AthenasService } 
