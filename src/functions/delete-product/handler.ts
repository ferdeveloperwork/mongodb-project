import { ProductService } from "@services/product.service";
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ObjectId } from "mongodb";

export const main = async (event: APIGatewayProxyEvent) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: `Body not found` }),
        };
    }

    const { id } = JSON.parse(event.body);

    if (!id || !ObjectId.isValid(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Product Id is ${!id ? "required" : "not valid"}`
            }),
        };
    }

    try {
        const productService = new ProductService();
        await productService.deleteProductById(id);

        return {
            statusCode: 200,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }), // Quité el espacio adicional
        };
    }
}
