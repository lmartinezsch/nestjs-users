import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { Address, City, Country, Profile } from 'src/entities';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Address, City, Country])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
