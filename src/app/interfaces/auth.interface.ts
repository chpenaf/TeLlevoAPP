export interface AuthResponse{
  refresh: string;
  access: string;
}

export interface RefreshResponse{
  access: string;
  ok?: boolean;
}
