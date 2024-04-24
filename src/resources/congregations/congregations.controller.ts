import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { IsNotResponsible } from '../users/guards/is-not-responsible.guard';

@Controller('congregations')
export class CongregationsController {
  constructor(private readonly congregationsService: CongregationsService) {}

  @Post()
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('admin'),
      ],
    }),
    IsNotResponsible,
  )
  create(
    @Body()
    createCongregationDto: CreateCongregationDto,
    @User() user: IUser,
  ) {
    return this.congregationsService.create(createCongregationDto, user);
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
  update(
    @Param('id') id: string,
    @Body() updateCongregationDto: UpdateCongregationDto,
  ) {
    return this.congregationsService.update(+id, updateCongregationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congregationsService.remove(+id);
  }
}
