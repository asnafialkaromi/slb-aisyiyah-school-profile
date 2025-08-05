import apiClient from "../clients/apiClient";

const ReportService = {
  getAllReports: async (params) => {
    const response = await apiClient.get("/report", { params });
    return response.data;
  },
  getLatestReport: async (params) => {
    const response = await apiClient.get("/report/all", { params });
    return response.data;
  },
  getReportById: async (id) => {
    const response = await apiClient.get(`/report/${id}`);
    return response.data;
  },
  createReport: async (data) => {
    const response = await apiClient.post("/report", data);
    return response.data;
  },
  updateReport: async (id, data) => {
    const response = await apiClient.put(`/report/${id}`, data);
    return response.data;
  },
  deleteReport: async (id) => {
    const response = await apiClient.delete(`/report/${id}`);
    return response.data;
  },
};

export default ReportService;
