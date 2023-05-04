import { Module } from "@nestjs/common";
import { WordsService } from "@/words/words.service";
import { WordsController } from "./words.controller";

@Module({
  providers: [WordsService],
  exports: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
