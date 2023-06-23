import interceptor from '../helpers/interceptor';

const logoutService = {
    async logout() {
        try {
            const response = await interceptor.get('/logout');
            return response;
        }
        catch (error) {
            return error.response;
        }
    }
};

export default logoutService;