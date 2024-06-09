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
import { CongregationsService } from './congregations.service';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { UpdateCongregationDto } from './dto/update-congregation.dto';
import { UUID } from 'crypto';

import { IUser } from 'src/helpers/types';

import { AuthzGuard } from 'src/authz/guards/authz.guard';
import { User } from 'src/authz/decorators/user.decorators';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Roles } from 'src/authz/decorators/roles.decorators';
import { RolesGuard } from 'src/authz/guards/roles.guard';

@Controller('congregations')
export class CongregationsController {
  constructor(
    private readonly congregationsService: CongregationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private readonly logger = new Logger(CongregationsController.name);

  // use the API to verify in real-time if the user has the necessary permissions to access the resource
  @Post()
  @Roles(['admin'])
  @UseGuards(AuthzGuard, RolesGuard)
  async create(
    @Body()
    createCongregationDto: CreateCongregationDto,
    @User() user: IUser,
  ) {
    try {
      const congregation = await this.congregationsService.create(
        createCongregationDto,
        user,
      );
      this.logger.log({
        message: 'Congregation created',
        congregation: congregation,
      });
      this.eventEmitter.emit('congregation:created', user);
      return congregation;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { message: 'Could not create new congregation' },
        500,
      );
    }
  }

  @Get()
  findAll() {
    return this.congregationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.congregationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: UUID,
    @Body() updateCongregationDto: UpdateCongregationDto,
  ) {
    try {
      const updatedCongregation = await this.congregationsService.update(
        id,
        updateCongregationDto,
      );
      this.logger.log(JSON.stringify(updatedCongregation));
      return updatedCongregation;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { message: 'Could not update congregation' },
        500,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congregationsService.remove(+id);
  }
}
