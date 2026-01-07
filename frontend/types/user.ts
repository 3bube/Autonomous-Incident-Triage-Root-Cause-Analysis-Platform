import { AxiosError } from "axios";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | AxiosError | null;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export type UserRole = "admin" | "sre" | "viewer";
