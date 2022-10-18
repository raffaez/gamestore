import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_gamestore',
      entities: [Product, Category],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
