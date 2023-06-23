import interceptor from '../helpers/interceptor';

const userService = {
    async searchUser(email) {
        try {
            const response = await interceptor.get('/users/' + email);
            return response;
        }
        catch (error) {
            return error.response;
        }
    }
};

export default userService;