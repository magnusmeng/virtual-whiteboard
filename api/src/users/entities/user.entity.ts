import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

const SALT_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 320 })
  email: string;

  @Column({ length: 256 })
  name: string;

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
  }
}
