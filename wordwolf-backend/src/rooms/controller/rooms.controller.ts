import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { RoomsService } from "../service/rooms.service";
import { CreateRoomDto, CreateUserDto } from "../dto/rooms.controller";
import { RoomsRepository } from "../repository/rooms";
import { UsersRepository } from "../repository/users";

@Controller("room")
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly roomsRepository: RoomsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    const roomId = this.roomsService.createRoom(createRoomDto.category, createRoomDto.timeLimit);
    return roomId;
  }

  @Post(":roomId/user")
  createUserInRoom(@Param("roomId") roomId: string, @Body() createUserDto: CreateUserDto) {
    const userId = this.roomsService.createUserInRoom(createUserDto.userName, roomId)
    return userId;
  }

  @Get(":roomId")
  getRoomInfo(@Param("roomId") roomId: string) {
    const room = this.roomsRepository.findBy(roomId);
    if (room === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `The room ${roomId} does not exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const joinedUsers = this.usersRepository.joinedUsersOfRoom(roomId);

    return {
      roomId: room.roomId,
      category: room.category,
      timeLimit: room.timeLimit,
      users: joinedUsers.map((u) => ({
        userId: u.userId,
        userName: u.userName,
        isOwner: u.isOwner,
      })),
    };
  }
}
