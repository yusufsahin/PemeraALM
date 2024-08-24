export interface IUserDTO {
    _id?: string;       // The unique identifier for the user (MongoDB ObjectId)
    id?: string;        // A string representation of the _id for convenience
    username?: string;  // The user's username
    firstname?: string; // The user's first name
    lastname?: string;  // The user's last name
    email?: string;     // The user's email address
}
