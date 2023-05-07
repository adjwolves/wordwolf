import Head from "next/head";
import { ReactElement } from "react";
import styles from "@/styles/GameLayout.module.css";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function GameLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={`${styles.gameArea}`}>{children}</div>
      </main>
    </>
  );
}
