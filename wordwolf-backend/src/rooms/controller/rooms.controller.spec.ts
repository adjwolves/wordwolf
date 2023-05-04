import { Test } from '@nestjs/testing';
import { RoomController } from './rooms.controller';
import { RoomService } from '../service/rooms.service';
import { CreateRoomDto } from '../dto/rooms.controller';
import { RoomRepository } from '../repository/rooms.roomRepository';
import { UserRepository } from '../repository/rooms.userRepository';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomService: RoomService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService, RoomRepository, UserRepository],
    }).compile();
    roomController = moduleRef.get(RoomController);
    roomService = moduleRef.get(RoomService);
  });

  describe('createRoom()', () => {
    it('should return roomId', () => {
      const createRoomDto = new CreateRoomDto();
      createRoomDto.category = 'fruit';
      jest.spyOn(roomService, 'createRoom').mockImplementation(() => 'roomId');
      expect(roomController.createRoom(createRoomDto)).toBe('roomId');
    });
  });
});
