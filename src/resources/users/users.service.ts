import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      this.em.persist(user);
      this.em.flush();
      this.logger.log({
        message: 'User created',
        user: user,
      });
      return user;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserCongregations(sub: string) {
    try {
      const user = await this.userRepository.findOneOrFail(
        { sub },
        {
          populate: ['congregation'],
        },
      );
      return user;
    } catch (error) {}
  }
}
