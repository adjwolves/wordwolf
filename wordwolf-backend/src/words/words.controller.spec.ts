import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";
import configuration from "@/config/configuration";

describe("WordsController", () => {
  let controller: WordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"] })],
      controllers: [WordsController],
      providers: [WordsService],
    }).compile();

    controller = module.get<WordsController>(WordsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
