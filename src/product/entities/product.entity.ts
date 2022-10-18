import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  title: string;

  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  description: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 5, scale: 2, nullable: false })
  price: number;
}
