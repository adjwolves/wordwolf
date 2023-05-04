import { Injectable } from "@nestjs/common";
import { User } from "../entity/user";

@Injectable()
export class UsersRepository {
  private users: User[] = [];
  store(user: User) {
    this.users.push(user);
  }
}
