export interface User {
  id: string;
  username: string;
  password: string;
  email?: string; // Optional email field
  googleId?: string; // Optional Google ID field for OAuth users
}