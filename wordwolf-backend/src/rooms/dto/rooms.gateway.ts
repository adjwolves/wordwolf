import { IsNotEmpty } from "class-validator";

export class JoinRoomDto {
  @IsNotEmpty()
  roomId!: string;

  @IsNotEmpty()
  userName!: string;
}
