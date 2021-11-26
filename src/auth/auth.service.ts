import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByCredentials({
      username,
      password,
    });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
