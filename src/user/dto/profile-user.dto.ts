import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ReadAddressDto } from './read-address.dto';

@Exclude()
export class ProfileUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  readonly address: ReadAddressDto;
}
