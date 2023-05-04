import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as testRequest from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateRoomDto } from './../src/rooms/dto/rooms.controller';
import { ValidationPipe } from '@nestjs/common';
import { io } from 'socket.io-client';
import axios from 'axios';

describe('RoomController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterEach(() => app.close());

  describe('/room (POST)', () => {
    it('should return 201', () => {
      const createRoomDto = new CreateRoomDto();
      createRoomDto.category = 'fruit';
      return testRequest(app.getHttpServer())
        .post('/room')
        .send(createRoomDto)
        .expect(201);
    });
    it('should return 400', () => {
      return testRequest(app.getHttpServer())
        .post('/room')
        .send({})
        .expect(400);
    });
  });
});

describe('EventsGateway (e2e)', () => {
  let app: INestApplication;
  let roomId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3001);
  });
  afterEach(() => app.close());

  describe('join-room', () => {
    it('should return sessionId', async () => {
      const createRoomDto = new CreateRoomDto();
      createRoomDto.category = 'fruit';
      const response = await axios.post(
        'http://localhost:3001/room',
        JSON.stringify(createRoomDto),
      );
      roomId = response.data;

      const socket = io('http://localhost:3001');
      const sessionId = await socket.emitWithAck('join-room', {
        roomId: roomId,
        userName: 'John Doe',
      });
      expect(sessionId).toBeDefined();
      socket.close();

      const socket2 = io('http://localhost:3001');
      const sessionId2 = await socket2.emitWithAck('join-room', {
        roomId: roomId,
        userName: 'John Doe',
      });
      expect(sessionId).not.toBe(sessionId2);
      socket2.close();
    });
  });
});
