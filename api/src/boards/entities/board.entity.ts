import { Team } from './../../teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  name: string;

  @ManyToOne(() => Team, (team) => team.boards)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({ type: 'int', nullable: true })
  teamId: number;
}
