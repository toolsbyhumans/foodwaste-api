import { Exclude } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    TableInheritance,
  } from 'typeorm';
  
  @Entity()
  @TableInheritance({ column: { type: 'varchar', name: 'role' } }) // Role defines differentiation
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    @Exclude()
    password: string;
  
    @Column()
    role: 'supplier' | 'charity' | 'admin';
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  