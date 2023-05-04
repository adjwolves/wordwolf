import { IsNotEmpty } from 'class-validator';

export class joinRoomDto {
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  userName: string;
}
