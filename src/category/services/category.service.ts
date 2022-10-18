import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async findByName(name: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category> {
    const searchCategory: Category = await this.findById(category.id);

    if (!searchCategory || !category.id) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<DeleteResult> {
    const category: Category = await this.findById(id);

    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.delete(category);
  }
}
