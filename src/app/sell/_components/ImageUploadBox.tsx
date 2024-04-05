// "use client";
import CameraIcon from "@/assets/sell/Camera.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from "react";
import CloseIcon from "@/assets/sell/Close.svg";
type ImageUploadBoxProps = {
  image: { id: number; image: File } | undefined;
  uploadImage: (image: File, id?: number) => void;
  deleteImage: (id: number) => void;
};
export default function ImageUploadBox({
  image,
  uploadImage,
  deleteImage,
}: ImageUploadBoxProps) {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : "#272727";
  const inputRef = useRef<HTMLInputElement>(null);
  const clickBox = () => {
    inputRef.current?.click();
  };
  const resetImage = () => {
    console.log("delte image id", image?.id);

    image && deleteImage(image.id);
  };
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("files", e.target.files);

    e.target.files && uploadImage(e.target.files[0], image?.id);
  };
  console.log("id", image?.id, "image", image?.image);
  return (
    <>
      {image === undefined ? (
        <div
          className="w-52 h-52 bg-light-gray border-[1px] border-black/15 cursor-pointer flex justify-center items-center"
          onClick={clickBox}
        >
          <div className="text-center">
            <div className="flex justify-center">
              <CameraIcon />
            </div>
            이미지 또는 동영상 등록하기
          </div>
        </div>
      ) : (
        <div className="flex">
          <div
            className="relative left-[200px] cursor-pointer"
            onClick={resetImage}
          >
            <CloseIcon width={20} height={20} color={iconColor} />
          </div>
          <Image
            className="cursor-pointer"
            src={URL.createObjectURL(image.image)}
            alt="업로드한 이미지"
            width={208}
            height={208}
            onClick={clickBox}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={changeFile}
      />
    </>
  );
}
