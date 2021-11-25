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

@Exclude()
export class ReadAddressDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly street: string;
}
