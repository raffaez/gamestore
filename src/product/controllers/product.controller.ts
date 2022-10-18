import { Controller, Get, HttpStatus, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { DeleteResult } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('title/:title')
  @HttpCode(HttpStatus.OK)
  findByTitle(@Param('title') title: string): Promise<Product[]> {
    return this.productService.findByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() product: Product): Promise<Product> {
    return this.productService.update(product);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
}
