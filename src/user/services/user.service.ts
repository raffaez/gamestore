import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async findAll(): Promise<User[]>{
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'photo']
    });
  }

  async findBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User[]>{
    return await this.userRepository.findBy(where);
  }

  async findOneOrFail(options: FindOneOptions<User>): Promise<User>{
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(data: CreateUserDto): Promise<User>{
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User>{
    const user = await this.findOneOrFail({ where: { id }});
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<UpdateResult>{
    await this.findOneOrFail({ where: { id } });
    return this.userRepository.softDelete({ id });
  }
}