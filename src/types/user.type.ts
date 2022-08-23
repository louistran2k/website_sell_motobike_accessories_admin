export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: boolean | null;
  dateOfBirth: Date | null;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface UserState {
  adminAccessToken: string | null;
  admin: User;
  shipperAccessToken: string | null;
  shipper: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}
