import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileResponse } from './interfaces/profile-response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req): Promise<ProfileResponse> {
    return this.userService.profile(req.user);
  }
}
