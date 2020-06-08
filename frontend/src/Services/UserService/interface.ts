import { User } from '../../Interfaces';


export interface GetUserInfoResponse {
 user: User;
}

export interface LoginResponse extends GetUserInfoResponse {}
export interface RegisterResponse extends GetUserInfoResponse {}
