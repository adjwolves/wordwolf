import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { WordsService } from "./words.service";
import configuration from "@/config/configuration";

describe("WordsService", () => {
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"] })],
      providers: [WordsService],
    }).compile();

    service = module.get<WordsService>(WordsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
