import { Module } from "@nestjs/common";
import { RoomModule } from "./rooms/rooms.module";

@Module({
  imports: [RoomModule],
})
export class AppModule {}
