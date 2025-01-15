import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário.',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário.',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'E-mail do usuário.',
  })
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'Cargo do usuário.',
  })
  role: string;
}
