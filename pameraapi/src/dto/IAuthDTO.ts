// src/dto/AuthDTO.ts

export interface RegisterDTOReq {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterDTORes {
    id?: string;
    _id?: string;
    username?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
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
        firstname?: string;
        lastname?: string;
        username?: string;
        email?: string;
    };
}
