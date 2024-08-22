import { IProduct, Product } from "@models/product.model";
import { BaseService } from "./base.service";

export class ProductService extends BaseService {
    getProductById = async (id: string): Promise<IProduct | null> => {
        await this.ensureInitialized();
        return await Product.finfById(id);
    }
}