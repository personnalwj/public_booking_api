import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/helpers/types';
import { AuthzGuard } from 'src/authz/guards/authz.guard';
import { User as UserDecorator } from 'src/authz/decorators/user.decorators';
import { Roles } from 'src/authz/decorators/roles.decorators';
import KindeService from 'src/services/kinde/kinde.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SubscibeUserDto } from './dto/subscribe-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly kindeService: KindeService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private readonly logger = new Logger();

  @Post()
  @UseGuards(AuthzGuard)
  @Roles(['admin'])
  async create(
    @Body() createUserDto: CreateUserDto,
    @UserDecorator() admin: IUser,
  ): Promise<User> {
    try {
      /**
       * @todo replace with the auth service base on supertokens
       */
      const kindeUser = await this.kindeService.createUser(createUserDto);
      const userCreated = await this.usersService.create(
        createUserDto,
        admin.sub,
        kindeUser.id,
      );
      this.logger.log(
        JSON.stringify(userCreated),
        `${UsersController.name}: /users`,
      );
      this.eventEmitter.emit('user:created', { user: userCreated, admin });
      return userCreated;
    } catch (error) {
      throw new HttpException({ message: 'Could not create user' }, 500);
    }
  }

  @Post('/request_access')
  @HttpCode(201)
  async requestAccess(@Body() userSubscriber: SubscibeUserDto) {
    try {
      this.eventEmitter.emit('user:access_request', userSubscriber);
      this.logger.log(
        JSON.stringify(userSubscriber),
        `${UsersController.name}: /users/request_access`,
      );
      return {
        message: 'Request for access sent',
      };
    } catch (error) {
      this.logger.error(
        JSON.stringify(error),
        `${UsersController.name}: /users/request_access`,
      );
      throw new HttpException(
        { message: error.message, code: error.code },
        error.status,
      );
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/congregation')
  @UseGuards(AuthzGuard)
  async findUserCongregation(@UserDecorator() user: IUser) {
    try {
      const userWithCongration = await this.usersService.findUserCongregations(
        user.sub,
      );
      this.logger.log(
        JSON.stringify(userWithCongration),
        `${UsersController.name}: /users/congregations`,
      );
      return userWithCongration;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { message: 'Could not find user congregations' },
        500,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
