import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

export interface ISignedInPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validatePayload(payload: ISignedInPayload): Promise<User | null> {
    const user = await this.usersService.findOne(payload.sub);
    return user || null;
  }

  async signIn(user: User) {
    const payload: ISignedInPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }

  async signUp(signUpDto: CreateUserDto) {
    const user = await this.usersService.create(signUpDto);
    return user;
  }
}
