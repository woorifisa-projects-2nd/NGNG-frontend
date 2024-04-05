import CameraIcon from "@/assets/SVG/Camera.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from "react";
import CloseIcon from "@/assets/SVG/Close.svg";
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
  const clickBox = () => inputRef.current?.click();
  const resetImage = () => image && deleteImage(image.id);
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && uploadImage(e.target.files[0], image?.id);
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
        <div className="flex relative">
          <CloseIcon
            width={20}
            height={20}
            className="absolute right-2 top-2 cursor-pointer fill-white dark:fill-black"
            color={iconColor}
            onClick={resetImage}
          />

          <Image
            className="hidden md:block cursor-pointer object-contain"
            src={URL.createObjectURL(image.image)}
            alt="업로드한 이미지"
            width={208}
            height={208}
            onClick={clickBox}
          />
          <Image
            className="block md:hidden cursor-pointer object-contain"
            src={URL.createObjectURL(image.image)}
            alt="업로드한 이미지"
            width={60}
            height={60}
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