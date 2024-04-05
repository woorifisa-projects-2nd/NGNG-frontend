"use client";
import Button from "@/components/common/Button";
import { useState } from "react";
import TabContent from "./_components/TabContent";
import TabHeader from "./_components/TabHeader";

export type Product = {
  order: number;
  title: string;
  content: string;
  price: number;
  isEscrow: boolean;
  discountable: boolean;
  purchaseAt?: string;
  freeShipping: boolean;
  userId: number;
  statusId: number;
  categoryId: number;
  tags: { name: string }[];
  images: { id: number; image: File }[];
  thumbnail?: File;
};

const getDummyProduct = (order: number) => {
  return {
    order: order,
    title: "",
    content: "",
    price: 0,
    isEscrow: false,
    discountable: false,
    purchaseAt: "",
    freeShipping: false,
    userId: -1,
    statusId: -1,
    categoryId: -1,
    tags: [],
    images: [],
    thumbnail: undefined,
  };
};

export default function Sell() {
  const [products, setProducts] = useState<Product[]>([getDummyProduct(1)]);
  const addProduct = () => {
    setProducts([...products, getDummyProduct(products.length + 1)]);
  };
  const changeProduct = ({
    order,
    product,
  }: {
    order: number;
    product: Product;
  }) => {
    setProducts([...products.map((p) => (p.order !== order ? p : product))]);
  };
  return (
    <div className="px-5 lg:px-32 w-full">
      <div className="text-2xl font-medium pt-20">상품 등록</div>
      <TabHeader products={products} />
      {products.map((p) => (
        <TabContent data={p} />
      ))}
      {/* <Button text="등록하기" /> */}
    </div>
  );
}
