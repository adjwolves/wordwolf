export class EventsModule {}
import { Module } from "@nestjs/common";
import { RoomsController } from "./controller/rooms.controller";
import { RoomsService } from "./service/rooms.service";
import { RoomsGateway } from "./gateway/rooms.gateway";
import { RoomsRepository } from "./repository/rooms";
import { UsersRepository } from "./repository/users";

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, RoomsRepository, UsersRepository],
})
export class RoomsModule {}
