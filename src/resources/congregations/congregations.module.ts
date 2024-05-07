import { Module } from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import { CongregationsController } from './congregations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Congregation } from './entities/congregation.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Congregation, User])],
  controllers: [CongregationsController],
  providers: [CongregationsService],
})
export class CongregationsModule {}
