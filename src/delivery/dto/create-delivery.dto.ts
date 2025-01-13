import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsNotEmpty()
  food_request_id: number;

  @IsString()
  @IsNotEmpty()
  status: 'in_progress' | 'completed' | 'cancelled';

  @IsDate()
  delivery_date: Date;
}
