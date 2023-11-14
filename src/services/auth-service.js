import BaseService from "./base-service";

class AuthService extends BaseService {
  constructor() {
    super('/api/user');
  }

  async signIn(payload) {
    try {
      const { data } = await this.axiosClient.post(`${this.path}/sign-in`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async signUp(payload) {
    try {
      const { data } = await this.axiosClient.post(`${this.path}/sign-up`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changePass(payload) {
    try {
      const { data } = await this.axiosClient.post(`${this.path}/change-password`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPass(payload) {
    try {
      const { data } = await this.axiosClient.post(`${this.path}/forgot-password`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();