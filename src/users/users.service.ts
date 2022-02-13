import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirm)
      throw new HttpException('Invalid password confirm', 400);

    //check if user exists
    let user = await this.usersRepository.findOne({ email: createUserDto.email });
    if (user) throw new HttpException('User already exists', 400);

    user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.usersRepository.findOne(id);

    if (!user) throw new HttpException('User not found', 400);

    if (updateUserDto.password !== updateUserDto.passwordConfirm)
      throw new HttpException('Invalid password confirm', 400);

    user = { ...user, ...updateUserDto };

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
