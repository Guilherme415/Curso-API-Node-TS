import ProductService from "@modules/services/ProductService";
import { Request, Response } from "express";

const service = new ProductService();

class ProductsController {


    public async index(request: Request, response: Response): Promise<Response> {
        const products = await service.GetProducts();

        return response.json(products);
    }

    public async GetById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const products = await service.GetById(id);

        return response.json(products);
    }

    public async Post(request: Request, response: Response): Promise<Response> {
        const obj = {
            name: request.body.name,
            price: parseFloat(request.body.price),
            quantity: parseInt(request.body.quantity),
        }

        const create = await service.Post(obj);

        return response.json(create);
    }

    public async Put(request: Request, response: Response): Promise<Response> {
        const obj = {
            id: request.params.id,
            name: request.body.name,
            price: parseFloat(request.body.price),
            quantity: parseInt(request.body.quantity),
        }

        const update = await service.Put(obj);

        return response.json(update);
    }

    public async Delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;

        await service.Delete(id);

        return response.json([]);
    }
}

export default ProductsController;
