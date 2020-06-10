import { User } from '../../Interfaces';


export interface GetUserInfoResponse {
 user: User;
}

export interface LoginResponse extends GetUserInfoResponse {}
export interface RegisterResponse extends GetUserInfoResponse {}


export interface RegisterPayload { name: string, email: string, password1: string, password2: string }
export interface LoginPayload {email: string, password: string }