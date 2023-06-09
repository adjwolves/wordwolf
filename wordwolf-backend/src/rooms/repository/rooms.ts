import { Injectable } from "@nestjs/common";
import { Room } from "../entity/room";

@Injectable()
export class RoomsRepository {
  private rooms: Room[] = [];
  store(room: Room) {
    this.rooms.push(room);
  }
  findBy(roomId: string): Room | undefined {
    return this.rooms.find((element) => element.roomId === roomId);
  }
}
