import {
  getAccessToken,
  setAccessToken,
} from "@/app/my_page/_utils/auth-header";
import { Product } from "../page";

const mapProductToAPISepc = ({
  product,
  userId,
}: {
  product: Product;
  userId: number;
}) => {
  return {
    userId,
    title: product.title,
    content: product.content,
    price: product.price,
    isEscrow: product.isEscrow,
    discountable: product.discountable,
    purchaseAt: product.purchaseAt,
    freeShipping: product.freeShipping,
    statusId: product.statusId,
    categoryId: product.categoryId,
    tags: product.tags.map((tag) => {
      return { tagName: tag.name };
    }),
  };
};

export const createProduct = async ({
  product,
  userId,
}: {
  product: Product;
  userId: number;
}): Promise<string> => {
  const res = await fetch(`/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(mapProductToAPISepc({ product, userId })),
  });
  setAccessToken(res);
  if (res.ok === true) {
    const productId = await res.text();
    const resImages = await createImages(productId, product.images);
    return `product/${productId}`;
  }

  return "";
};

const createImages = async (
  productId: string,
  images: {
    id: number;
    image: File;
  }[]
) => {
  const fomData = new FormData();

  images.forEach((image) => {
    fomData.append("files", image.image);
  });
  fomData.append("productId", productId);

  return await fetch("/products/upload", {
    method: "POST",
    headers: {
      Authorization: getAccessToken(),
    },
    body: fomData,
  }).then((res) => {
    setAccessToken(res);
    return res.json();
  });
};
