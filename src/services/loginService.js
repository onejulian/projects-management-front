import axios from 'axios';
import { baseURL } from '../helpers/api';

const loginService = {
    async login(email, password) {
        try {
            const response = await axios.post(baseURL + '/login', {
                email: email,
                password: password,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

export default loginService;
