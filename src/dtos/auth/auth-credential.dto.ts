import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@Exclude()
export class AuthCredentialDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  readonly username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
