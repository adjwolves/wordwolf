export class User {
  constructor(sessionId: string, connectionId: string, userName: string, isOwner: boolean, roomId: string) {
    this.sessionId = sessionId;
    this.connectionId = connectionId;
    this.userName = userName;
    this.isOwner = isOwner;
    this.roomId = roomId;
  }
  // userのSessionのID
  sessionId: string;
  // Socket.IOのコネクションのID
  connectionId: string;
  userName: string;
  isOwner: boolean;
  roomId: string;
  role?: string;
}
