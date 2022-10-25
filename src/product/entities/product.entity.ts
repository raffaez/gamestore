import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

}
