

export interface AuthState {
    isAuthenticated: boolean;
    isRegistered: boolean;
    token: string;
    user: {};
    err: string;
    loading: boolean;

}

export interface AuthResponse {
    user: {};
    token: string;

}



