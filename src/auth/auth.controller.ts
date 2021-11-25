import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SETTINGS } from 'src/app.utils';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() authCredentialDto: AuthCredentialDto) {
    const userFound = await this.userService.findOneByCredentials(
      authCredentialDto,
    );
    return this.authService.login(userFound);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req) {
    return req.user;
  }
}
