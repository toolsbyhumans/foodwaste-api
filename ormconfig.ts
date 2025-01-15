import { Charity } from 'src/user/entity/charity.entity';
import { Supplier } from 'src/user/entity/supplier.entity';
import { User } from 'src/user/entity/user.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'toolsbyhumans',
  entities: [User, Supplier, Charity],
  synchronize: process.env.NODE_ENV !== 'production', // Enable only in dev
  migrations: ['src/migrations/*.ts'],
  logging:
    process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

export default AppDataSource as DataSource;
