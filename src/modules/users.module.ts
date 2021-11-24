import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users/users.controller';
import { Address, City, Country, Profile } from 'src/entities';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Address, City, Country])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
