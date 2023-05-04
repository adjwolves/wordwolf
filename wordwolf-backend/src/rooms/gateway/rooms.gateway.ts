import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RoomService } from '../service/rooms.service';
import { joinRoomDto } from '../dto/rooms.gateway';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('join-room')
  async joinRoom(@MessageBody() body: joinRoomDto): Promise<string> {
    const roomId = body.roomId;
    const userName = body.userName;

    const usersInRoom = await this.io.in(roomId).fetchSockets();
    const isOwner = Boolean(usersInRoom.length);
    let sessionId = '';

    this.io.on('connection', (socket) => {
      socket.join(roomId);

      sessionId = this.roomService.joinRoom(
        userName,
        socket.id,
        isOwner,
        roomId,
      );
    });
    return sessionId;
  }
}
