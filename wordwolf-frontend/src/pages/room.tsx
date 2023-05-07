import Head from "next/head";
import { ReactElement } from "react";
import GameLayout from "@/components/GameLayout";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Room() {
  const router = useRouter();

  const roomId = router.query.roomId;
  const userName = router.query.userName;

  return (
    <>
      <Head>
        <title>ワードウルフ {roomId}</title>
      </Head>
      <p>部屋ID：{roomId}</p>
      <p>ユーザ名：{userName}</p>
      <Link href="/">トップに戻る</Link>
    </>
  );
}

Room.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};

