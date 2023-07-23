import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Room } from "../entity/room";
import { User } from "../entity/user";
import { RoomsRepository } from "../repository/rooms";
import { UsersRepository } from "../repository/users";

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository, private readonly usersRepository: UsersRepository) {}

  /**
   * 新しい部屋を作る
   * @param category 部屋のデフォルトカテゴリー
   * @param timeLimit 部屋のデフォルト議論時間
   * @return 部屋ID
   */
  createRoom(category: string, timeLimit: any): string {
    const roomId = randomUUID();
    const now = new Date();
    const room = new Room(roomId, category, timeLimit, now);
    this.roomsRepository.store(room);
    return roomId;
  }

  /**
   * 部屋に新しくユーザを作る
   * @param userName 新しいユーザのユーザ名
   * @param roomId ユーザを作る部屋ID
   * @return ユーザID
   * @throws 部屋が存在しない場合はエラーとする
   */
  makeUserInRoom(userName: string, roomId: string): string {
    const room = this.roomsRepository.findBy(roomId);
    if (room === undefined) {
      throw new Error(`room does not exist: ${roomId}`);
    }

    const userId = randomUUID();
    const user = new User(userId, userName, roomId);
    this.usersRepository.store(user);
    return userId;
  }

  /**
   * 作成済みのユーザを入室させる
   * 最初に入室するユーザはオーナーとする
   * @param userId ユーザID
   * @param roomId 部屋ID
   * @returns オーナーになったらtrue、そうでなければfalse
   * @throws 部屋が存在しないかユーザが部屋に作成されていない場合はエラー
   */
  joinRoom(userId: string, roomId: string): boolean {
    const room = this.roomsRepository.findBy(roomId);
    if (room === undefined) {
      throw new Error(`room does not exist: ${roomId}`);
    }
    const user = this.usersRepository.findBy(userId);
    if (user === undefined) {
      throw new Error(`user does not exist: ${userId}`);
    }
    if (user.roomId !== room.roomId) {
      throw new Error(`user ${userId} does not exist in the room ${roomId}`);
    }

    user.joinRoom();

    if (this.usersRepository.joinedUsersOfRoom(roomId).length === 0) {
      user.setToBeOwner();
      return true;
    } else {
      return false;
    }
  }
}
