import axios from 'axios';
import { baseURL } from '../helpers/api';

const registerService = {
    async register(email, password, name) {
        try {
            const response = await axios.post(baseURL + '/register', {
                email: email,
                password: password,
                name: name,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

export default registerService;