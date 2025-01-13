import { ChildEntity, Column, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { FoodItem } from 'src/food/entity/foodItem.entity';

@ChildEntity('supplier') // Role value will be 'supplier'
export class Supplier extends User {
  @Column()
  organization_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.supplier)
  available_items: FoodItem[];
}
