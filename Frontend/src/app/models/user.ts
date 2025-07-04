export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string; // For form submission
  createdAt?: string; // Match .NET DateTime
}