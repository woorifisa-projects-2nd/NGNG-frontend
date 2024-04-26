import CameraIcon from "@/assets/SVG/Camera.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef } from "react";
import CloseIcon from "@/assets/SVG/Close.svg";
type ImageUploadBoxProps = {
    image: { id: number; imageURL: File | string; visible: boolean } | undefined;
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
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files[0]);

        e.target.files && uploadImage(e.target.files[0], image?.id);
    }

    // 이미지가 이미 업로드되어 있는지 여부 확인
    const isImageUploaded = typeof (image?.imageURL);

    const imageUrlExtractExtension = (url: string) => {
        // 1. 마지막 `.`의 위치를 찾습니다.
        const lastDotIndex = url.lastIndexOf(".");
        // 2. 마지막 `.`이 없는 경우, 확장자가 없는 것으로 처리합니다.
        if (lastDotIndex === -1) {
            return "";
        }
        // 3. 확장자를 추출합니다.
        return url.slice(lastDotIndex + 1);
    };



    return (
        <>
            {image === undefined ? (
                <div
                    className="w-52 h-52 bg-light-gray border-[1px] border-black/15 cursor-pointer flex justify-center items-center"
                    onClick={clickBox}
                >
                    <div className="text-center dark:text-text-gray">
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
                        className="absolute right-2 top-2 cursor-pointer fill-white dark:fill-black z-50"
                        color={iconColor}
                        onClick={resetImage}
                    />

                    {image && isImageUploaded === 'string' ? (
                        imageUrlExtractExtension(image.imageURL.toString()) === "mp4" ? (
                            <video
                                className="w-full h-auto hidden md:block cursor-pointer object-contain"
                                width={400}
                                height={400}
                                onClick={clickBox}
                                controls
                            >
                                <source src={image.imageURL.toString()}></source>
                            </video>
                        ) : (

                            <Image
                                className="w-full h-auto hidden md:block cursor-pointer object-contain"
                                src={image.imageURL.toString()}
                                alt="데이터베이스에 업로드된 이미지"
                                width={400}
                                height={400}
                                onClick={clickBox}
                            />
                        )
                    ) : imageUrlExtractExtension((image.imageURL as File).name) === "mp4" ? (
                        <video
                            className="w-full h-auto hidden md:block cursor-pointer object-contain"
                            width={400}
                            height={400}
                            onClick={clickBox}
                            controls
                        >
                            <source src={URL.createObjectURL(image.imageURL as File)}></source>
                        </video>
                    ) : (

                        <Image
                            className="w-full h-auto hidden md:block cursor-pointer object-contain"
                            src={URL.createObjectURL(image.imageURL as File)}
                            alt="로컬에 업로드된 이미지"
                            width={400}
                            height={400}
                            onClick={clickBox}
                        />
                    )}
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
