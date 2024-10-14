import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IUser } from 'src/helpers/types';
import KindeService from 'src/services/auth/kinde.service';

@Injectable()
export class CongregationCreatedListener {
  constructor(private readonly kindeService: KindeService) {}
  private readonly logger = new Logger(CongregationCreatedListener.name);

  @OnEvent('congregation:created')
  async handleCongregationCreatedEvent(payload: IUser) {
    try {
      this.logger.log(`[congregation:create]: ${JSON.stringify(payload)}`);
      await this.kindeService.updateUsersRoles(payload, ['responsible']);
    } catch (error) {
      this.logger.error(`[congregation:create]: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}
