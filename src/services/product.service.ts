import { IProduct, Product, ProductType } from "@models/product.model";
import { BaseService } from "./base.service";
export class ProductService extends BaseService {
    getProductById = async (id: string): Promise<IProduct | null> => {
        await this.ensureInitialized();
        return await Product.findById((id));
    }


    getProducts = async (): Promise<IProduct[]> => {
        await this.ensureInitialized();
        return await Product.find();
    }

    createProduct = async (product: ProductType): Promise<IProduct> => {
        await this.ensureInitialized();
        return await Product.create(product);
    }
}