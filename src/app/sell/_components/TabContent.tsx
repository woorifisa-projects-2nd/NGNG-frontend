"use client";
import { Product } from "../page";
import ImageUploadBox from "./ImageUploadBox";
import { useEffect, useState } from "react";
import Input from "@/components/common/inputs/Input";
import DropDown from "@/components/common/drop_down/DropDown";
import Radio from "@/components/common/inputs/Radio";
import CheckBox from "@/components/common/inputs/CheckBox";
import { CategoryType, categories, status } from "@/utils";

type TabContentProps = {
  data: Product;
  onChangeData?: ({
    order,
    product,
  }: {
    order: number;
    product: Product;
  }) => void;
};
export default function TabContent({ data, onChangeData }: TabContentProps) {
  const [imageId, setImageId] = useState<number>(1);
  const fullfillSaveCondition =
    data.images.length > 0 &&
    data.title.length > 0 &&
    data.categoryId > 0 &&
    data.statusId > 0 &&
    data.price !== undefined &&
    data.content;

  const deleteImage = (id: number) =>
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        images: data.images.filter((img) => img.id !== id),
      },
    });

  const changeImages = (image: File) => {
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        images: [...data.images, { id: imageId, image }],
      },
    });

    setImageId(imageId + 1);
  };

  const changeTitle = (newTitle: string) =>
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        title: newTitle,
      },
    });
  const changeCategory = (newCategory: CategoryType) =>
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        categoryId: newCategory.id,
      },
    });

  const changeStatus = (statusId: string) =>
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        statusId: Number(statusId),
      },
    });

  const changePurchaseAt = (purchaseAt: string) =>
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        purchaseAt,
      },
    });

  const changeIsEscrow = (newValue: string) => {
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        isEscrow: newValue === "true" ? true : false,
      },
    });
  };

  const chanagePrice = (newPrice: string) => {
    const input = newPrice.replaceAll(",", "");
    console.log("new price", input, !isNaN(Number(input)));
    if (!isNaN(Number(input))) {
      onChangeData?.({
        order: data.order,
        product: {
          ...data,
          price: Number(input),
        },
      });
    }
  };

  const changeContent = (newContent: string) => {
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        content: newContent,
      },
    });
  };

  const changeDiscountable = () => {
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        discountable: !data.discountable,
      },
    });
  };

  const changeTags = (newTag: string) => {
    const newTags = newTag.split(",").map((tag) => {
      return { name: tag.trim() };
    });

    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        tags: newTags,
      },
    });
  };

  const changeFreeshipping = () => {
    onChangeData?.({
      order: data.order,
      product: {
        ...data,
        freeShipping: !data.freeShipping,
      },
    });
  };

  useEffect(() => {
    if (
      data.isFullfillSaveCondition === undefined ||
      (data.isFullfillSaveCondition === false && fullfillSaveCondition)
    ) {
      onChangeData?.({
        order: data.order,
        product: {
          ...data,
          isFullfillSaveCondition: true,
        },
      });
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 pb-20">
      <div className="flex  items-start justify-start">
        <div className="text-lg font-medium min-w-24">
          <div className="flex">
            상품이미지<p className="text-red-600">*</p>
          </div>
          <div className="flex">
            (<p className="text-point-color">{data.images.length}</p>/10)
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col md:grid-cols-4 gap-4">
          {Array.from(
            {
              length:
                data.images.length < 10
                  ? data.images.length + 1
                  : data.images.length,
            },
            (_, index) => index
          ).map((item, index) => (
            <ImageUploadBox
              key={index}
              image={data.images[index]}
              uploadImage={changeImages}
              deleteImage={deleteImage}
            />
          ))}
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium min-w-24">
          상품명<p className="text-red-600">*</p>
        </div>

        <Input
          value={data.title}
          onChange={changeTitle}
          placeholder="한글, 숫자, 영어, 특수문자만 입력하세요."
          width={684}
          height={45}
        />
      </div>
      <div className="flex items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          카테고리<p className="text-red-600">*</p>
        </div>
        <DropDown
          data={categories.map((category) => {
            return { id: category.id, name: category.name };
          })}
          selected={categories.find(
            (category) => category.id === data.categoryId
          )}
          onClickItem={changeCategory}
          placeholder="카테고리를 선택해주세요."
        />
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          상품상태<p className="text-red-600">*</p>
        </div>
        <div>
          {status.map((stat) => {
            return (
              <div
                className="flex justify-start items-center mb-4 cursor-pointer"
                key={stat.id}
                onClick={() => changeStatus(stat.id.toString())}
              >
                <Radio
                  name="status"
                  value={stat.id.toString()}
                  onChange={changeStatus}
                  selectedOption={data.statusId.toString()}
                />
                {stat.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">구매시기</div>
        <Input
          width={276}
          onChange={changePurchaseAt}
          value={data.purchaseAt ?? ""}
          placeholder="구매년도를 입력해 주세요."
        />
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          거래방식<p className="text-red-600">*</p>
        </div>
        <div>
          <div
            className="flex justify-start items-center mb-4 cursor-pointer"
            onClick={() => changeIsEscrow("true")}
          >
            <Radio
              name="isEscrow"
              onChange={changeIsEscrow}
              selectedOption={data.isEscrow.toString()}
              value="true"
            />
            안심거래
          </div>
          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={() => changeIsEscrow("false")}
          >
            <Radio
              name="isEscrow"
              onChange={changeIsEscrow}
              selectedOption={data.isEscrow.toString()}
              value="false"
            />
            일반거래
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          가격<p className="text-red-600">*</p>
        </div>
        <Input
          onChange={chanagePrice}
          value={data.price?.toLocaleString()}
          placeholder="가격을 입력해 주세요."
          width={276}
        />
        <span className="text-text-gray relative right-7">원</span>
        <CheckBox
          onChange={changeDiscountable}
          checked={data.discountable}
          label="할인 가능"
        />
        <div className="flex items-center ml-4">
          <CheckBox
            onChange={changeFreeshipping}
            checked={data.freeShipping}
            label="배송비 포함"
          />
        </div>
      </div>
      <div className="flex  items-start justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          설명<span className="text-red-600">*</span>
        </div>
        <textarea
          className="rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-4 h-[530px] resize-none"
          value={data.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            changeContent(e.currentTarget.value)
          }
          placeholder="상품에 대한 설명을 적어주세요."
        />
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">태그</div>
        <Input
          onChange={changeTags}
          placeholder="태그"
          value={data.tags.map((tag) => tag.name).join(", ")}
        />
      </div>
    </div>
  );
}
