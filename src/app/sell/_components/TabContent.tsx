import Button from "@/components/common/Button";
import { Product } from "../page";
import ImageUploadBox from "./ImageUploadBox";
import { useState } from "react";

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
  console.log("product images", product.images);

  const deleteImage = (id: number) => {
    setProduct({
      ...product,
      images: product.images.filter((img) => img.id === id),
    });
  };

  const changeImages = (image: File) => {
    setProduct({
      ...product,
      images: [...product.images, { id: imageId, image }],
    });
    setImageId(imageId + 1);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          상품이미지<p className="text-red-600">*</p>(
          <p className="text-point-color">0</p>/10)
        </div>
        <div className="grid grid-cols-4 gap-4">
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
      <div className="flex">
        <div className="flex text-lg font-medium">
          상품명<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          카테고리<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          상품상태<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">구매시기</div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          거래방식<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          가격<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">
          설명<p className="text-red-600">*</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-lg font-medium">태그</div>
      </div>

      <div className="flex justify-end items-center">
        <Button text="등록하기" />
      </div>
    </div>
  );
}
