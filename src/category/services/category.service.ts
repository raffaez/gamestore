import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   *
   * @desc Shows all categories in the database
   * @returns An array of category objects
   * @example
   * findAll() // All categories registered in the database will be shown
   */
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  /**
   *
   * @desc Shows a category in the database
   * @param id The id of the category to be shown
   * @returns A category object
   * @throws HttpException In case the id received is not found
   * @example
   * findById(1) // The category referenced by id 1 will be shown
   */
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

  /**
   *
   * @desc Shows categories in the database
   * @param name The name of the categories to be shown
   * @returns An array of category objects
   * @throws HttpException In case the name received is not found
   * @example
   * findByTitle("rpg") // Every category whose title includes "rpg" will be shown
   */
  async findByName(name: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  /**
   *
   * @desc Saves a category in the database
   * @param category The category to be saved
   * @returns A category object
   * @example
   * create({"name":"Action"}) // A category with the name "Action" will be saved into the database and returned
   */
  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  /**
   *
   * @desc Updates a category in the database
   * @param category The category to be updated
   * @returns A category object
   * @throws HttpException In case the category received is not found
   * @example
   * update({"id": 1, "name": "RPG"}) // The product referenced by id 1 will have its name updated to "RPG" and returned
   */
  async update(category: Category): Promise<Category> {
    const searchCategory: Category = await this.findById(category.id);

    if (!searchCategory || !category.id) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.save(category);
  }

  /**
   *
   * @desc Removes a category from the database
   * @param id The id of the category to be removed
   * @returns Void content
   * @throws HttpException In case the id received is not found
   * @example
   * delete(1) // The category referenced by id 1 will be removed
   */
  async delete(id: number): Promise<DeleteResult> {
    const category: Category = await this.findById(id);

    if (!category) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return await this.categoryRepository.delete(category);
  }
}
