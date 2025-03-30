export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'manager';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface UsersState {
  user: LoginResponse | null;
}

export interface GlobalError {
  data: {
    error: string;
  };
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
