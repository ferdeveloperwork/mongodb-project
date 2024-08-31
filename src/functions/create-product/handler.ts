import { ProductService } from "@services/product.service";
import { APIGatewayProxyEvent } from 'aws-lambda';
// import { ObjectId } from "mongodb";
import { ProductType } from "@models/product.model";

export const main = async (event: APIGatewayProxyEvent) => {

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: `Body not found` }),
        };
    }
    const { name, description, price, count } = JSON.parse(event.body);

    if (!name || !description) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: `Product name and description are required` }),
        };
    }

    const newProduct: ProductType = {
        name,
        description,
        price,
        count,
        created_At: new Date(),
        updated_At: new Date(),
    };

    try {
        const productService = new ProductService();
        const product = await productService.createProduct(newProduct);

        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    } catch (error) {  // Se cerró el bloque try antes de empezar el catch
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error ' }),
        };
    }

}
