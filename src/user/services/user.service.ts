import { MessagesHelper } from '../../helpers/messages.helper';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const userSearch: User[] = await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'photo'],
      relations: {
        products: true,
      },
    });

    if (!userSearch) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    return userSearch;
  }

  async findByEmail(email: string): Promise<User> {
    const userSearch: User = await this.userRepository.findOne({
      where: { email },
      relations: {
        products: true,
      },
    });

    if (!userSearch) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    return userSearch;
  }

  async findById(id: string): Promise<User> {
    const userSearch: User = await this.userRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });

    if (!userSearch) throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

    return userSearch;
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      await this.findByEmail(data.email);
    } catch (er) {
      const user: User = this.userRepository.create(data);
      return await this.userRepository.save(user);
    }

    throw new HttpException(
      MessagesHelper.EXISTING_USER,
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user: User = await this.findById(id);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<UpdateResult> {
    await this.findById(id);
    return this.userRepository.softDelete({ id });
  }
}
