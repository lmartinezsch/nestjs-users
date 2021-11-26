import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Profile, Address, City } from './entities';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { ProfileResponse } from './interfaces/profile-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(bodyReq: CreateUserDto): Promise<void> {
    const userExist: User = await this.userRepository.findOne({
      where: { username: bodyReq.username },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const user: User = new User();
    user.username = bodyReq.username;
    user.password = bodyReq.password;
    const newUserEntity = await this.userRepository.save(user);

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
    await this.profileRepository.save(profile);

    return;
  }

  async findOneByCredentials(
    authCredentialDto: AuthCredentialDto,
  ): Promise<User> {
    const { username, password } = authCredentialDto;
    const userFound: User = await this.userRepository.findOne({ username });

    if (!userFound) {
      throw new BadRequestException('Invalid credentials');
    }

    if (userFound && !(await userFound.validatePassword(password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return userFound;
  }

  async profile(user: any): Promise<ProfileResponse> {
    const userProfile = await this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('profile.name', 'name')
      .addSelect('address.street', 'street')
      .addSelect('city.name', 'city')
      .addSelect('country.name', 'country')
      .leftJoin('user.profile', 'profile')
      .leftJoin('profile.address', 'address')
      .leftJoin('address.city', 'city')
      .leftJoin('city.country', 'country')
      .where('user.username = :userNameParam', { userNameParam: user.username })
      .printSql()
      .getRawOne();

    const response: ProfileResponse = {
      id: userProfile.id,
      name: userProfile.name,
      address: {
        street: userProfile.street,
        city: userProfile.city,
        country: userProfile.country,
      },
    };

    return response;
  }
}
