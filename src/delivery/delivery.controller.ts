import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Delivery } from './entity/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  createDelivery(@Body() data: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveryService.createDelivery(data);
  }

  @Get()
  getAllDeliveries(): Promise<Delivery[]> {
    return this.deliveryService.getAllDeliveries();
  }

  @Patch(':id')
  updateDeliveryStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Delivery> {
    return this.deliveryService.updateDeliveryStatus(+id, status);
  }
}
