import { FoodRequest } from 'src/food/entity/foodRequest.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FoodRequest)
  food_request: FoodRequest;

  @Column({ default: 'in_progress' })
  status: 'in_progress' | 'completed' | 'cancelled';

  @Column({ type: 'date' })
  delivery_date: Date;
}
