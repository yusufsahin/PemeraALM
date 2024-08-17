export interface INoteDTO {
    _id?: string;  // Optional string representing the MongoDB ObjectId
    id?: string;   // Optional custom ID, possibly derived from _id
    title?: string; // Required title field
    content?: string; // Required content field
}
