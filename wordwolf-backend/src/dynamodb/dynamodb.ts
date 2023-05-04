import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DynamoDBClient, DynamoDBClientConfig, ListTablesCommand } from "@aws-sdk/client-dynamodb";

@Injectable()
export class DynamoDB {
  private dynamodbClient: DynamoDBClient;

  constructor(configService: ConfigService) {
    const dynamodbClientConfig: DynamoDBClientConfig = {
      region: configService.get<string>("dynamodb.region", ""),
    };

    const endpoint = configService.get<string | undefined>("dynamodb.endpoint");
    if (endpoint != undefined) {
      // endpointを指定するのはローカルで動作させるときだけ。
      // それ以外のときは指定せず、AWSのエンドポイントを使う。
      dynamodbClientConfig.endpoint = endpoint;
    }

    this.dynamodbClient = new DynamoDBClient(dynamodbClientConfig);
  }

  async listTables(): Promise<string> {
    const command = new ListTablesCommand({});
    const result = await this.dynamodbClient.send(command);
    return JSON.stringify(result);
  }
}
