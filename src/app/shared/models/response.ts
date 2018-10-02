export interface AuthResponse {
  status: string,
  success: string,
  token: string,
  name: string
};

export interface JWTResponse {
  status: string;
  success: boolean;
  member: any;
};