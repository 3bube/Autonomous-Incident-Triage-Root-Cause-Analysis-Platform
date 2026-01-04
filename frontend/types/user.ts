export type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export type UserRole = "admin" | "sre" | "viewer";
