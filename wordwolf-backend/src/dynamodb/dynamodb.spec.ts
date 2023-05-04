import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DynamoDB } from "./dynamodb";
import configuration from "@/config/configuration";

describe("Dynamodb", () => {
  let provider: DynamoDB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"] })],
      providers: [DynamoDB],
    }).compile();

    provider = module.get<DynamoDB>(DynamoDB);
  });

  it("should be defined", () => {
    expect(provider).toBeDefined();
  });
});
