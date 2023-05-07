import Head from "next/head";
//import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import GameLayout from "@/components/GameLayout";
import { ReactElement } from "react";

// next/fontを使いたくなるかもしれないのでいったん残しておく
//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ワードウルフ</title>
      </Head>
      <div className={`${styles.gameTitleBox}`}>
        <h2 className={`${styles.gameTitle}`}>ワードウルフ</h2>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};
