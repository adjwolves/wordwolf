import { Test } from "@nestjs/testing";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "../service/rooms.service";
import { CreateRoomDto } from "../dto/rooms.controller";
import { RoomsRepository } from "../repository/rooms";
import { UsersRepository } from "../repository/users";

describe("RoomsController", () => {
  let roomsController: RoomsController;
  let roomsService: RoomsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService, RoomsRepository, UsersRepository],
    }).compile();
    roomsController = moduleRef.get(RoomsController);
    roomsService = moduleRef.get(RoomsService);
  });

  describe("createRoom()", () => {
    it("should return roomId", () => {
      const createRoomDto = new CreateRoomDto();
      createRoomDto.category = "fruit";
      jest.spyOn(roomsService, "createRoom").mockImplementation(() => "roomId");
      expect(roomsController.createRoom(createRoomDto)).toBe("roomId");
    });
  });
});
