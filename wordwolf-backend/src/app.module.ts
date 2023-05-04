import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RoomsModule } from "./rooms/rooms.module";
import { WordsModule } from "./words/words.module";
import configuration from "@/config/configuration";

@Module({
  // envFilePathの複数ファイルに同じ変数が出てくる場合、先の方が優先
  imports: [
    ConfigModule.forRoot({ load: [configuration], envFilePath: [".env.local", ".env"], isGlobal: true }),
    RoomsModule,
    WordsModule,
  ],
})
export class AppModule {}
