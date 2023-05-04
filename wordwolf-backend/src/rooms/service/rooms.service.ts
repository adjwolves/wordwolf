import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Room } from "../entity/room";
import { User } from "../entity/user";
import { RoomsRepository } from "../repository/rooms";
import { UsersRepository } from "../repository/users";

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository, private readonly usersRepository: UsersRepository) {}
  createRoom(category: string, timeLimit: any): string {
    const roomId = randomUUID();
    const now = new Date();
    const room = new Room(roomId, category, timeLimit, now);
    this.roomsRepository.store(room);
    return roomId;
  }

  joinRoom(userName: string, connectionId: string, isOwner: boolean, roomId: string): string {
    const room = this.roomsRepository.findBy(roomId);
    if (room === undefined) {
      throw new Error(`room does not exist: ${roomId}`);
    }
    const sessionId = randomUUID();
    const user = new User(sessionId, connectionId, userName, isOwner, roomId);
    this.usersRepository.store(user);
    return sessionId;
  }
}
