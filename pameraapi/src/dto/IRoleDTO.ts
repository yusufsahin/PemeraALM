
export interface RoleDTO {
    _id?: string; // Optional ID field, MongoDB ObjectId as a string
    id?: string;  // Optional custom ID field mapped to _id
    name: string; // Name of the role
    description?: string; // Optional description of the role
}
