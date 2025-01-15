import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @IsNotEmpty({
    message:
      'O papel do usuário é obrigatório. Escolha entre: user, supplier, charity ou admin.',
  })
  role: 'user' | 'supplier' | 'charity' | 'admin';
}
