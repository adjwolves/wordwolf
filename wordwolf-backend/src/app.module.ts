import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WordsModule } from "./words/words.module";
import configuration from "@/config/configuration";

@Module({
  // envFilePathの複数ファイルに同じ変数が出てくる場合、先の方が優先
  imports: [
    ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"], isGlobal: true }),
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
