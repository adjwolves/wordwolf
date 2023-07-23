import Head from "next/head";
//import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import GameLayout from "@/components/GameLayout";
import { ReactElement, useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";

// next/fontを使いたくなるかもしれないのでいったん残しておく
//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isOpenMakingModal, setIsOpenMakingModal] = useState(false);
  const openMakingModal = () => {
    setIsOpenMakingModal(true);
  };
  const closeMakingModal = () => {
    setIsOpenMakingModal(false);
  };

  return (
    <>
      <Head>
        <title>ワードウルフ</title>
      </Head>
      <div className={`${styles.gameTitleBox}`}>
        <h2 className={`${styles.gameTitle}`}>ワードウルフ</h2>
      </div>
      <div className={`${styles.gameMenuBox}`}>
        <div className={`${styles.gameMenu}`}>
          <Button color="primary" size="large" onClick={openMakingModal}>
            部屋をつくる
          </Button>
        </div>
        <div className={`${styles.gameMenu}`}>
          <Button color="secondary" size="large">
            部屋に入る
          </Button>
        </div>
      </div>

      <MakingModal open={isOpenMakingModal} onClose={closeMakingModal} categories={[["commodity", "日用品"]]} />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <GameLayout>{page}</GameLayout>;
};

interface MakingModalProps {
  open: boolean;
  onClose: () => void;
  categories: [string, string][]; // [id, description]
}

/**
 * 部屋を作るための入力を行うモーダル
 */
function MakingModal({ open, onClose, categories }: MakingModalProps) {
  const router = useRouter();

  // 「部屋をつくる」が押されたときに発火
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "word-category"?: { value: string };
      "time-limit"?: { value: string };
      "user-name"?: { value: string };
    };
    const dataRaw = {
      category: target["word-category"]?.value,
      timeLimit: target["time-limit"]?.value,
      userName: target["user-name"]?.value,
    };

    // TODO ちゃんと全体のバリデーションをする
    if (dataRaw.timeLimit === undefined || dataRaw.category === undefined || dataRaw.userName === undefined) {
      return;
    }

    const roomId = await createRoom(dataRaw.category, parseInt(dataRaw.timeLimit));
    const userId = await createUserInRoom(dataRaw.userName, roomId);

    localStorage.setItem(`adjwolves:${roomId}`, userId);

    router.push({ pathname: "room", query: { roomId }});
  };

  return (
    <Modal open={open} onClose={onClose}>
      <section className={`${styles.modalPanel} ${styles.makingPanel}`}>
        <h3 className={styles.panelHeader}>設定</h3>
        <form className={styles.panelForm} onSubmit={handleSubmit}>
          <div className={styles.formItem}>
            <label htmlFor="word-category">お題カテゴリー</label>
            <select name="category" id="word-category" className={styles.formInput}>
              <option value=""></option>
              {categories.map(([id, desc]) => (
                <option value={id} key={id}>
                  {desc}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="time-limit">討論時間</label>
            <div className={styles.formInput}>
              <input type="text" id="time-limit" className={styles.formLimitTime}></input>秒
            </div>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="user-name">あなたの名前</label>
            <input type="text" id="user-name" className={styles.formInput}></input>
          </div>

          <div className={styles.panelSubmit}>
            <Button type="submit" size="medium" color="primary">
              部屋をつくる
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
}

/**
 * バックエンドAPIを叩いて部屋を作る
 * @returns 部屋ID
 */
async function createRoom(category: string, timeLimit: number): Promise<string> {
    const postData = {
      category,
      timeLimit,
    };

    const endpoint = "http://localhost:3010/room";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    // TODO レスポンスが正しいかどうか検証する
    const response = await fetch(endpoint, options);
    const roomId = await response.text();

    return roomId;
}

/**
 * バックエンドAPIを叩いてユーザを部屋内に作る
 * @returns ユーザID
 */
async function createUserInRoom(userName: string, roomId: string): Promise<string> {
    const postData = {
      userName,
    };

    const endpoint = `http://localhost:3010/room/${roomId}/user`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(endpoint, options);
    const userId = await response.text();

    return userId;
}
