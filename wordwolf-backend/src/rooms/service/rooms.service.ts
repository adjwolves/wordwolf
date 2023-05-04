import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Room } from '../entity/rooms.roomEntitty';
import { RoomRepository } from '../repository/rooms.roomRepository';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}
  createRoom(category: string, timeLimit: any): string {
    const roomId = randomUUID();
    const now = new Date();
    const room = new Room(roomId, category, timeLimit, now);
    this.roomRepository.store(room);
    return roomId;
  }
}
