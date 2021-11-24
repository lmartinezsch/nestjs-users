import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MaxLength } from 'class-validator';

@Exclude()
export class UpdateUserDto {
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

  @Expose()
  @IsBoolean()
  readonly isActive: boolean;
}
