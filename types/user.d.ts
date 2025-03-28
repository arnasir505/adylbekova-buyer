export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'manager';
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface UsersState {
  user: LoginResponse | null;
}
