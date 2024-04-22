import CameraIcon from "@/assets/SVG/Camera.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState } from "react";
import CloseIcon from "@/assets/SVG/Close.svg";

type ImageUploadBoxProps = {
    uploadImage: (image: File) => void;
};

export default function ImageUploadBox({ uploadImage }: ImageUploadBoxProps) {
    const { theme } = useTheme();
    const iconColor = theme === "dark" ? "white" : "#272727";
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    
    const clickBox = () => inputRef.current?.click();
    
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).slice(0, 10 - uploadedImages.length);
            setUploadedImages([...uploadedImages, ...newImages]);
            newImages.forEach(uploadImage);
        }
    };

    const resetImage = (index: number) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
    };

    return (
        <div className="flex flex-wrap">
            {uploadedImages.map((image, index) => (
                <div key={index} className="relative mr-4 mb-4">
                    <div className="w-36 h-36 relative">
                        <Image
                            className="object-cover"
                            src={URL.createObjectURL(image)}
                            alt="Uploaded Image"
                            layout="fill"
                        />
                    </div>
                    <button
                        className="absolute top-2 right-2 cursor-pointer bg-gray-200 rounded-full p-1"
                        onClick={() => resetImage(index)}
                    >
                        <CloseIcon width={16} height={16} className="fill-black" />
                    </button>
                </div>
            ))}
            {uploadedImages.length < 10 && (
                <div
                    className="w-36 h-36 bg-light-gray border-[1px] border-black/15 cursor-pointer flex justify-center items-center mr-4 mb-4"
                    onClick={clickBox}
                >
                    <div className="text-center dark:text-text-gray">
                        <div className="flex justify-center">
                            <CameraIcon />
                        </div>
                        이미지 업로드
                    </div>
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={changeFile}
                multiple
            />
        </div>
    );
}
