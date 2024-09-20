
export interface AuthResponse {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  token: string,
  roles: string[]
}

export interface AuthUser {
  id?: number | string,
  username: string,
  firstName: string,
  lastName: string,
  fullName: string,
  email: string,
  gender: UserGender,
  dateOfBirth: Date,
  status: UserStatus,
}

export type UserGender = "MALE" | "FEMALE" | "OTHER";

export type UserStatus = "NOT_VERIFY" | "VERIFIED";

export interface Address {
  id: number | string,
  userId: number | string,
  name: string,
  receiverName: string,
  phoneNumber: string,
  province: string,
  district: string,
  ward: string,
  detailAddress: string,
}