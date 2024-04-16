import React, { useEffect, useState } from "react";
import { convertEnumToKeyValuesObject } from "../../_utils/convert";
import { imageUrlExtractExtension } from "../../_utils/extract";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

enum PRODUCT_STATUS {
  "입금 대기" = 1,
  "입금 완료",
  "배송중",
  "배송완료",
  "거래완료",
  "거래 취소",
}

export default function SellProductDetail({
  product,
  updateDate,
  chnageStatus,
  deleteProduct,
}: {
  product: Product;
  updateDate: (id: number) => void;
  chnageStatus: (status: string) => void;
  deleteProduct: (id: number) => void;
}) {
  const [productStatus, setProductStatus] = useState<number>(0);

  const changeProductStatus = () => {
    chnageStatus(productStatus + "");
  };
  const onDeleteProduct = () => {
    deleteProduct(product.id);
  };

  useEffect(() => {
    setProductStatus(product.transactionDetails?.status?.id || 0);
  }, []);
  return (
    <>
      <div>{product.title}</div>
      <div className="flex gap-2 flex-col">
        <button
          type="button"
          className={` bg-green-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-green-700 `}
          onClick={() => updateDate(product.id)}
        >
          끌어올리기
        </button>
        {product.transactionDetails?.status?.status ? (
          //  거래 성사 된 상품일시
          <>
            <select
              value={productStatus}
              onChange={(e) => setProductStatus(+e.target.value)}
            >
              {convertEnumToKeyValuesObject(PRODUCT_STATUS).map((status) => (
                <option
                  className="disabled:text-red-500"
                  key={status.value}
                  value={status.value}
                  disabled={
                    status.value < product.transactionDetails!.status.id
                  }
                >
                  {status.key}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={` bg-blue-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-blue-700 `}
              onClick={() => changeProductStatus()}
            >
              상태변경
            </button>
          </>
        ) : (
          //  거래 중인 상품일시
          <button
            type="button"
            className={` bg-red-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-red-700 `}
            onClick={() => onDeleteProduct()}
          >
            삭제버튼
          </button>
        )}
        {/* 공통 */}
        <div className="mt-10 w-full flex flex-col justify-between">
          <div className="flex w-full justify-between mb-10">
            <div>
              <p className="text-text-gray">홈 - {product.category.name}</p>
              <p className="text-2xl mb-5">{product.title}</p>
              <span className="text-2xl mr-2">
                {product.price.toLocaleString()}원
              </span>
              <span
                className={`block xl:inline font-medium ${
                  product.discountable ? "text-point-color" : "text-red-500"
                } `}
              >
                {product.discountable ? "할인가능" : "할인불가능"}
              </span>
            </div>
          </div>
        </div>
        <Carousel
          showArrows={true}
          showThumbs={true}
          showIndicators={false}
          swipeable={true}
          emulateTouch={true}
          infiniteLoop={true}
        >
          {product &&
            product.images.map(({ id, imageURL }) => {
              if (["mp4"].includes(imageUrlExtractExtension(imageURL))) {
                return (
                  <video className="w-full" controls key={id}>
                    <source src={imageURL} />
                  </video>
                );
              }

              return (
                <Image
                  key={id}
                  className="w-full object-contain object-center max-h-[250px]"
                  src={imageURL}
                  alt={imageURL}
                  width={700}
                  height={700}
                />
              );
            })}
        </Carousel>
      </div>

      <div className="mb-10 w-full flex rounded-lg border-[1px] border-text-gray justify-around p-8 font-medium">
        <div className="flex flex-col items-center text-center ">
          <p className="text-text-gray mb-5">제품상태</p>
          <p className="">{product.status.name}</p>
        </div>
        <p className=" border-r-[1px] border-text-gray" />
        <div className="flex flex-col items-center text-center ">
          <p className=" text-text-gray  mb-5">거래방식</p>
          <p className="">{product.isEscrow ? "안심거래" : "일반거래"}</p>
        </div>
        <p className=" border-r-[1px] border-text-gray" />
        <div className="flex flex-col items-center  ">
          <p className="text-text-gray mb-5">배송비</p>
          <p>{product.freeShipping ? "포함" : "미포함"}</p>
        </div>
      </div>
      <h2>제품 설명 : </h2>
      <p>{product.content}</p>
    </>
  );
}
