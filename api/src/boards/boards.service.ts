import { Board } from './entities/board.entity';
import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>
  ) {}

  create(createBoardDto: CreateBoardDto, user: User) {
    const board = this.boardsRepository.create(createBoardDto);
    board.teamId = user.team.id;
    return this.boardsRepository.save(board);
  }

  findAll(user: User) {
    return this.boardsRepository.find({
      teamId: user.teamId,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
