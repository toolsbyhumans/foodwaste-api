import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorator/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('Usuários') // Agrupa os endpoints sob "Usuários" no Swagger
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
    schema: {
      example: {
        message: 'Usuário registrado com sucesso',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'user',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou usuário já existe.',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      valid: {
        summary: 'Exemplo válido',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          role: 'user',
        },
      },
      invalid: {
        summary: 'Exemplo inválido',
        value: {
          email: 'invalid-email',
          password: 'short',
          role: '',
        },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException(
        'E-mail já está registrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.create(createUserDto);
    return {
      message: 'Usuário registrado com sucesso',
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    };
  }
  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso e token JWT retornado.',
    schema: {
      example: {
        message: 'Login realizado com sucesso',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'E-mail ou senha inválidos.' })
  @ApiBody({
    type: LoginDto,
    examples: {
      valid: {
        summary: 'Exemplo válido',
        value: {
          email: 'john.doe@example.com',
          password: 'password123',
        },
      },
      invalid: {
        summary: 'Exemplo inválido',
        value: {
          email: 'invalid-email',
          password: '',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (
      !user ||
      !(await this.authService.comparePasswords(
        loginDto.password,
        user.password,
      ))
    ) {
      throw new HttpException(
        'E-mail ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.generateJwt(user);
    return { message: 'Login realizado com sucesso', token };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter todos os usuários (Apenas para administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter informações do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário autenticado retornadas com sucesso.',
    type: UserDto,
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Token inválido ou ausente.',
  })
  async whoAmI(@Request() req: any) {
    const user = req.user;
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter detalhes de um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário retornadas com sucesso.',
    type: UserDto,
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Token inválido ou ausente.',
  })
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
