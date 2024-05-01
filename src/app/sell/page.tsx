"use client";

import { useContext, useState } from "react";
import TabContent from "./_components/TabContent";
import TabHeader from "./_components/TabHeader";
import Loading from "@/assets/Loading.svg";
import { createProduct } from "./_api/api";
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserContext";
import useMypageSWR from "../my_page/_hooks/useMypageSWR";
import Link from "next/link";

export type Product = {
  order: number;
  title: string;
  content: string;
  price?: number;
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
  isFullfillSaveCondition?: boolean;
};

const getDummyProduct = (order: number) => {
  return {
    order: order,
    title: "",
    content: "",
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
    isFullfillSaveCondition: false,
  };
};

export default function Sell() {
  const router = useRouter();
  const { getUser } = useContext(UserContext);
  const user = getUser();
  // 계좌인증했는지 체크하기

  const { user: userInfo, isLoading } = useMypageSWR();

  const [currentOrder, setCurrentOrder] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([getDummyProduct(0)]);
  const allfullfilledSaveCondition =
    products.filter((product) => product.isFullfillSaveCondition === true)
      .length === products.length;

  const addProduct = () => {
    setProducts([...products, getDummyProduct(products.length)]);
    setCurrentOrder(products.length);
  };

  const changeCurrentOder = (order: number) => {
    setCurrentOrder(order);
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

  const onClickButton = () => {
    products.forEach(async (product) => {
      const res = await createProduct({ product, userId: user?.id ?? -1 });
      router.push(`../${res}`);
      console.log("create", res);
    });
  };

  if (isLoading || !userInfo)
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  else if (userInfo?.accountBank === null || userInfo.accountNumber === null) {
    return (
      <div className="flex justify-center h-[calc(100vh-128px)] pt-40">
        <div className="font-semibold text-lg">
          {`📢계좌인증이 필요합니다 `}
          <Link href={"/my_page"} className="font-semibold text-point-color">
            계좌인증하기
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="px-5 lg:px-32 w-full">
      <div className="text-2xl font-medium pt-20">상품 등록</div>
      <TabHeader
        products={products}
        addProduct={addProduct}
        changeOrder={changeCurrentOder}
        currentOrder={currentOrder}
      />

      <TabContent
        key={products[currentOrder].order}
        data={products[currentOrder]}
        onChangeData={changeProduct}
      />

      <div className="flex justify-end items-center pb-20">
        <button
          data-cy={"product-upload-button"}
          disabled={!allfullfilledSaveCondition}
          className={`rounded-lg text-white  w-32 h-12 ${
            !allfullfilledSaveCondition ? `bg-text-gray` : "bg-point-color"
          } `}
          onClick={onClickButton}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
