import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FoodItem } from './foodItem.entity';
import { Charity } from 'src/user/entity/charity.entity';

@Entity()
export class FoodRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Charity, (charity) => charity.requested_items)
  charity: Charity;

  @ManyToOne(() => FoodItem)
  food_item: FoodItem;

  @Column()
  quantity_requested: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}
