import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";

interface IRequestId {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class ProductService {

    public async Post({name, price, quantity}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const productExists = await productsRepository.findByName(name);

        if(productExists) throw new AppError('There is already one product with this name');

        const product = productsRepository.create({
            name,
            price,
            quantity
        });

        await productsRepository.save(product);

        return product;
    }

    public async Put({id, name, price, quantity}: IRequestId): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);

        if(!product) throw new AppError('There is not one product with this id');

        const productExists = await productsRepository.findByName(name);

        if(productExists) throw new AppError('There is already one product with this name');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }

    public async GetProducts(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();

        return products;
    }

    public async GetById(id: string): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.findOne({id});

        if(!products) throw new AppError('Product not found');

        return products;
    }

    public async Delete(id: string): Promise<void>{
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({id});

        if(!product) throw new AppError('Product not found');

        await productsRepository.remove(product);
    }
}

export default ProductService;
