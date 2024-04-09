import Image from "next/image";
import React, { forwardRef } from "react";

type MessageProps = {
  text: string;
  direction: string;
  isImage?: boolean;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ direction, text, isImage }: MessageProps, ref) => {
    const adminColor = `bg-point-color text-white`;
    const guestColor = `bg-light-lavender text-black`;
    return (
      <div
        ref={ref}
        className={`w-full flex my-5 ${
          direction === "left" ? "justify-start" : "justify-end"
        }`}
      >
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
    );
  }
);

export default Message;
