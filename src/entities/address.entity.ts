import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { City, Profile } from './index';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  street: string;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinTable({ name: 'cities' })
  city: City;

  @OneToOne(() => Profile, (profile) => profile.address)
  profile: Profile;
}
