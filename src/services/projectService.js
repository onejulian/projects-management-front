import interceptor from '../helpers/interceptor';
import handleErrors from '../helpers/error';

const projectService = {
    async createProject(project) {
        try {
            const response = await interceptor.post('/projects', project);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getProject(projectId) {
        try {
            const response = await interceptor.get('/projects/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getMyProjects() {
        try {
            const response = await interceptor.get('/projects');
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getOtherProjects() {
        try {
            const response = await interceptor.get('/projects/others');
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getTasksFromProject(projectId) {
        try {
            const response = await interceptor.get('/projects/get-tasks/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async updateProject(project) {
        try {
            const response = await interceptor.put('/projects', project);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async deleteProject(projectId) {
        try {
            const response = await interceptor.delete('/projects/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    }
};

export default projectService;
