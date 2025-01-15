import { ChildEntity, Column, OneToMany } from 'typeorm';

import { User } from './user.entity';

@ChildEntity('supplier') // Role value will be 'supplier'
export class Supplier extends User {
  @Column()
  organization_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
