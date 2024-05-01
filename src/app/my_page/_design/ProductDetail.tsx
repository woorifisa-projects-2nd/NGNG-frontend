import React, { useEffect, useState } from "react";
import { imageUrlExtractExtension } from "../_utils/extract";
import Image from "next/image";

type Props = {
  product: Product;
};
type ProductImage = {
  id: number;
  imageURL: string;
  visible: boolean;
};

export default function ProductDetail({ product }: Props) {
  const [showProuctIndex, setProductIndex] = useState(0);

  const [mainImage, setMainImage] = useState<ProductImage>(
    product.images!.filter(({ visible }) => visible)[0]
  );

  useEffect(() => {
    const filterImage = product.images!.filter(({ visible }) => visible);
    setMainImage(filterImage[showProuctIndex]);
  }, [showProuctIndex]);

  return (
    <>
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12  ">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          {/* 메인 사진 */}
          <div className="px-4 py-10 min-h-[330px] rounded-xl shadow-[0_2px_10px_-3px_#873EAC] relative flex justify-center items-center">
            {["mp4"].includes(imageUrlExtractExtension(mainImage.imageURL)) ? (
              <iframe
                className="h-full mx-auto"
                src={mainImage.imageURL}
                // @ts-ignore
                frameborder="0"
                allowfullscreen
              />
            ) : (
              <Image
                className="w-full object-contain object-center max-h-[250px]"
                src={mainImage.imageURL}
                alt={"메인 이미지"}
                width={700}
                height={700}
              />
            )}
          </div>
          {/* 서브 사진들 */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
            {product &&
              product
                .images!.filter(({ visible }) => visible)
                .map(({ id, imageURL }, index) => (
                  <div
                    className="w-[15vw] lg:w-[10vw] max-w-[85px]  flex items-center rounded-xl p-4 shadow-[0_2px_10px_-3px_#873EAC] cursor-pointer hover:scale-125 transition-all"
                    onClick={() => setProductIndex(index)}
                    key={index}
                  >
                    {["mp4"].includes(imageUrlExtractExtension(imageURL)) ? (
                      <video
                        className="w-full pointer-events-none "
                        itemType="video/mp4"
                        controls
                      >
                        <source src={imageURL} />
                      </video>
                    ) : (
                      <Image
                        className="w-full object-contain object-center"
                        src={imageURL}
                        alt={"메인 이미지"}
                        width={700}
                        height={700}
                      />
                    )}
                  </div>
                ))}
          </div>
        </div>
        {/* 제품 정보 */}
        <div className="lg:col-span-2  flex flex-col gap-2">
          <p className="text-gray-400 dark:text-white">
            상품번호 : {product.id}
          </p>
          <h2 className="text-2xl font-extrabold text-[#333] dark:text-gray-400">
            {product.title}
          </h2>
          <p className="text-gray-400">{product.category.name}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-[#333] text-4xl font-bold dark:text-gray-400">
              {product.price.toLocaleString()} 원
            </p>
            <p className="text-gray-400 text-xl">
              <span
                className={`block xl:inline font-medium ${
                  product.discountable ? "text-point-color" : "text-red-500"
                } `}
              >
                {product.discountable ? "할인가능" : "할인불가능"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-text-gray ">제품상태</p>
            <p className="">{product.status.name}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-text-gray ">거래방식</p>
            <p className="">{product.isEscrow ? "안심거래" : "일반거래"}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-text-gray ">배송비</p>
            <p className="">{product.freeShipping ? "포함" : "미포함"}</p>
          </div>
        </div>
      </div>
      <div className="mt-16 shadow-[0_2px_10px_-3px_#873EAC] p-6 my-4">
        <h3 className="text-lg font-bold text-[#333] dark:text-gray-400">
          제품 설명
        </h3>
        {product.content}
      </div>
    </>
  );
}
