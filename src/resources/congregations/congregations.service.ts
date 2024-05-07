import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { UpdateCongregationDto } from './dto/update-congregation.dto';
import { Congregation } from './entities/congregation.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UUID } from 'crypto';
import { User } from '../users/entities/user.entity';
import { IUser } from 'src/helpers/types';

@Injectable()
export class CongregationsService {
  private readonly logger = new Logger(CongregationsService.name);
  constructor(
    @InjectRepository(Congregation)
    private readonly congregationRepository: EntityRepository<Congregation>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}
  async create(createCongregationDto: CreateCongregationDto, user: IUser) {
    try {
      const congregation = this.congregationRepository.create(
        createCongregationDto,
      );
      const createdUser = await this.userRepository.create({
        congregation: congregation,
        sub: user.sub,
        email: user.email,
      });
      congregation.responsible = createdUser;
      this.em.persist(congregation);
      await this.em.flush();
      return congregation;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  findAll() {
    try {
      return this.congregationRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        error,
      });
    }
  }

  findOne(id: UUID) {
    try {
      return this.congregationRepository.findOneOrFail(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Congregation not found', 404);
    }
  }

  async update(id: UUID, updateCongregationDto: UpdateCongregationDto) {
    try {
      await this.congregationRepository.findOneOrFail(id);
      const congregation = await this.congregationRepository.upsert(
        updateCongregationDto,
      );
      await this.em.flush();
      return congregation;
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException({
        message: 'Could not update congregation',
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} congregation`;
  }
}
