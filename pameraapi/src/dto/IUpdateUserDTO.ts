export interface IUpdateUserDTO {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string; // Password will be hashed if provided
}
