import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, ReadUserDto, AuthCredentialDto } from 'src/dtos/auth';
import { User, Profile, Address, City } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async register(bodyReq: Partial<CreateUserDto>) {
    const userExist: User = await this.usersRepository.findOne({
      where: { username: bodyReq.username },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const user: User = new User();
    user.username = bodyReq.username;
    user.password = bodyReq.password;
    const newUserEntity = await this.usersRepository.save(user);

    const cityEntity: City = await this.cityRepository.findOne(bodyReq.cityId);

    if (!cityEntity) {
      throw new BadRequestException("City doesn't exist");
    }
    const address = new Address();
    address.street = bodyReq.address;
    address.city = cityEntity;
    const newAddressEntity = await this.addressRepository.save(address);

    const profile: Profile = new Profile();
    profile.name = bodyReq.name;
    profile.user = newUserEntity;
    profile.address = newAddressEntity;
    await this.profilesRepository.save(profile);

    return;
  }

  async login(authCredential: Partial<AuthCredentialDto>) {
    const { username, password } = authCredential;
    const userFound: User = await this.usersRepository.findOne({ username });

    if (!userFound) {
      throw new BadRequestException('Invalid credentials');
    }

    if (userFound && !(await userFound.validatePassword(password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return 'bien';
  }
  /*
  async findAll(): Promise<ReadUserDto[]> {
    //return this.usersRepository.find();
    const users: User[] = await this.usersRepository.find({
      where: { isActive: true },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async findOne(id: number): Promise<ReadUserDto> {
    const user: User = await this.usersRepository.findOne(id, {
      where: { isActive: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async remove(id: number): Promise<void> {
    const userExist: User = await this.usersRepository.findOne(id);

    if (!userExist) {
      throw new NotFoundException();
    }

    //await this.usersRepository.delete(id);
    await this.usersRepository.update(id, { isActive: false });
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const user: User = await this.usersRepository.findOne(id, {
      where: { isActive: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.update(id, updateUserDto);

    return plainToClass(UpdateUserDto, user);
  }*/
}
