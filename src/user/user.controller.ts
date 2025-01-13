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

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Create the new user
    const newUser = await this.userService.create(createUserDto);
    return {
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    };
  }

  @Post('login')
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
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.generateJwt(user);
    return { message: 'Login successful', token };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
