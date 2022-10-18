import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  
  /**
   * 
   * @desc Shows all products in the database
   * @returns An array of all the products that are in the database
   * @example
   * findAll() // All products registered in the database will be shown
   */
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true
      }
    });
  }

  /**
   * 
   * @desc Shows a product in the database
   * @param id The id of the product to be shown
   * @returns A product object
   * @throws HttpException In case the id received is not found
   * @example
   * findById(1) // The product referenced by id 1 will be shown
   */
  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true
      }
    });

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  /**
   * 
   * @desc Shows products in the database
   * @param title The title of the products to be shown
   * @returns An array of product objects
   * @throws HttpException In case the title received is not found
   * @example
   * findByTitle("va") // Every product whose title includes "va" will be shown
   */
  async findByTitle(title: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      relations: {
        category: true
      }
    });
  }

  /**
   * 
   * @desc Saves a product in the database
   * @param product The product to be saved
   * @returns The product saved
   * @example
   * create({"name": "Crossfire", "description": "First-person shooter", "price": 0, "category":{"id": 1}}) // A product with the given properties will be saved into the database
   */
  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  /**
   * 
   * @desc Updates a product in the database
   * @param product The product to be updated
   * @returns The updated product
   * @throws HttpException In case the product received is not found
   * @example
   * update({"id": 1, "name": "Languages"}) // The product referenced by id = 1 will have it's name updated to "Languages"
   */
  async update(product: Product): Promise<Product> {
    const searchProduct: Product = await this.findById(product.id);

    if (!searchProduct || !product.id) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.save(product);
  }

  /**
   * 
   * @desc Removes a product from the database
   * @param id The id of the product to be removed
   * @returns Void content
   * @throws HttpException In case the id received is not found
   * @example
   * delete(1) // The product referenced by id 1 will be deleted
   */
  async delete(id: number): Promise<DeleteResult> {
    const product: Product = await this.findById(id);

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.delete(product);
  }
}
