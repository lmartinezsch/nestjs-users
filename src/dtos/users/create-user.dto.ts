import { Exclude, Expose } from 'class-transformer';
import {
  IsNumber,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsEmail()
  @MaxLength(50, { message: 'This username is not valid' })
  @IsNotEmpty()
  readonly username: string;

  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(50, { message: 'This password is not valid' })
  @IsNotEmpty()
  readonly password: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  @IsNotEmpty()
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This address is not valid' })
  @IsNotEmpty()
  readonly address: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly cityId: string;
}
