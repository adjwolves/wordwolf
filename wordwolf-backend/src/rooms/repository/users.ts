import { Injectable } from "@nestjs/common";
import { User } from "../entity/user";

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  store(user: User) {
    this.users.push(user);
  }

  findBy(userId: string): User | undefined {
    return this.users.find((element) => element.userId === userId);
  }

  /**
   * 部屋に入室済みのユーザ一覧を取得する
   */
  joinedUsersOfRoom(roomId: string): User[] {
    return this.users.filter((u) => u.roomId === roomId && u.hasJoined);
  }
}
