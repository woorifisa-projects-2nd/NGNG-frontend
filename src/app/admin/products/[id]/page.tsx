"use client";

import { useState, useEffect } from "react";
import TabContent from "../_components/TabContent";
import TabHeader from "../_components/TabHeader";
import Button from "@/components/common/Button";
import { createProduct, deleteImageById, deleteImages } from "../_api/api";
import { log } from "console";
import { usePathname } from "next/navigation";
import { getProductById } from "../_api/api";

export type Product = {
  order: number;
  id: number;
  title: string;
  content: string;
  price?: number;
  isEscrow: boolean;
  discountable: boolean;
  forSale: boolean;
  visible: boolean;
  purchaseAt?: string;
  freeShipping: boolean;
  user: {
    id: number;
    name: string;
    nickname: string;
  };
  status: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  tags: { tagName: string }[];
  images: { id: number; imageURL: File; visible: boolean }[];
  thumbnail?: File;
  isFullfillSaveCondition?: boolean;
};

type Image = {
  id: number;
  imageURL: File;
  visible: boolean;
};

export default function ProductDetail() {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const allfullfilledSaveCondition = newProduct?.isFullfillSaveCondition;

  useEffect(() => {
    async function fetchData() {
      const productData = await getProductById(Number(id));

      const filteredImages: Image[] = productData.images.filter(
        (image: Image) => image.visible === true
      );
      const updatedProduct: Product = {
        ...productData,
        images: filteredImages,
      };

      setProduct(updatedProduct); // 기존 상품 정보
      setNewProduct(updatedProduct); // 수정한 상품 정보
    }
    fetchData();
  }, [id]);

  // console.log(newProduct?.images);

  const onClickButton = async () => {
    if (newProduct) {
      // .log(product);
      // console.log(newProduct);

      // 상품id 비교해서 삭제된 id값은 삭제 api호출
      // 음수인 id값은 createProduct 호출

      if (newProduct && product) {
        const newImageIds: number[] = newProduct.images.map((img) => img.id);
        const deletedImages: Image[] = product.images.filter(
          (img) => !newImageIds.includes(img.id)
        );
        const deletionResponses = await Promise.all(
          deletedImages.map((img) =>
            deleteImageById(product.id, img.imageURL.toString())
          )
        );
        const addedImages: Image[] = newProduct.images.filter(
          (img) => img.id < 0
        );
        // console.log(addedImages);
        // 기존의 newProduct 객체를 복사하고, images 배열을 addedImages로 대체
        const updatedProduct = {
          ...newProduct,
          images: addedImages,
        };

        const success: boolean = await createProduct(updatedProduct);

        // const success: boolean = await createProduct(newProduct);
        if (success) {
          alert("수정 완료되었습니다.");
          window.location.reload();
        } else {
          alert("수정에 실패했습니다.");
        }
      }
    }
  };

  return (
    <div className="px-5 lg:px-32 w-full">
      <div className="text-2xl font-medium pt-20">상품 수정</div>
      {newProduct && (
        <TabContent data={newProduct} onChangeData={setNewProduct} />
      )}
      <div className="flex justify-end items-center pb-20">
        <Button
          text="수정하기"
          disabled={!newProduct?.isFullfillSaveCondition}
          onClick={onClickButton}
        />
      </div>
    </div>
  );
}
