import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: Partial<UserService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    authService = {
      comparePasswords: jest.fn(),
      generateJwt: jest.fn(),
      hashPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    userController = module.get<UserController>(UserController);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        role: 'user',
      };

      (userService.findByEmail as jest.Mock).mockResolvedValue(undefined);
      (authService.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (userService.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userController.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      expect(result).toEqual({
        message: 'Usuário registrado com sucesso',
        user: { id: 1, email: 'test@example.com', role: 'user' },
      });
    });

    it('should throw an error if email is already registered', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(
        userController.register({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'user',
        }),
      ).rejects.toThrow(new HttpException('E-mail já está registrado', HttpStatus.BAD_REQUEST));
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user',
      };

      (userService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (authService.comparePasswords as jest.Mock).mockResolvedValue(true);
      (authService.generateJwt as jest.Mock).mockResolvedValue('mockToken');

      const result = await userController.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual({
        message: 'Login realizado com sucesso',
        token: 'mockToken',
      });
    });

    it('should throw an error for invalid credentials', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        userController.login({
          email: 'invalid@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(new HttpException('E-mail ou senha inválidos', HttpStatus.UNAUTHORIZED));
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, email: 'user1@example.com', role: 'user' },
        { id: 2, email: 'user2@example.com', role: 'admin' },
      ];

      (userService.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userController.getAllUsers();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('whoAmI', () => {
    it('should return authenticated user information', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' };

      const result = await userController.whoAmI({ user: mockUser });

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if no user is found', async () => {
      await expect(userController.whoAmI({ user: null })).rejects.toThrow(
        new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('getUserById', () => {
    it('should return user details by ID', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' };

      (userService.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userController.getUserById('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      (userService.findById as jest.Mock).mockResolvedValue(null);

      await expect(userController.getUserById('999')).rejects.toThrow(
        new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND),
      );
    });
  });
});
