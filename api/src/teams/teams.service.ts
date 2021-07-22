import { User } from './../users/entities/user.entity';
import { Team } from './entities/team.entity';
import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = this.teamsRepository.create({
      name: createTeamDto.name,
      ownerId: createTeamDto.ownerId,
    });
    return this.teamsRepository.save(team);
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
