export class Room {
  constructor(
    roomId: string,
    category: string,
    timeLimit: any,
    createdAt: Date,
  ) {
    this.roomId = roomId;
    this.category = category;
    this.timeLimit = timeLimit;
    this.createdAt = createdAt;
  }
  roomId: string;
  category: string;
  // TODO: 以下、要検討
  state: 'ready' | 'playing' | 'finish' = 'ready';
  timeLimit: any;
  createdAt: Date;
}
