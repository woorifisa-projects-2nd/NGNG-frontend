"use client";

import CheckBox from "@/components/common/inputs/CheckBox";
import Input from "@/components/common/inputs/Input";
import Radio from "@/components/common/inputs/Radio";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/SVG/Close.svg";
import ImageUploadBox from "@/app/sell/_components/ImageUploadBox";
import { convertEnumToKeyValuesObject } from "@/app/my_page/_utils/convert";
import DropDown from "@/components/common/drop_down/DropDown";
import { imageUrlExtractExtension } from "@/app/my_page/_utils/extract";
import { updateProdctByUpdateProductRequest } from "../../_api/api";
import { useRouter } from "next/navigation";

enum ECategory {
  "의류" = 1,
  "잡화",
  "뷰티",
  "디지털",
  "취미",
  "티켓/교환권",
  "생활",
  "가구",
  "가공 식품",
  "기타",
}

enum EProductStatus {
  "미개봉 새상품" = 1,
  "사용감 없음",
  "사용감 적음",
  "사용감 많음",
  "고장/파손 상품",
}

enum EEscrow {
  "일반 거래",
  "안심 거래",
}

export default function UpdateProductId({ productId }: { productId: number }) {
  const router = useRouter();

  const [data, setData] = useState<Product>();

  const [deleteOriginImages, setDeleteOriginImagees] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const productTitle = useRef<HTMLInputElement>(null);
  const productCategory = useRef<HTMLSelectElement>(null);
  const [productStatus, setProductStatus] = useState<number>();
  const productPurchaseAt = useRef<HTMLInputElement>(null);
  const productPrice = useRef<HTMLInputElement>(null);
  const productDiscountable = useRef<HTMLInputElement>(null);
  const productFreeShipping = useRef<HTMLInputElement>(null);
  const [productIsEscrow, setProductIsEscrow] = useState<number>(0);
  const productContent = useRef<HTMLTextAreaElement>(null);
  const [productTags, setProductTags] = useState<string>();

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data: Product) => {
        // console.log(data);

        const product = {
          ...data,
          images: data.images.filter((p) => p.visible),
        } as Product;
        setData(product);

        setProductStatus(data.status.id);
        setProductIsEscrow(data.isEscrow ? 1 : 0);
        setProductTags(data.tags.map((v) => v.tagName).join(","));
      });
  }, []);

  if (!data) return <div>로딩중 </div>;

  const handlerNewFileUpload = (image: File) => {
    if (data.images.length + newImages.length >= 10) return;

    setNewImages((prev) => [...prev, image]);
  };
  const handlerNewFileDelete = (index: number) => {
    setNewImages((prev) => prev.filter((v, _index) => _index !== index));
  };
  const handlerOldFileDelete = (index: number) => {
    // setNewImages((prev) => prev.filter((v, _index) => _index !== index));
    const deletImage = data?.images[index];

    setData((prev) => {
      return {
        ...prev,
        images: prev?.images.filter((v, _index) => _index !== index),
      } as Product;
    });

    setDeleteOriginImagees((prev) => [...prev, deletImage]);
  };

  const changeTags = (newTag: string) => {
    const newTags = newTag
      .split(",")
      .map((tag) => {
        return tag.trim();
      })
      .join(", ");

    setProductTags(newTags);
  };


  const handlerChange = async () => {
    // console.log("수정할 데이터");
    // console.log(deleteOriginImages);
    // console.log(newImages);

    // console.log({
    //   title: productTitle.current?.value,
    //   category: productCategory.current?.value,
    //   status: productStatus,
    //   productPurchaseAt: productPurchaseAt.current?.value,
    //   price: productPrice.current?.value,
    //   isEscrow: productIsEscrow ? true : false,
    //   content: productContent.current?.value,
    //   tags: productTags,
    //   discountable: productDiscountable.current?.checked,
    //   freeShipping: productFreeShipping.current?.checked,
    // });

    await updateProdctByUpdateProductRequest({
      deleteOldImages: deleteOriginImages,
      newImages,
      newProduct: {
        // ...data,
        categoryId: +productCategory.current!.value,
        content: productContent.current!.value,
        discountable: productDiscountable.current!.checked,
        forSale: true, // 판매여부
        freeShipping: productFreeShipping.current!.checked,
        isEscrow: productIsEscrow ? true : false,
        price: +productPrice.current!.value,
        purchaseAt: productPurchaseAt.current!.value,
        statusId: productStatus!,
        tags: productTags!.split(",").map((tag) => {
          return { tagName: tag.trim() };
        }),
        // tags: data.tags,
        title: productTitle.current!.value,
        userId: data.user.id,
        visible: data.visible,
      },
      origin: data,
    });

    router.replace("/my_page");
  };

  return (
    <div className="grid grid-cols-1 gap-4 pb-20 p-6">
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium min-w-24">
          상품명<p className="text-red-600">*</p>
        </div>

        <input
          className={`rounded-md border-[1px] border-black/15   focus:outline-none focus:border-point-color p-2`}
          type="text"
          placeholder="한글, 숫자, 영어, 특수문자만 입력하세요."
          ref={productTitle}
          defaultValue={data.title}
        />
      </div>
      <div className="flex items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          카테고리<p className="text-red-600">*</p>
        </div>
        {/* 카테고리 */}
        <select
          className="flex justify-start items-center rounded-md border-[1px] border-black/15 p-2 gap-2"
          defaultValue={data.category.id}
          ref={productCategory}
        >
          {convertEnumToKeyValuesObject(ECategory).map((status) => (
            <option
              className={`rounded-md border-[1px] border-black/15 absolute left-0 mt-2 w-48 bg-white z-10  dark:bg-black `}
              key={status.value}
              value={status.value}
            >
              {status.key}
            </option>
          ))}
        </select>
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          상품상태<p className="text-red-600">*</p>
        </div>
        {/* 상태 */}
        <div className="flex flex-col gap-2">
          {data.status &&
            convertEnumToKeyValuesObject(EProductStatus).map(
              ({ key, value }, index) => {
                return (
                  <div key={index} className="inline-flex items-center">
                    <input
                      onChange={(e) => setProductStatus(+e.target.value)}
                      type="radio"
                      name="status"
                      id={key}
                      value={value}
                      checked={productStatus === value}
                      className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300  checked:border-4 checked:border-white checked:shadow-point-color checked:shadow-radio checked:bg-point-color checked:accent-point-color mr-2"
                    />
                    <label htmlFor={key}>{key}</label>
                  </div>
                );
              }
            )}
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">구매시기</div>
        <input
          className={`rounded-md border-[1px] border-black/15 focus:outline-none focus:border-point-color p-2`}
          type="text"
          placeholder="구매년도를 입력해 주세요."
          ref={productPurchaseAt}
          defaultValue={data.purchaseAt?.toString()}
        />
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          거래방식<p className="text-red-600">*</p>
        </div>
        <div className="flex flex-col gap-2">
          {data.status &&
            convertEnumToKeyValuesObject(EEscrow).map(
              ({ key, value }, index) => {
                return (
                  <div key={index} className="inline-flex items-center">
                    <input
                      onChange={(e) => setProductIsEscrow(+e.target.value)}
                      type="radio"
                      name="escrow"
                      id={key}
                      value={value}
                      checked={productIsEscrow === value}
                      className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300  checked:border-4 checked:border-white checked:shadow-point-color checked:shadow-radio checked:bg-point-color checked:accent-point-color mr-2"
                    />
                    <label htmlFor={key}>{key}</label>
                  </div>
                );
              }
            )}
        </div>
      </div>
      <div className="flex flex-wrap  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          가격<p className="text-red-600">*</p>
        </div>

        <div className="flex flex-wrap gap-4 ">
          <div>
            <input
              className={`rounded-md border-[1px] border-black/15   focus:outline-none focus:border-point-color p-2`}
              type="text"
              placeholder="가격을 입력해 주세요."
              ref={productPrice}
              defaultValue={data.price}
            />
            <span className="text-text-gray relative right-7">원</span>
          </div>
          <div className="flex">
            {/* 할인 */}
            <div className="flex items-center ">
              <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                  id="discountable"
                  defaultChecked={data.discountable}
                  ref={productDiscountable}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={"1"}
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                </span>
              </label>
              <label className="cursor-pointer" htmlFor="discountable">
                할인 가능
              </label>
            </div>
            {/* 배송비 */}
            <div className="flex items-center ">
              <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
                  id="freeShipping"
                  defaultChecked={data.freeShipping}
                  ref={productFreeShipping}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={"1"}
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                  </svg>
                </span>
              </label>
              <label className="cursor-pointer" htmlFor="freeShipping">
                배송비 포함
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          설명<span className="text-red-600">*</span>
        </div>
        <textarea
          className="rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-4 h-[530px] resize-none"
          defaultValue={data.content}
          // onChange={() => {}}
          // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          //   changeContent(e.currentTarget.value)
          // }
          ref={productContent}
          placeholder="상품에 대한 설명을 적어주세요."
        />
      </div>
      {/* //TODO SELL 에서 쓰인겨 가져오기 */}
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">태그</div>
        <input
          className={`rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-2`}
          type="text"
          placeholder="태그"
          value={productTags}
          onChange={(e) => changeTags(e.target.value)}
        />
      </div>
      <button onClick={() => handlerChange()}>변경 하기</button>
    </div>
  );
}

//  <div className="flex  items-start justify-start">
//         <div className="text-lg font-medium min-w-24">
//           <div className="flex">
//             상품이미지<p className="text-red-600">*</p>
//           </div>
//           <div className="flex fill-red-500">
//             (
//             <p className="text-point-color">
//               {data.images.length + newImages.length}
//             </p>
//             /10)
//           </div>
//         </div>
//         {/* 이미지 업로드 */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {data.images.map(({ id, imageURL }, index) => (
//             <div className="flex relative" key={index}>
//               <CloseIcon
//                 width={20}
//                 height={20}
//                 className="bg-white rounded-lg  absolute right-2 top-2 cursor-pointer fill-white dark:fill-black"
//                 //  color={iconColor}

//                 // TODO 기존 이미지 삭제 처리
//                 onClick={() => handlerOldFileDelete(index)}
//               />

//               {["mp4"].includes(imageUrlExtractExtension(imageURL)) ? (
//                 <video
//                   className="w-full max-h-[300px] mx-auto"
//                   width={400}
//                   height={400}
//                   controls
//                 >
//                   <source src={imageURL} />
//                 </video>
//               ) : (
//                 <Image
//                   className="w-full object-contain object-center max-h-[300px]"
//                   src={imageURL}
//                   alt={"기존 이미지"}
//                   width={400}
//                   height={400}
//                 />
//               )}
//             </div>
//           ))}
//           {newImages.length > 0 &&
//             newImages.map((file, index) => (
//               <div className="flex relative" key={index}>
//                 <CloseIcon
//                   width={20}
//                   height={20}
//                   className="bg-white rounded-lg absolute right-2 top-2 cursor-pointer fill-white dark:fill-black"
//                   //  color={iconColor}

//                   // TODO 새로운 이미지 삭제 처리
//                   onClick={() => handlerNewFileDelete(index)}
//                 />

//                 {["mp4"].includes(imageUrlExtractExtension(file.name)) ? (
//                   <video
//                     className="w-full max-h-[300px] mx-auto"
//                     width={400}
//                     height={400}
//                     controls
//                   >
//                     <source src={URL.createObjectURL(file)} />
//                   </video>
//                 ) : (
//                   <Image
//                     className="w-full object-contain object-center max-h-[300px]"
//                     src={URL.createObjectURL(file)}
//                     alt={"새로운 이미지"}
//                     width={400}
//                     height={400}
//                   />
//                 )}
//                 {/* <Image
//                   className="h-full  object-center"
//                   src={URL.createObjectURL(file)}
//                   width={400}
//                   height={400}
//                   alt={"추가된이미지 - " + index}
//                 /> */}
//               </div>
//             ))}
//           {
//             // @ts-ignore
//             <ImageUploadBox
//               // image={data.images[index]}
//               uploadImage={handlerNewFileUpload}
//               // deleteImage={handlerNewFileDelete}
//             />
//           }
//         </div>
//       </div>
