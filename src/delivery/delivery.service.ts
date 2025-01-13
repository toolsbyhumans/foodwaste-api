import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entity/delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) {}

  async createDelivery(data: Partial<Delivery>): Promise<Delivery> {
    const delivery = this.deliveryRepository.create(data);
    return this.deliveryRepository.save(delivery);
  }

  async getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  async updateDeliveryStatus(id: number, status: string): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOneBy({ id });
    if (!delivery) throw new Error('Delivery not found');

    if (
      status !== 'in_progress' &&
      status !== 'completed' &&
      status !== 'cancelled'
    ) {
      throw new Error('Invalid status');
    }

    delivery.status = status;
    return this.deliveryRepository.save(delivery);
  }
}
