export interface GlobalError {
  status: number;
  data: {
    error: string;
  };
}

export interface ValidationError {
  status: number;
  data: {
    error: {
      errors: {
        [key: string]: {
          name: string;
          message: string;
        };
      };
      message: string;
      name: string;
      _message: string;
    };
  };
}