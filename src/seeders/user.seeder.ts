import AppDataSource from 'ormconfig';
import { User } from 'src/user/entity/user.entity';

const seedData = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const admin = userRepository.create({
    name: 'toolsbyhumans',
    email: 'hello@toolsbyhumans.com',
    password: 'hashed_password', // Use Argon2 or bcrypt
    role: 'admin',
  });

  await userRepository.save(admin);

  console.log('Seed data added!');
  process.exit(0);
};

seedData().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
