import { getLocalTime } from "@/app/product/_api/api";
import Image from "next/image";
import React, { forwardRef } from "react";

type MessageProps = {
  text: string;
  direction: string;
  isImage?: boolean;
  userName: string;
  isFirstOfTheDay?: boolean;
  createdAt: string;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      direction,
      text,
      isImage,
      userName,
      createdAt,
      isFirstOfTheDay = false,
    }: MessageProps,
    ref
  ) => {
    const adminColor = `bg-point-color text-white`;
    const guestColor = `bg-light-lavender text-black dark:text-black`;

    const time = getLocalTime(createdAt);

    return (
      <>
        {isFirstOfTheDay && (
          <p className="w-full flex justify-center">
            {createdAt?.split("T")[0]}
          </p>
        )}
        <div
          ref={ref}
          className={`relative w-full flex my-8 ${
            direction === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <div>
            <span
              className={`ml-2 font-bold ${
                direction === "right" ? "ml-10" : ""
              }`}
            >
              {userName}
            </span>
            <div className="flex items-end gap-1">
              {direction === "right" && (
                <p className="text-sm text-right">{time}</p>
              )}
              <div
                style={{ wordBreak: "break-all" }}
                className={` w-60 p-5 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-y-scroll scrollbar-hide ${
                  direction === "right" ? adminColor : guestColor
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
              {direction === "left" && (
                <p className="text-sm text-right">{time}</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);
Message.displayName = "Message";

export default Message;
