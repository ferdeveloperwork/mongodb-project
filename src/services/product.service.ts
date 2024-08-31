import { IProduct, Product, ProductType } from "@models/product.model";
import { BaseService } from "./base.service";
export class ProductService extends BaseService {
    getProductById = async (id: string): Promise<IProduct | null> => {
        await this.ensureInitialized();


        return await Product.findOne({ _id: id, deleted: false });
    }


    getProducts = async (): Promise<IProduct[]> => {
        await this.ensureInitialized();

        return await Product.find({
            $or: [{ deleted: false }, { deleted: { $exists: false } }]
        });
    }

    createProduct = async (product: ProductType): Promise<IProduct> => {
        await this.ensureInitialized();
        return await Product.create(product);
    }

    deleteProductById = async (id: string): Promise<void> => {
        await this.ensureInitialized();

        await Product.findOneAndUpdate({ _id: id }, { deleted: true });
    }
}