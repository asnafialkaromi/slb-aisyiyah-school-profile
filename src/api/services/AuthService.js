import apiClient from "../clients/apiClient";

const AuthService = {
  login: async (username, password) => {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  getUser: async () => {
    const response = await apiClient.get("/me");
    return response.data;
  },
};

export default AuthService;
