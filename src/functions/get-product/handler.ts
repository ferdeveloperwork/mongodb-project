import { ProductService } from "@services/product.service";
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = async (event: APIGatewayProxyEvent) => {
    const id = event?.queryStringParameters?.id;

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing id' }),
        };
    }

    try {
        const productService = new ProductService();
        const product = await productService.getProductById(id);

        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Product not found' }),
            };
        }
        else {
            return {
                statusCode: 200,
                body: JSON.stringify(product),
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error ' }),
        };
    }


};
