import { Module } from "@nestjs/common";
import { WordsService } from "@/words/words.service";
import { WordsController } from "./words.controller";
import { DynamoDBModule } from "@/dynamodb/dynamodb.module";

@Module({
  imports: [DynamoDBModule],
  providers: [WordsService],
  exports: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
