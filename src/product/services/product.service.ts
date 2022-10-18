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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true
      }
    });
  }

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

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    const searchProduct: Product = await this.findById(product.id);

    if (!searchProduct || !product.id) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    const product: Product = await this.findById(id);

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return await this.productRepository.delete(product);
  }
}
