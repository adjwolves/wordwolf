import { Controller, Post, Body } from "@nestjs/common";
import { RoomsService } from "../service/rooms.service";
import { CreateRoomDto } from "../dto/rooms.controller";

@Controller("room")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    const roomId = this.roomsService.createRoom(createRoomDto.category, createRoomDto.timeLimit);
    return roomId;
  }
}
