import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UsersCreatedListener } from './listeners/users-created.listener';
import { UsersAccessRequestListener } from './listeners/users-access_request.listener';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersCreatedListener, UsersAccessRequestListener],
})
export class UsersModule {}
