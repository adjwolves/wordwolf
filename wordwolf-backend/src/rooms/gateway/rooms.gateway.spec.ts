import { Test, TestingModule } from "@nestjs/testing";
import { RoomsGateway } from "./rooms.gateway";
import { RoomsService } from "../service/rooms.service";
import { RoomsRepository } from "../repository/rooms";
import { UsersRepository } from "../repository/users";

describe("RoomsGateway", () => {
  let gateway: RoomsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, RoomsGateway, RoomsRepository, UsersRepository],
    }).compile();

    gateway = module.get<RoomsGateway>(RoomsGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
