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
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/helpers/types';
import { th } from '@faker-js/faker';

@Controller('congregations')
export class CongregationsController {
  constructor(private readonly congregationsService: CongregationsService) {}
  private readonly logger = new Logger(CongregationsController.name);

  @Post()
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('admin'),
        UserRoles.UserRoleClaim.validators.excludes('responsible'),
      ],
      checkDatabase: true,
    }),
  )
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
      await UserRoles.addRoleToUser('public', user.sub, 'responsible');
      this.logger.log({
        message: 'Congregation created',
        congregation: congregation,
      });
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
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('responsible'),
      ],
      checkDatabase: true,
    }),
  )
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
