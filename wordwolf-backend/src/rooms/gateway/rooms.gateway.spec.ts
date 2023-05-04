import { Test, TestingModule } from "@nestjs/testing";
import { EventsGateway } from "./rooms.gateway";
import { RoomService } from "../service/rooms.service";
import { RoomRepository } from "../repository/rooms.roomRepository";
import { UserRepository } from "../repository/rooms.userRepository";

describe("EventsGateway", () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService, EventsGateway, RoomRepository, UserRepository],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
