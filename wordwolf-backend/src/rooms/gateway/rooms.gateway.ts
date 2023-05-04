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

    const usersInRoom = await this.io.in(roomId).fetchSockets();
    const isOwner = Boolean(usersInRoom.length);

    let sessionId = "";
    let connectionId = "";

    this.io.on("connection", async (socket) => {
      await socket.join(roomId);
      connectionId = socket.id;
    });

    sessionId = this.roomService.joinRoom(userName, connectionId, isOwner, roomId);
    return sessionId;
  }
}
