export interface User {
  id?: number;
  username: string;
  email: string;
  password: string; // Required for creation
  createdAt?: string;
}