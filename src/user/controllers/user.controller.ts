import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResult } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from './../services/user.service';

@Controller('/users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateUserDto): Promise<User>{
        return this.userService.create(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: string,
        @Body() data: UpdateUserDto
    ): Promise<User>{
        return this.userService.update(id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string): Promise<UpdateResult>{
        return this.userService.delete(id);
    }
}
