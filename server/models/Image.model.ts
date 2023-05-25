import { type Document, Schema, model } from "mongoose";

import type { Image } from "~~/types/image";

type ImageModel = Image & Document

const ImageSchema = new Schema<ImageModel>({
    name: { type: String, required: true },
    ext: { type: String, required: true },
    hash: { type: String, required: true },
    uploader: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

ImageSchema.set("toJSON", {
    virtuals: true,
    transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
    }
});

export const Images = model<ImageModel>("Images", ImageSchema);
