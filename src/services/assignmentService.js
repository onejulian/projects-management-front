import interceptor from '../helpers/interceptor';
import handleErrors from '../helpers/error';

const assignmentService = {
    async createAssignment(assignment) {
        try {
            const response = await interceptor.post('/assignments', assignment);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getAssingmentsFromProject(projectId) {
        try {
            const response = await interceptor.get('/assignments/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async getAssignment(assignmnetId, projectId) {
        try {
            const response = await interceptor.get('/assignments/' + assignmnetId + '/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    },
    async deleteAssignment(assignmentId, projectId) {
        try {
            const response = await interceptor.delete('/assignments/' + assignmentId + '/' + projectId);
            return response;
        }
        catch (error) {
            handleErrors(error);
            return error.response;
        }
    }
};

export default assignmentService;