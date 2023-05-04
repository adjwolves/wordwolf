import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { RoomService } from "../service/rooms.service";
import { JoinRoomDto } from "../dto/rooms.gateway";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
export class EventsGateway {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  io!: Server;

  @SubscribeMessage("join-room")
  async joinRoom(@MessageBody() body: JoinRoomDto): Promise<string> {
    const roomId = body.roomId;
    const userName = body.userName;

    const toBeOwner = (await this.io.in(roomId).fetchSockets()).length !== 0;

    let connectionId = "";
    this.io.on("connection", (socket) => {
      socket.join(roomId);
      connectionId = socket.id;
    });

    const sessionId = this.roomService.joinRoom(userName, connectionId, toBeOwner, roomId);
    return sessionId;
  }
}
