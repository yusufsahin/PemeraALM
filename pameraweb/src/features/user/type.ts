export interface User {
    _id?: string;
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    // Add any additional fields as needed
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}
