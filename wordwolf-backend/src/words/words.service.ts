import { Injectable } from "@nestjs/common";
import { DynamoDB } from "@/dynamodb/dynamodb";

@Injectable()
export class WordsService {
  constructor(private readonly dynamoDB: DynamoDB) {}

  async listTables(): Promise<string> {
    return this.dynamoDB.listTables();
  }
}
