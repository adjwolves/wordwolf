import { Module } from "@nestjs/common";
import { DynamoDB } from "./dynamodb";

@Module({
  providers: [DynamoDB],
  exports: [DynamoDB],
})
export class DynamoDBModule {}
