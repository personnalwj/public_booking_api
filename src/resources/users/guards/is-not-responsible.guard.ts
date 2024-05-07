import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class IsNotResponsible implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  private readonly logger = new Logger('isNotResponsibleGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.getUserId();
    const user = await this.userRepository.findOne(
      {
        sub: userId,
      },
      {
        populate: ['congregation'],
      },
    );
    if (!user) {
      this.logger.log('no user found');
      return true;
    }
    if (user && user.congregation.responsible.id === user.id) {
      this.logger.log({
        user: user,
        message: 'User is already responsible',
      });
      throw new ConflictException(
        'You are already responsible for a congregation',
      );
    }
    this.logger.log({
      message: 'User is not responsible of a congregation',
      user: user,
    });
    return user.congregation.responsible.id !== user.id;
  }
}
