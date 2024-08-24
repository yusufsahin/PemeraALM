import { User } from "../../app/models/User";

export interface AuthState {
    isAuthenticated: boolean;
    isRegistered: boolean;
    token: string;
    user: User;
    err: string;
    loading: boolean;

}

export interface AuthResponse {
    user: User;
    token: string;
}


