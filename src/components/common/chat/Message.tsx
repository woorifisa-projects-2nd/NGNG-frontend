import Image from "next/image";
import React, { forwardRef } from "react";

type MessageProps = {
  text: string;
  direction: string;
  isImage?: boolean;
  userName: string;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ direction, text, isImage, userName }: MessageProps, ref) => {
    const adminColor = `bg-point-color text-white`;
    const guestColor = `bg-light-lavender text-black dark:text-black`;
    return (
      <div
        ref={ref}
        className={`relative w-full flex my-8 ${
          direction === "left" ? "justify-start" : "justify-end"
        }`}
      >
        <div>
          <span className="">{userName}</span>
          <div
            style={{ wordBreak: "break-all" }}
            className={`w-52 p-5 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-y-scroll scrollbar-hide ${
              direction === "left" ? adminColor : guestColor
            } whitespace-normal`}
          >
            {isImage ? (
              <Image
                src={URL.createObjectURL(text as unknown as Blob)}
                alt="첨부파일"
                width={0}
                height={0}
                className="w-full h-36 object-contain"
              />
            ) : (
              text
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Message;
