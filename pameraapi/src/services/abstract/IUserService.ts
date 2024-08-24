import {IUserDTO} from "../../dto/IUserDTO";


export interface IUserService {
    // Create a new user with the provided registration details
    createUser(registerDTO: IUserDTO): Promise<IUserDTO>;

    // Update an existing user by their ID with the provided details
    updateUser(userId: string, updateData: IUserDTO): Promise<IUserDTO | null>;

    // Retrieve a user by their ID
    getUserById(userId: string): Promise<IUserDTO | null>;

    // List all users in the system
    listAllUsers(): Promise<IUserDTO[]>;

    // Soft delete a user by their ID
    deleteUser(userId: string): Promise<void>;
}
