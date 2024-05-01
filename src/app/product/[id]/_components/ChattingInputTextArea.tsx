import Image from "next/image";
import { useRef } from "react";

import CloseIcon from "@/assets/SVG/Close.svg";
import ImagePlusIcon from "@/assets/SVG/Plus.svg";
import MessageSendIcon from "@/assets/SVG/CaretLeft.svg";

type Props = {
  message: string;
  enter: () => void;
  changeMessage: (message: string) => void;
  isReported: boolean;
  image?: File;
  resetImage: () => void;
  changeFile: (file: File) => void;
  enterMessage: () => void;
};
export default function ChattingInputTextArea({
  changeMessage,
  enter,
  isReported,
  message,
  image,
  changeFile,
  resetImage,
  enterMessage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && changeFile(e.target.files[0]);
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeMessage(e.currentTarget.value);
  };

  const onEnterMessage = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLElement>
  ) => {
    enterMessage();
  };

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      // console.log("asdf", e.currentTarget.value.length);

      if (e.currentTarget.value.length > 0) {
        enter();
      }
    }
  };

  return (
    <div className="mb-4 flex flex-col justify-between w-[calc(100%-2.5rem)] bg-light-gray absolute bottom-0 h-36 border-2 border-light-gray p-5 pb-4 rounded-xl">
      <textarea
        className=" w-full bg-light-gray resize-none focus:outline-none overflow-y-scroll scrollbar-hide dark:text-black"
        value={message}
        onKeyDown={onEnter}
        onChange={onChangeMessage}
        rows={4}
        placeholder={
          isReported ? "신고받은 상품입니다." : "메시지를 입력하세요."
        }
        disabled={isReported}
      ></textarea>
      {image && (
        <>
          <CloseIcon
            width={20}
            height={20}
            className="absolute right-2 top-2 cursor-pointer fill-white dark:fill-black z-10"
            color={"#272727"}
            onClick={resetImage}
          />
          <Image
            src={URL.createObjectURL(image)}
            alt="첨부파일"
            width={0}
            height={0}
            className="w-full h-24 object-contain relative bottom-2"
          />
        </>
      )}
      {/* <div className="w-full flex justify-between items-center">
        <ImagePlusIcon
          className={
            message.length === 0 && image === undefined ? "cursor-pointer" : ""
          }
          onClick={() => {
            message.length === 0 && inputRef.current?.click();
          }}
        />
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={onChangeFile}
          accept="image/*"
        />
        <MessageSendIcon
          className="cursor-pointer fill-black"
          onClick={onEnterMessage}
        />
      </div> */}
    </div>
  );
}
