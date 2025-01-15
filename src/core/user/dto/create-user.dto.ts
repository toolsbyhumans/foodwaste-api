import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário.',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'E-mail válido do usuário.',
  })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário, deve ter pelo menos 6 caracteres.',
    minLength: 6,
  })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @ApiProperty({
    example: 'user',
    description:
      'Papel do usuário. Deve ser um entre: user, supplier, charity, ou admin.',
    enum: ['user', 'supplier', 'charity', 'admin'],
  })
  @IsNotEmpty({
    message:
      'O papel do usuário é obrigatório. Escolha entre: user, supplier, charity ou admin.',
  })
  role: 'user' | 'supplier' | 'charity' | 'admin';
}
