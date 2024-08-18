import { Schema, model, Document } from 'mongoose';

export interface AuditLog extends Document {
    collectionName: string;
    documentId: string;
    action: string; // e.g., 'create', 'update', 'delete'
    previousData: Record<string, any>;
    newData: Record<string, any>;
    modifiedBy: string;
    modifiedAt: Date;
}

const AuditLogSchema: Schema = new Schema({
    collectionName: { type: String, required: true },
    documentId: { type: String, required: true },
    action: { type: String, required: true },
    previousData: { type: Schema.Types.Mixed, required: true },
    newData: { type: Schema.Types.Mixed, required: true },
    modifiedBy: { type: String, required: true },
    modifiedAt: { type: Date, default: Date.now }
});

export const AuditLog = model<AuditLog>('AuditLog', AuditLogSchema);