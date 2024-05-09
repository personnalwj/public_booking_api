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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/helpers/types';
import { AuthzGuard } from 'src/authz/guards/authz.guard';
import { User } from 'src/authz/decorators/user.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger();

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/congregations')
  @UseGuards(AuthzGuard)
  async findUserCongregation(@User() user: IUser) {
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
