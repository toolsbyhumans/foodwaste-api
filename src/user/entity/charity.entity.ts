import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { FoodRequest } from 'src/food/entity/foodRequest.entity';

@ChildEntity('charity') // Role value will be 'charity'
export class Charity extends User {
  @Column()
  organization_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => FoodRequest, (foodRequest) => foodRequest.charity)
  requested_items: FoodRequest[];
}
