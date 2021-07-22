import { Team } from './../../teams/entities/team.entity';
import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const SALT_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 320 })
  @Index({ unique: true })
  email: string;

  @Column({ length: 256 })
  name: string;

  @ManyToOne(() => Team, (team) => team.members, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({ type: 'int', nullable: true })
  teamId: number;

  /** PASSWORD CONTROL FLOW */

  // The password is stored as a salted hash.
  @Exclude()
  @Column()
  password: string;

  @Exclude()
  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password !== this.tempPassword) {
      this.password = hashSync(this.password, SALT_ROUNDS);
    }
    this.email = this.email.toLowerCase();
  }
}
