import { ReactNode } from "react";
import styles from "@/styles/Button.module.css";

type ButtonColor = "primary" | "secondary";
type ButtonSize = "medium" | "large";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({ color, size, ...props }: ButtonProps) {
  const _classNames = [styles.button];
  if (props.className != null) {
    _classNames.push(props.className);
  }
  switch (color) {
    case "primary":
      _classNames.push(styles.primaryColor);
      break;
    case "secondary":
      _classNames.push(styles.secondaryColor);
      break;
  }
  switch (size) {
    case "large":
      _classNames.push(styles.largeSize);
      break;
    case "medium":
      _classNames.push(styles.mediumSize);
      break;
  }
  const className = _classNames.join(" ");

  const type = props.type ?? "button";

  return (
    <button className={className} type={type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
