import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  /**
   * Find a user by email
   * @param email - User's email address
   * @returns User or undefined
   */
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  /**
   * Find a user by ID
   * @param id - User ID
   * @returns User or throws an exception if not found
   */
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(User, user);
  }

  /**
   * Retrieve all users
   * @returns List of users
   */
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => plainToClass(User, user));
  }

  /**
   * Create a new user
   * @param createUserDto - User creation data
   * @returns The newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if the email is already registered
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );

    // Create the user
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Save the user to the database
    return this.userRepository.save(newUser);
  }

  /**
   * Validate user credentials for authentication
   * @param email - User's email
   * @param password - User's plain text password
   * @returns User or throws an exception if credentials are invalid
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (
      !user ||
      !(await this.authService.comparePasswords(password, user.password))
    ) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
