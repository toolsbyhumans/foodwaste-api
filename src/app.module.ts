import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import entities
import { User } from './user/entity/user.entity';
import { Supplier } from './user/entity/supplier.entity';
import { Charity } from './user/entity/charity.entity';
import { FoodItem } from './food/entity/foodItem.entity';
import { FoodRequest } from './food/entity/foodRequest.entity';
import { Delivery } from './delivery/entity/delivery.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config module globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Supplier, Charity, FoodItem, FoodRequest, Delivery],
        synchronize: true, // Disable this in production
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
