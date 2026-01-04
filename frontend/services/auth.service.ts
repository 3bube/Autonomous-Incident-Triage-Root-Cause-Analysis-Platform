import { apiClient } from "@/lib/axios/api-client";

class AuthService {
  private endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
  };

  async login(email: string, password: string) {
    return await apiClient.post(this.endpoints.login, {
      email,
      password,
    });
  }

  async signUp(fullName: string, email: string, password: string) {
    return await apiClient.post(this.endpoints.register, {
      full_name: fullName,
      email,
      password,
    });
  }

  async logout() {
    return await apiClient.post(this.endpoints.logout);
  }

  async refreshToken(refreshToken: string) {
    return await apiClient.post(this.endpoints.refreshToken, { refreshToken });
  }
}

export const authService = new AuthService();
