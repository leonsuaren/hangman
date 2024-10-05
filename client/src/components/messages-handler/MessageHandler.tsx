import { type FC, useEffect, Dispatch, SetStateAction } from "react";

import "./message-handler.css";

type MessageHandlerProps = {
  message: {
    type: string;
    message: string;
  };
  setMessage: Dispatch<
    SetStateAction<{
      type: string;
      message: string;
    }>
  >;
};

export const MessageHandler: FC<MessageHandlerProps> = ({
  message,
  setMessage,
}) => {
  // useEffect(() => {
  //   const cleanMessage = setTimeout(() => {
  //     setMessage({
  //       type: " ",
  //       message: " ",
  //     });
  //   }, 3000);
  //   return () => {
  //     clearTimeout(cleanMessage);
  //   };
  // }, [message]);

  return (
    <div className="messages">
      <div
        className={
          message.type === "information"
            ? "information-message"
            : message.type === "warning"
            ? "warning-message"
            : message.type === "success"
            ? "success-message"
            : message.type === "fail"
            ? "game-over-message"
            : "default"
        }
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
};
