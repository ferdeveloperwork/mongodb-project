import { ProductService } from "@services/product.service";

export const main = async () => {
    try {
        const productService = new ProductService();
        const products = await productService.getProducts();

        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error ' }),
        };
    }
}
