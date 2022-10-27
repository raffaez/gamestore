import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../product/entities/product.entity';

@Entity({ name: 'tb_categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[]
}
