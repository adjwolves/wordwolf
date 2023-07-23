import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import GameLayout from "@/components/GameLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { io, Socket } from "socket.io-client";

export default function Room() {
  const router = useRouter();

  const roomId = router.query.roomId;
  const [socket, setSocket] = useState<Socket>();

  const [names, setNames] = useState<string[]>([]);

  const onRefresh = async () => {
    const endpoint = `http://localhost:3010/room/${roomId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(endpoint, options);
    const obj = await response.json();
    console.log(obj);
    setNames(obj.users.map((u) => u.userName));

    console.log("refresh");
  };

  useEffect(() => {
    if (roomId === undefined) { return; }
    const userId = localStorage.getItem(`adjwolves:${roomId}`);
    if (userId === undefined) { return; }

    const socket = io("http://localhost:3010");
    socket.on("connect", () => {
      socket.emit("join-room", { roomId, userId });
      console.log(`${userId} has joined to ${roomId}: ${socket.id}`);
    });
    socket.on("refresh", onRefresh);
    onRefresh();
    setSocket(socket);
  }, [roomId]);

  return (
    <>
      <Head>
        <title>ワードウルフ {roomId}</title>
      </Head>
      <p>部屋ID：{roomId}</p>
      <p>ユーザ</p>
      <ul>
        {names.map((name) => <li key={name}>{name}</li>)}
      </ul>
      <Link href="/">トップに戻る</Link>
    </>
  );
}

Room.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};
