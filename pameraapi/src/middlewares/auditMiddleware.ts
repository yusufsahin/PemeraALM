import { Schema, Document, model, CallbackError, Model } from 'mongoose';
import {AuditLog, IAuditLog} from '../models/AuditLog'; // Add this import


interface AuditableDocument extends Document {
    createdBy?: string;
    modifiedBy?: string;
}

function getModelName(doc: AuditableDocument): string {
    const model = doc.constructor as Model<AuditableDocument>;
    return model.modelName || 'UnknownModel';  // Fallback to a default value if undefined
}

export const auditMiddleware = (schema: Schema) => {
    // Save Hook
    schema.pre<AuditableDocument>('save', async function (next) {
        const doc = this as AuditableDocument;
        const isNewDocument = doc.isNew;

        let action = 'create';
        let previousData: Record<string, any> = {};

        if (!isNewDocument) {
            try {
                const modelName = getModelName(doc);
                console.log(`Model Name for update: ${modelName}`);
                const Model = model<AuditableDocument>(modelName);
                const foundDoc = await Model.findById(doc._id).lean();
                previousData = foundDoc || {}; // Ensure it's an empty object if null
                action = 'update';
            } catch (error) {
                console.error('Error retrieving previous document version:', error);
                return next(error as CallbackError);
            }
        }

        const newData = doc.toObject();
        const collectionName = getModelName(doc);
        console.log(`Creating audit log with collectionName: ${collectionName}`);

        const auditLog: Partial<IAuditLog> = {
            collectionName,
            documentId: doc._id?.toString() || '',
            action,
            previousData: action === 'update' ? previousData : {},
            newData,
            modifiedBy: doc.modifiedBy || doc.createdBy || 'unknown',
            modifiedAt: new Date(),
        };

        try {
            await AuditLog.create(auditLog);
        } catch (error) {
            console.error('Error creating audit log:', error);
            return next(error as CallbackError);
        }

        next();
    });

    // FindOneAndUpdate Hook
    schema.pre('findOneAndUpdate', async function (next) {
        const query = this;
        const modelName = query.model.modelName || 'UnknownModel'; // Get the model name from the query
        const doc = await query.model.findOne(query.getQuery()).lean();

        if (!doc || Array.isArray(doc)) return next(); // Skip if no document is found or doc is an array

        const previousData = doc;
        const update = query.getUpdate();
        const newData: Record<string, any> = update || {}; // Ensure newData is an object

        console.log(`Creating audit log for update with collectionName: ${modelName}`);

        const auditLog: Partial<IAuditLog> = {
            collectionName: modelName,
            documentId: (doc as any)._id?.toString() || '',
            action: 'update',
            previousData,
            newData,
            modifiedBy: (doc as any).modifiedBy || (doc as any).createdBy || 'unknown',
            modifiedAt: new Date(),
        };

        try {
            await AuditLog.create(auditLog);
        } catch (error) {
            console.error('Error creating audit log:', error);
            return next(error as CallbackError);
        }

        next();
    });

    // Remove Hook
    schema.pre<AuditableDocument>('remove' as any, async function (next: (err?: CallbackError) => void) {
        const doc = this as AuditableDocument;
        const collectionName = getModelName(doc);

        let previousData: Record<string, any> = {};

        try {
            const modelName = getModelName(doc);
            const Model = model<AuditableDocument>(modelName);
            const foundDoc = await Model.findById(doc._id).lean();
            previousData = foundDoc || {}; // Ensure it's an empty object if null
        } catch (error) {
            console.error('Error retrieving previous document version:', error);
            return next(error as CallbackError);
        }

        const auditLog: Partial<IAuditLog> = {
            collectionName,
            documentId: doc._id?.toString() || '',
            action: 'delete',
            previousData,
            newData: {}, // No new data since the document is being deleted
            modifiedBy: doc.modifiedBy || doc.createdBy || 'unknown',
            modifiedAt: new Date(),
        };

        try {
            await AuditLog.create(auditLog);
        } catch (error) {
            console.error('Error creating audit log:', error);
            return next(error as CallbackError);
        }

        next();
    });

    // FindOneAndDelete Hook
    schema.pre('findOneAndDelete', async function (next) {
        const query = this;
        const modelName = query.model.modelName || 'UnknownModel'; // Get the model name from the query
        const doc = await query.model.findOne(query.getQuery()).lean();

        if (!doc || Array.isArray(doc)) return next(); // Skip if no document is found or doc is an array

        const previousData = doc;

        console.log(`Creating audit log for delete with collectionName: ${modelName}`);

        const auditLog: Partial<IAuditLog> = {
            collectionName: modelName,
            documentId: (doc as any)._id?.toString() || '',
            action: 'delete',
            previousData,
            newData: {}, // No new data since the document is being deleted
            modifiedBy: (doc as any).modifiedBy || (doc as any).createdBy || 'unknown',
            modifiedAt: new Date(),
        };

        try {
            await AuditLog.create(auditLog);
        } catch (error) {
            console.error('Error creating audit log:', error);
            return next(error as CallbackError);
        }

        next();
    });
};