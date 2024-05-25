import { Module } from '@nestjs/common';
import { EventListener } from './event.listener';

@Module({
  providers: [EventListener],
})
export class EventServiceModule {}
