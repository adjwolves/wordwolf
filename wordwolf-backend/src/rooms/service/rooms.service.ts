import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Room } from '../entity/rooms.roomEntitty';
import { User } from '../entity/rooms.userEntity';
import { RoomRepository } from '../repository/rooms.roomRepository';
import { UserRepository } from '../repository/rooms.userRepository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
  ) {}
  createRoom(category: string, timeLimit: any): string {
    const roomId = randomUUID();
    const now = new Date();
    const room = new Room(roomId, category, timeLimit, now);
    this.roomRepository.store(room);
    return roomId;
  }

  joinRoom(
    userName: string,
    connectionId: string,
    isOwner: boolean,
    roomId: string,
  ): string {
    const sessionId = randomUUID();
    const user = new User(sessionId, connectionId, userName, isOwner, roomId);
    this.userRepository.store(user);
    return sessionId;
  }
}
