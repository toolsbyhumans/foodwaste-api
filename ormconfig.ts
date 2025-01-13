import { Delivery } from 'src/delivery/entity/delivery.entity';
import { FoodItem } from 'src/food/entity/foodItem.entity';
import { FoodRequest } from 'src/food/entity/foodRequest.entity';
import { Charity } from 'src/user/entity/charity.entity';
import { Supplier } from 'src/user/entity/supplier.entity';
import { User } from 'src/user/entity/user.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'toolsbyhumans',
  entities: [User, Supplier, Charity, FoodItem, FoodRequest, Delivery],
  synchronize: process.env.NODE_ENV !== 'production', // Enable only in dev
  migrations: ['src/migrations/*.ts'],
  logging:
    process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

export default AppDataSource as DataSource;
