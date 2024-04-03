import { PartialType } from '@nestjs/mapped-types';
import { CreateCongregationDto } from './create-congregation.dto';

export class UpdateCongregationDto extends PartialType(CreateCongregationDto) {}
