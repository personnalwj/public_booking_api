import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Spot } from './entities/spot.entity';

@Module({
  controllers: [SpotsController],
  providers: [SpotsService],
  imports: [MikroOrmModule.forFeature([Spot])],
})
export class SpotsModule {}
