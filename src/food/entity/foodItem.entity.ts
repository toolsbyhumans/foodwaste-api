import { Supplier } from 'src/user/entity/supplier.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'date' })
  expiry_date: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.available_items)
  supplier: Supplier;
}
