// src/dto/AuthDTO.ts

export interface RegisterDTOReq {
    username: string;
    email: string;
    password: string;
}

export interface RegisterDTORes {
    id?: string;
    _id?: string;
    username?: string;
    email?: string;
}

export interface LoginDTOReq {
    identifier: string;
    password: string;
}

export interface LoginDTORes {
    token?: string;
    user?: {
        id?: string;
        _id?: string;
        username?: string;
        email?: string;
    };
}
