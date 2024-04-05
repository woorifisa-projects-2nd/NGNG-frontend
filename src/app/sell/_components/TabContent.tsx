import Button from "@/components/common/Button";
import { Product } from "../page";
import ImageUploadBox from "./ImageUploadBox";
import { useState } from "react";
import Input from "@/components/common/inputs/Input";
import DropDown from "@/components/common/drop_down/DropDown";
import Radio from "@/components/common/inputs/Radio";

const categories: CategoryType[] = [
  { name: "의류", id: 1 },
  { name: "잡화", id: 2 },
  { name: "뷰티", id: 3 },
  { name: "디지털", id: 4 },
  { name: "취미", id: 5 },
  { name: "티켓/교환권", id: 6 },
  { name: "생활", id: 7 },
  { name: "가구", id: 8 },
  { name: "가공식품", id: 9 },
  { name: "기타", id: 10 },
];
export type CategoryType = {
  id: number;
  name: string;
  link?: string;
};

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
  const [product, setProduct] = useState<Product>(data);
  const [imageId, setImageId] = useState<number>(1);

  const deleteImage = (id: number) =>
    setProduct({
      ...product,
      images: product.images.filter((img) => img.id !== id),
    });
  const changeImages = (image: File) => {
    setProduct({
      ...product,
      images: [...product.images, { id: imageId, image }],
    });
    setImageId(imageId + 1);
  };
  const changeTitle = (newTitle: string) => {
    setProduct({
      ...product,
      title: newTitle,
    });
  };
  const changeCategory = (newCategory: CategoryType) => {
    setProduct({
      ...product,
      categoryId: newCategory.id,
    });
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex  items-center justify-start">
        <div className="text-lg font-medium min-w-24">
          <div className="flex">
            상품이미지<p className="text-red-600">*</p>
          </div>
          <div className="flex">
            (<p className="text-point-color">{product.images.length}</p>/10)
          </div>
        </div>
        <div className="grid grid-rows-1 grid-flow-col md:grid-cols-4 gap-4">
          {Array.from(
            {
              length:
                product.images.length < 10
                  ? product.images.length + 1
                  : product.images.length,
            },
            (_, index) => index
          ).map((item, index) => (
            <ImageUploadBox
              image={product.images[index]}
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
          value={product.title}
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
            (category) => category.id === product.categoryId
          )}
          onClickItem={changeCategory}
          placeholder="카테고리를 선택해주세요."
        />
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          상품상태<p className="text-red-600">*</p>
        </div>
        <Radio />
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">구매시기</div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          거래방식<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          가격<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">
          설명<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex  items-center justify-start">
        <div className="flex text-lg font-medium  min-w-24">태그</div>
      </div>

      <div className="flex justify-end items-center">
        <Button text="등록하기" />
      </div>
    </div>
  );
}
