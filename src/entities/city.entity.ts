import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Address, Country } from './index';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinTable({ name: 'country' })
  country: Country;

  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}
