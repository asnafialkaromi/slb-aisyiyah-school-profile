import apiClient from "../clients/apiClient";

const AnnouncementService = {
  getAllAnnouncements: async (params) => {
    const response = await apiClient.get("/announcement", { params });
    return response.data;
  },

  getLatestAnnouncement: async (params) => {
    const response = await apiClient.get("/announcement/all", { params });
    return response.data;
  },
  getAnnouncementById: async (id) => {
    const response = await apiClient.get(`/announcement/${id}`);
    return response.data;
  },
  createAnnouncement: async (data) => {
    const response = await apiClient.post("/announcement", data);
    return response.data;
  },
  updateAnnouncement: async (id, data) => {
    const response = await apiClient.put(`/announcement/${id}`, data);
    return response.data;
  },
  deleteAnnoucement: async (id) => {
    const response = await apiClient.delete(`/announcement/${id}`);
    return response.data;
  },
};

export default AnnouncementService;
