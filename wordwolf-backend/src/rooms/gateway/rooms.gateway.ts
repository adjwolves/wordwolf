import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsService } from "../service/rooms.service";
import { JoinRoomDto } from "../dto/rooms.gateway";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer()
  io!: Server;

  @SubscribeMessage("join-room")
  async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() body: JoinRoomDto): Promise<string> {
    const roomId = body.roomId;
    const userId = body.userId;
    this.roomsService.joinRoom(userId, roomId);
    socket.join(roomId);
    return userId;
  }
}
