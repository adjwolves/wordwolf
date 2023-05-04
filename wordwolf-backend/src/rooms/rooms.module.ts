export class EventsModule {}
import { Module } from '@nestjs/common';
import { RoomController } from './controller/rooms.controller';
import { RoomService } from './service/rooms.service';
import { EventsGateway } from './gateway/rooms.gateway';
import { RoomRepository } from './repository/rooms.roomRepository';

@Module({
  controllers: [RoomController],
  providers: [RoomService, EventsGateway, RoomRepository],
})
export class RoomModule {}
