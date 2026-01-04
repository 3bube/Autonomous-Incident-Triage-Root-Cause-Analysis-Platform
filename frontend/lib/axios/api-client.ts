import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retryCount?: number;
}

interface ErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

class APIClient {
  private client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        const config = error.config as RetryableRequestConfig;

        // Skip retry for client errors (4xx) except 408 and 429
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500 &&
          error.response.status !== 408 &&
          error.response.status !== 429
        ) {
          return Promise.reject(this.formatError(error));
        }

        // Initialize retry count
        const retryCount = config._retryCount ?? 0;

        // Check if we've exceeded max retries
        if (retryCount >= this.maxRetries) {
          return Promise.reject(this.formatError(error));
        }

        // Increment retry count
        config._retryCount = retryCount + 1;

        // Calculate delay with exponential backoff
        const delay = this.retryDelay * Math.pow(2, retryCount);

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Retry the request
        return this.client(config);
      }
    );

    this.client.interceptors.request.use((config) => {
      // You can add authorization headers or other custom headers here
      // For example, if you have a token stored in localStorage:
      // const token = localStorage.getItem('authToken');
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      return config;
    });
  }

  private formatError(error: AxiosError) {
    const formattedError = {
      message: "An error occurred",
      status: error.response?.status,
      data: error.response?.data,
    };

    // Handle different error response structures
    if (error.response?.data) {
      const data = error.response.data as ErrorResponse;
      formattedError.message =
        data.detail || data.message || data.error || formattedError.message;
    }

    // Handle network errors
    if (error.message === "Network Error") {
      formattedError.message = "Network error. Please check your connection.";
    }

    return formattedError;
  }

  get<T>(url: string, params?: object) {
    return this.client.get<T>(url, { params });
  }

  post<T>(url: string, data?: object) {
    return this.client.post<T>(url, data);
  }

  put<T>(url: string, data?: object) {
    return this.client.put<T>(url, data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url);
  }
}

export const apiClient = new APIClient();
