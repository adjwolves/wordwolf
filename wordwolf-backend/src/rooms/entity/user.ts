export class User {
  // userのID
  userId: string;
  userName: string;
  // isOwnerは有効化するまではundefined
  isOwner?: boolean;
  // TODO: roomIdからのUser参照が多すぎる場合、変更
  roomId: string;
  role?: string;

  // 入室した状態かどうか
  joined: boolean;

  constructor(userId: string, userName: string, roomId: string) {
    this.userId = userId;
    this.userName = userName;
    this.roomId = roomId;
    this.joined = false;
  }

  get hasJoined(): boolean {
    return this.joined;
  }

  /**
   * 部屋に入室させる
   */
  joinRoom(): void {
    this.joined = true;
  }

  /**
   * 部屋のオーナーに設定する
   */
  setToBeOwner(): void {
    this.isOwner = true;
  }
}
