import apiClient from "../clients/apiClient";

const GalleryService = {
  getAllGallery: async (params) => {
    const response = await apiClient.get("/documentation", { params });
    return response.data;
  },
  getLatestGallery: async (params) => {
    const response = await apiClient.get("/documentation/all", { params });
    return response.data;
  },
  getGalleryById: async (id) => {
    const response = await apiClient.get(`/documentation/${id}`);
    return response.data;
  },
  createGallery: async (data) => {
    const response = await apiClient.post("/documentation", data);
    return response.data;
  },
  updateGallery: async (id, data) => {
    const response = await apiClient.put(`/documentation/${id}`, data);
    return response.data;
  },
  deleteGallery: async (id) => {
    const response = await apiClient.delete(`/documentation/${id}`);
    return response.data;
  },
};

export default GalleryService;
