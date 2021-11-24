import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly firstName: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This lastname is not valid' })
  readonly lastName: string;
}
