import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CongregationsService } from './congregations.service';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { UpdateCongregationDto } from './dto/update-congregation.dto';
import { UUID } from 'crypto';

@Controller('congregations')
export class CongregationsController {
  constructor(private readonly congregationsService: CongregationsService) {}

  @Post()
  create(@Body() createCongregationDto: CreateCongregationDto) {
    return this.congregationsService.create(createCongregationDto);
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
