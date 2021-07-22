import { Board } from './../../boards/entities/board.entity';
import { User } from './../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'int', nullable: true })
  ownerId: number;

  @OneToMany(() => User, (user) => user.team)
  members: User[];

  @OneToMany(() => Board, (board) => board.team)
  boards: Board[];
}
