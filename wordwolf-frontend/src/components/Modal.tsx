import { ReactNode } from "react";
import styles from "@/styles/Modal.module.css";

interface ModalProps {
  open?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal(props: ModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <>
      {props.open && (
        <div onClick={handleClick} className={styles.modal}>
          {props.children}
        </div>
      )}
    </>
  );
}
