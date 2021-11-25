import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { City } from './index';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 2 })
  iso2: string;

  @Column({ type: 'varchar', nullable: false, length: 3 })
  iso3: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
