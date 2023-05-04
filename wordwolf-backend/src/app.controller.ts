import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { WordsService } from "./words/words.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly wordsService: WordsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/dynamotest")
  async dynamodbTest(): Promise<string> {
    return await this.wordsService.listTables();
  }
}
