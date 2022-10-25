import { hashSync } from 'bcrypt';
import { Product } from '../../product/entities/product.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: "tb_users"})
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false})
  firstName: string;

  @Column({ name: 'last_name', nullable: false})
  lastName: string;

  @Column({ nullable: false})
  email: string;

  @Column({ nullable: false})
  password: string;

  @Column({ length: 5000, default: 'default.jpg' })
  photo: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]

  @BeforeInsert()
  hashPassword(){
    this.password = hashSync(this.password, 10);
  }

  @CreateDateColumn()
  dateCreated:Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;

}