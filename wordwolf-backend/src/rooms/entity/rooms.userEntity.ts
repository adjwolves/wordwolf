export class User {
  constructor(
    sessionId: string,
    connectionId: string,
    userName: string,
    isOwner: boolean,
    roomId: string,
  ) {
    this.sessionId = sessionId;
    this.connectionId = connectionId;
    this.userName = userName;
    this.isOwner = isOwner;
    this.roomId = roomId;
  }
  sessionId: string;
  connectionId: string;
  userName: string;
  isOwner: boolean;
  roomId: string;
  // TODO: 要検討
  role: 'wolf' | 'human';
}
