import { Module } from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import { CongregationsController } from './congregations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Congregation } from './entities/congregation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Congregation])],
  controllers: [CongregationsController],
  providers: [CongregationsService],
})
export class CongregationsModule {}
