import { Exclude, Expose } from 'class-transformer';
import {
  IsNumber,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { MESSAGE, REGEX } from 'src/app.utils';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsEmail()
  @MaxLength(50, { message: 'This username is not valid' })
  @IsNotEmpty()
  readonly username: string;

  @Expose()
  @IsString()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGE.PASSWORD_RULE_MESSAGE,
  })
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
