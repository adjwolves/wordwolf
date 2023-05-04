import { Injectable } from '@nestjs/common';
import { Room } from '../entity/rooms.roomEntitty';

@Injectable()
export class RoomRepository {
  private rooms: Room[] = [];
  store(room: Room) {
    this.rooms.push(room);
  }
}
