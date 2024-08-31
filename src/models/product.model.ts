import mongoose, { Document, Schema } from "mongoose";

type ProductType = {
    name: string;
    description: string;
    price: number;
    count: number;
    deleted?: boolean;
    created_At?: Date;
    updated_At?: Date;
};

interface IProduct extends Document, ProductType { }

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    count: { type: Number },
    deleted: { type: Boolean, default: false },
    created_At: { type: Date, default: Date.now },
    updated_At: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export { Product };
export type { IProduct, ProductType };

