export interface AuthResponse {
  status: string,
  success: string,
  token: string,
  name: string,
  admin: boolean
};

export interface JWTResponse {
  status: string;
  success: boolean;
  member: any;
};