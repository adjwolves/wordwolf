import { Controller, Post, Body } from "@nestjs/common";
import { RoomService } from "../service/rooms.service";
import { CreateRoomDto } from "../dto/rooms.controller";

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    const roomId = this.roomService.createRoom(createRoomDto.category, createRoomDto.timeLimit);
    return roomId;
  }
}
