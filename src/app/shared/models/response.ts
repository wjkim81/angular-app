export interface AuthResponse {
  status: string,
  success: string,
  token: string
};

export interface JWTResponse {
  status: string;
  success: boolean;
  member: any;
};