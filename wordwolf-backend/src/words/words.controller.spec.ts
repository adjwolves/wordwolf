import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";
import configuration from "@/config/configuration";
import { DynamoDBModule } from "@/dynamodb/dynamodb.module";

describe("WordsController", () => {
  let controller: WordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"], isGlobal: true }),
        DynamoDBModule,
      ],
      controllers: [WordsController],
      providers: [WordsService],
    }).compile();

    controller = module.get<WordsController>(WordsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
