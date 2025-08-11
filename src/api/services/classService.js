import apiClient from '../clients/apiClient';

const ClassService = {
  getAllClass: async () => {
    const response = await apiClient.get('/class');
    return response.data;
  },
  createClass: async (data) => {
    const response = await apiClient.post('/class', data);
    return response.data;
  },
  updateClass: async (id, data) => {
    const response = await apiClient.put(`/class/${id}`, data);
    return response.data;
  },
  deleteClass: async (id) => {
    const response = await apiClient.delete(`/class/${id}`);
    return response.data;
  },
};

export default ClassService;
