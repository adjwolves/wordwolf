import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  category!: string;

  timeLimit = "300";
}

export class CreateUserDto {
  @IsNotEmpty()
  userName!: string;
}
