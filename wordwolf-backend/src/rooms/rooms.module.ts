export class EventsModule {}
import { Module } from "@nestjs/common";
import { RoomController } from "./controller/rooms.controller";
import { RoomService } from "./service/rooms.service";
import { EventsGateway } from "./gateway/rooms.gateway";
import { RoomRepository } from "./repository/rooms.roomRepository";
import { UserRepository } from "./repository/rooms.userRepository";

@Module({
  controllers: [RoomController],
  providers: [RoomService, EventsGateway, RoomRepository, UserRepository],
})
export class RoomModule {}
