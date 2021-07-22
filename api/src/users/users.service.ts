import { TeamsService } from './../teams/teams.service';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private teamsService: TeamsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = this.usersRepository.create(createUserDto);
    user = await this.usersRepository.save(user);
    const team = await this.teamsService.create({
      ownerId: user.id,
      name: createUserDto.teamName,
    });
    user.teamId = team.id;
    user = await this.usersRepository.save(user);
    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
