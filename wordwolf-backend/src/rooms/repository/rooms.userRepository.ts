import { Injectable } from "@nestjs/common";
import { User } from "../entity/rooms.userEntity";

@Injectable()
export class UserRepository {
  private users: User[] = [];
  store(user: User) {
    this.users.push(user);
  }
}
