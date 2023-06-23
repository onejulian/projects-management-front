import interceptor from '../helpers/interceptor';

const taskService = {
    async createTask(task) {
        try {
            const response = await interceptor.post('/tasks', task);
            return response;
        }
        catch (error) {
            return error.response;
        }
    },
    async getTask(projectId, taskId) {
        try {
            const response = await interceptor.get('/tasks/' + taskId + '/' + projectId);
            return response;
        }
        catch (error) {
            return error.response;
        }
    },
    async updateTask(task) {
        try {
            const response = await interceptor.put('/tasks', task);
            return response;
        }
        catch (error) {
            return error.response;
        }
    },
    async deleteTask(taskId, projectId) {
        try {
            const response = await interceptor.delete('/tasks/' + taskId + '/' + projectId);
            return response;
        }
        catch (error) {
            return error.response;
        }
    }
};

export default taskService;
