// src/services/abstract/IAuthService.ts



import {LoginDTOReq, LoginDTORes, RegisterDTOReq, RegisterDTORes} from "../../dto/IAuthDTO";
import {IUser} from "../../models/User";

export interface IAuthService {
    register(registerUser: RegisterDTOReq): Promise<RegisterDTORes>;
    login(loginUser: LoginDTOReq): Promise<LoginDTORes>;
    generateToken(user: IUser): string;  // Change to IUser
    verifyToken(token: string): IUser | null;  // Change to IUser
}
